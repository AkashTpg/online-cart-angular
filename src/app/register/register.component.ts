import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';      




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm
  constructor(private _loginService : LoginService, private _router: Router, private toastr: ToastrService) { 
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
          this.toastr.success('User has been resgisterd Succesfully',"Register Succesfully", {progressBar: true, closeButton: true})
          this._router.navigate(['/','login']);
        } else {
          this.toastr.error('Internal Server error', "Error", {progressBar: true, closeButton: true})
        }  
    },
      error => console.error('Error: ', error)
    )
  }

}
