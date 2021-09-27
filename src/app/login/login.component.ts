import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from './login';
import { LoginService } from './login.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm;


  constructor(private _loginService: LoginService, private fb: FormBuilder,  private _router: Router) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  loginUser(loginForm) {
    console.log(loginForm);
    console.log(this.loginForm);
    if (this.loginForm.status != 'INVALID') {
      this._loginService.authenticateUser(loginForm).subscribe(
        data => {
          if (data.accessToken != null) {
            localStorage.setItem('token', JSON.stringify(data.accessToken));
            console.log('get token: ', localStorage.getItem('token'));
            this._router.navigate(['/','home']);
          } else {
            alert('Credentials are incorrect');
          }
        },
        error => {
          console.error('Error: ', error)
          alert('Error encountered. Please try after sometime');
        }
      )
    }
  }

}
