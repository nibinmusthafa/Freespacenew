import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

export interface leads {
  customer_id: number,
  phonenumber: number,
  customername: string,
  designer_id: number,
  created_by: number,
  status_id: number,
  leadname: string,
  description: string,
  renovation: boolean,
  leadsource_id: number,
  supervisor_id: number,
  updated_on: Date,
  statusvalue: string;
  followup_date:Date;
  quotation_amount:number;
}


export interface paymenttype{
  id:number;
  payment_type:string;
}

export interface paymentcategory{
  id:number;
  payment_categoryname:string;
}



@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private baseUrl: string = "";

  constructor(private http: HttpClient) { this.baseUrl = environment.baseUrl}

  listLeadbyfinance(): Observable<leads[]> {
    return this.http.get<leads[]>(this.baseUrl + 'listleadsforfinance/');
  }

  listPaymenttype(): Observable<paymenttype[]> {
    return this.http.get<paymenttype[]>(this.baseUrl + 'api/paymenttypes/');
  }

  listPaymentcategory(): Observable<paymentcategory[]> {
    return this.http.get<paymentcategory[]>(this.baseUrl + 'api/payementcategorys/');

  }
  addPaymentdetails(data:any){
    return this.http.post(this.baseUrl + 'api/addprojectpayment/',data)
  }
 getleadByid(id:any){
    return this.http.get(this.baseUrl + 'getlead/' + id + '/'
      )
 }
  updatestatus(id: any, value: any) {
    return this.http.patch(this.baseUrl + 'updatestatusinlead/' + id + '/', value);
  }

}
