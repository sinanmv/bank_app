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
    
    return this.http.post('http://localhost:5000/register',body)

  }
  // api call for login
  login(accno:any,password:any){
    const body=
    {
      accno,password
    }
    return this.http.post('http://localhost:5000/login',body)
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
    return this.http.get('http://localhost:5000/getbalance/'+accno,this.appendToken())
  }

  fundTransfer(toaccno:any,password:any,amount:any){
    const body={
      toaccno,
      password,
      amount
    }
    return this.http.post('http://localhost:5000/fund-transfer',body,this.appendToken())
    
  }
}
