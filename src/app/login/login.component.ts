import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from './login';
import { LoginService } from './login.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';  



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm;
  showLogin;


  constructor(private _loginService: LoginService, private fb: FormBuilder,  private _router: Router, private appComponent: AppComponent,  private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  loginUser(loginForm) {
    if (this.loginForm.status != 'INVALID') {
      this._loginService.authenticateUser(loginForm).subscribe(
        data => {
          if (data.accessToken != null) {
            localStorage.setItem('token', data.accessToken);
            this.appComponent.showLogin  =  true;
            console.log('get token: ', localStorage.getItem('token'));
            this._router.navigate(['/','home']);
          } else {
            this.toastr.error('Credentials are incorrect',"Error", {progressBar: true, closeButton: true})
          }
        },
        error => {
          console.error('Error: ', error)
          this.toastr.error('Error encountered. Please try after sometime',"Error", {progressBar: true, closeButton: true})
        }
      )
    }
  }

}
