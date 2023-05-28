import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable' 
import { Router } from '@angular/router';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transaction:any=[]
  key:string =""
  constructor(private api: ApiService,private route:Router) {

  }
  ngOnInit(): void {
    if(!localStorage.getItem("token"))
    {
      alert("please login ")
      this.route.navigateByUrl('')
      
    }
    this.api.getTransactionHistory().subscribe((result: any) => {
      console.log(result);
      this.transaction = result.transaction

    },
      (result: any) => {
        console.log(result.error.message);
      }
    )
  }
  search(event:any){
    console.log(event.target.value);
    this.key=event.target.value
    console.log(this.key);
    
  }
  // generate PDF
  generatePDF(){
    // step 1 : create an object for jspdf
    var pdf = new jspdf

    // step 2 : setup title for the table
    let thead = ['type','From Account','TO Account','Amount']

    let tbody = []
    // step 3 : setup pdf properties 
    pdf.setFontSize(16)
    pdf.text('Min Statement',15,10)
    pdf.setFontSize(12)
    pdf.setTextColor(99)

    // step 4 : to display as table , need to convert array of object to Nested array
    for(let item of this.transaction)
    {
      let temp = [item.type,item.fromacc,item.toacc,item.amount]
      tbody.push(temp) // nested arrray
    }

    // step 5 : Convert nested array to table using jspdf-autotable
    (pdf as any).autoTable(thead,tbody,{startY:15})

    // step 6 : To open pdf in new tab
    pdf.output('dataurlnewwindow')

    // step 7 : To download as pdf file
    pdf.save('Transaction History')
  }

  logout(){
    localStorage.clear()
    this.route.navigateByUrl('') 
  }


}
