import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers:new HttpHeaders
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  register(accno:any,username:any,password:any){
    const body = {
      accno,username,password
    }
    console.log(body);
    
    return this.http.post('https://bank-backend-5e41.onrender.com/register',body)

  }
  // api call for login
  login(accno:any,password:any){
    const body=
    {
      accno,password
    }
    return this.http.post('https://bank-backend-5e41.onrender.com/login',body)
  }

   // append token to the req header
   appendToken(){
    // get token from local storage
    let token=localStorage.getItem('token')
    
    
    // create httpHeaders
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append('verify-token',token)
      options.headers = headers //overloading
    } 
    return options
  }
  // api call for getbalance
  getbalance(accno:any){
    return this.http.get('https://bank-backend-5e41.onrender.com/getbalance/'+accno,this.appendToken())
  }

  fundTransfer(toaccno:any,password:any,amount:any){
    const body={
      toaccno,
      password,
      amount
    }
    return this.http.post('https://bank-backend-5e41.onrender.com/fund-transfer',body,this.appendToken())
    
  }
  getTransactionHistory(){
    return this.http.get('https://bank-backend-5e41.onrender.com/transaction-history',this.appendToken())
  }
  // delete user Account

  deleteUserAccount(){
    return this.http.delete('https://bank-backend-5e41.onrender.com/delete-account',this.appendToken())
  }
  
}
