import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnviromentUrlService {

  public urlAddress : string = environment.urlAddress;
  constructor() { }
}
