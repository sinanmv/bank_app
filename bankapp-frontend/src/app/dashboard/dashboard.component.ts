import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fundFb: FormBuilder, private api: ApiService, private DashboardRouter: Router) { }
  user: string = ""
  currentAccno: String = ""
  balance: Number = 0
  fundTransferSuccessMsg: string = ''
  fundTransferErrorMsg: string = ''
  logoutstatus: boolean = false
  deleteStatus:boolean = false
  deletesuccessMsg:string = ""
  // delete account
  acno:any
  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      alert("please login ")
      this.DashboardRouter.navigateByUrl('')

    }
    if (localStorage.getItem("currentUser")) {
      this.user = localStorage.getItem("currentUser") || ""
    }
    if (localStorage.getItem("currentAccno")) {
      this.currentAccno = localStorage.getItem("currentAccno") || ""
    }
  }
  fundTransferForm = this.fundFb.group({//form group
    //form array
    amount: ['', [Validators.required, Validators.pattern('[ 0-9 ]*')]],
    accno: ['', [Validators.required, Validators.pattern('[ 0-9 ]*')]],
    password: ['', [Validators.required, Validators.pattern('[ a-zA-Z0-9 ]*')]]
  })
  isCollapse: boolean = true
  collapse() {
    this.isCollapse = !this.isCollapse
  }


  getbalance() {
    // api call to get the balance
    this.api.getbalance(this.currentAccno).subscribe((result: any) => {
      this.balance = result.balance;
    })
  }

  fundTransfer() {

    if (this.fundTransferForm.valid) {
      let creditaccno = this.fundTransferForm.value.accno
      let password = this.fundTransferForm.value.password
      let amount = this.fundTransferForm.value.amount

      this.api.fundTransfer(creditaccno, password, amount).subscribe((result: any) => {
        console.log(result);
        this.fundTransferSuccessMsg = result.message //successfull
        setTimeout(() => {
          this.fundTransferForm.reset()
          this.fundTransferSuccessMsg = ""
        }, 2000)
      },
        (result: any) => {
          console.log(result.error.message);
          this.fundTransferErrorMsg = result.error.message //error
          setTimeout(() => {
            this.fundTransferForm.reset()
            this.fundTransferErrorMsg = ""
          }, 1000)
        }
      )
    }
    else {
      alert("Invalid")
    }
  }

  resetform() {
    this.fundTransferForm.reset()
  }
  logout() {
    this.logoutstatus = true
    localStorage.clear()
    
    setTimeout(() => {
      this.DashboardRouter.navigateByUrl('')
    },3000)

  }

  deleteAccount(){
    // data to be share with child
    this.acno=localStorage.getItem('currentAccno')
    this.deleteStatus=true
  }
  cancelDelete(){
    this.acno = ""
    this.deleteStatus = false
  }
  deleteFormParent(){
    this.api.deleteUserAccount().subscribe((result:any)=>{
      this.deletesuccessMsg = result.message
      localStorage.clear()
    setTimeout(() => {

      this.DashboardRouter.navigateByUrl('')
    }, 2000);

    })
  }
}
