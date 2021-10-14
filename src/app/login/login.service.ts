import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _loginUrl = 'http://localhost:9090/users/authenticate';
  _registerUrl = 'http://localhost:9090/users/register';
  constructor(private _http: HttpClient) {


  }
  authenticateUser(loginModel: Login) {
    //user will be authneticated here
    alert("authenticateUser");
   return  this._http.post<any>(this._loginUrl, loginModel);
  }

  registerUser(registerForm) {
    return  this._http.post<any>(this._registerUrl, registerForm);
  }
}

