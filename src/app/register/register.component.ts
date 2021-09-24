import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm
  constructor(private _loginService : LoginService, private _router: Router) { 
    this.registerForm = new FormGroup({
      'name': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  registerUser(registerForm) {
    this._loginService.registerUser(registerForm).subscribe(
      data => {
        
        console.log('Success: ', data)
        if(data === 'CREATED') {
          alert("Registered Succesfully!!");
          this._router.navigate(['/','login']);
        } else {
          alert("Internal Server Error!!");
        }  
    },
      error => console.error('Error: ', error)
    )
  }

}
