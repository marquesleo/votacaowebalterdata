import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,  Validators, FormBuilder }  from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AlertService } from '../shared/services/alert.service';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Filial } from '../_models/filial';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  private filiais :Filial[];
  private errorMessage :string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private repository:RepositoryService,
      private errorHandler: ErrorHandlerService) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
          senha: ['', Validators.required],
          idFilial:['',Validators.required]
      });

      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.getAllFiliais();
  }

  public getAllFiliais():void{
    let apiAddress: string = "filial";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.filiais = res as Filial[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage  = this.errorHandler.errorMessage;
    })
  }

  Registrar(){
    let url = "/register/true";
    this.router.navigate([url]);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.idFilial.value,
                                      this.f.email.value, 
                                      this.f.senha.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
