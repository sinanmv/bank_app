import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  buttonclicked:string=""
  loginErrorMsg:string=''
  constructor(private registerFb: FormBuilder,private api:ApiService,private route:Router) { }
  loginForm = this.registerFb.group({//form group
    // form array
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })
  login() {
    // console.log(this.loginForm.value);
    this.buttonclicked="clicked"
    setTimeout(() => {
      
      if (this.loginForm.valid) {
        let accno= this.loginForm.value.acno
        let pswd = this.loginForm.value.password
        // alert("validate")
        // make an api call for login
        this.api.login(accno,pswd).subscribe((result:any)=>{
          // store current user in local storage
          localStorage.setItem("currentUser",result.currentUser)
          // set token in local stroage
          localStorage.setItem("token",result.token)
          // redirected to dashboard page
          // store accno in localstorage
          localStorage.setItem('currentAccno',result.currentAccno)
          this.route.navigateByUrl('/dashboard')
        },
        // response 401
        (result:any)=>{
          // error message
          this.loginErrorMsg=result.error.message
          this.buttonclicked=""
          setTimeout(() => {
            this.loginForm.reset()
            this.loginErrorMsg = ""
            
          }, 2000);
        }
        )
      }
      else {
        this.buttonclicked=""
        alert("invalid Form")
      }
    }, 1000);
  }
}
