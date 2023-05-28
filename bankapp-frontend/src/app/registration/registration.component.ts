import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  regErrorMsg :String = "";
  regSuccessMsg:String="";
  regLoadingMsg:String="";
  constructor(private registerFb: FormBuilder,private api:ApiService,private route:Router) { }
  registerForm = this.registerFb.group({//form group
    //form array
    username: ['', [Validators.required, Validators.pattern('[ a-zA-Z ]*')]],
    acno: ['', [Validators.required, Validators.pattern('[ 0-9 ]*')]],
    password: ['', [Validators.required, Validators.pattern('[ a-zA-Z0-9 ]*')]]
  })
  // form control passes to the  register.html
  register() {
    this.regLoadingMsg="started"
    setTimeout(()=>{

      if (this.registerForm.valid) {
  
        console.log(this.registerForm.value);
        
        let uname = this.registerForm.value.username
        let accno = this.registerForm.value.acno
        let pswd = this.registerForm.value.password
        this.api.register(accno,uname,pswd).subscribe((result:any)=>{
          // console.log(result);
          this.regLoadingMsg=""
          this.regSuccessMsg = result.message
          setTimeout(()=>{
            // alert(result.message) //success
            
            this.route.navigateByUrl('')
          },2000)
        },
        (result:any)=>{
          this.regLoadingMsg=""
          this.regErrorMsg = result.error.message //already registered
          console.log(result);
          setTimeout(()=>{
            this.registerForm.reset()
            this.regErrorMsg = ""
            alert("page reset")
          },5000)
        })
      }
      else {
        alert("Invalid Form")
       
      }
    },1000)
  }
}
