import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(transaction:any=[],key:string,typename:string): any[] {
    const result:any=[]
    if(!transaction||key=="")
    {
      return transaction
    }
    transaction.forEach((resulttrans:any)=>{
      if(resulttrans[typename].toLowerCase().includes(key.toLowerCase())){
        result.push(resulttrans)
      }
    })  
    return result
  }

}
