import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public errorMessage: string = '';
 
  constructor(private router: Router) { }
 
  public handleError(error: string){
    if(error === "500"){
      this.handle500Error(error);
    }
    else if(error === "404"){
      this.handle404Error(error)
    }else if (error === "409"){
      this.handle409Error(error);
    }
    else{
      this.handleOtherError(error);
    }
  }
 
  private handle500Error(error: string){
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private handle409Error(error: string){
    this.errorMessage = error;
  }
 
  private handle404Error(error: string){
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  }
 
  private handleOtherError(error: string){
    this.createErrorMessage(error);
    $('#errorModal').modal();
  }
 
  private createErrorMessage(error: string){
    this.errorMessage = error;
   
  }
}
