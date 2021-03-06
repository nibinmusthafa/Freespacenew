import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { files } from 'src/app/_models/filesmodel';
import { leadremarks } from '../designer/models/leadremarks';
import { followupDate } from 'src/app/_models/user';
import { LeadCategory } from 'src/app/_models/leadCategory';


export interface icustomer {
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
  // leadsource_id:number;
}
export interface iproject {
  id: number,
  completion_date: number,
  tentative_date: number,
  lead_id: number,
  user_id: number,
  supervisor_id: number,
  designer_id: number,
  customer_id:number,
  customername:string,

}

export interface isupervisor {
  id: number;
  name: string
}

export interface iStatus {
  id: number;
  status_value: string;
}

export interface imeasurementtype {
  id: number;
  type_names: string;
}

@Injectable({
  providedIn: 'root'
})

export class SupervisorService {

  private baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl
   }

  getleadbysupervisor(id: any): Observable<icustomer[]> {
    return this.http.get<icustomer[]>(this.baseUrl + 'getleadbysupervisor/'+ id + '/');
  }

  updatestatus(id: number, value: any) {
    return this.http.patch(this.baseUrl + 'updatestatusinlead/' + id + '/', value);
  }

  getLead(id: any): Observable<icustomer> {
    return this.http.get<icustomer>(this.baseUrl + 'getlead/' + id + '/');
  }

  // getleadremarks(lead_id: any): Observable<leadremarks[]> {
  //   return this.http.get<leadremarks[]>(this.baseUrl + 'getleadremarks/' + lead_id);
  // }

  addRemarks(data: any) {
    return this.http.post(this.baseUrl + 'addleadremarks/', data);
  }

  listSupervisors(): Observable<isupervisor[]> {
    return this.http.get<isupervisor[]>(this.baseUrl + 'listsupervisors/')
  }

  updateSupervisor(lead_id: any, data: any) {
    return this.http.patch(this.baseUrl + 'updatestatusinlead/' + lead_id + '/', data)
  }

  updateStatus(lead_id: any, data: any) {
    return this.http.patch(this.baseUrl + 'updatestatusinlead/' + lead_id + '/', data)
  }

  listStatus(): Observable<iStatus[]> {
    return this.http.get<iStatus[]>(this.baseUrl + 'getstatusforsupervisor/')
  }

  addStatusTracker(data: any) {
    return this.http.post(this.baseUrl + 'addstatustracker/', data)
  }

  addFollowup(data: any) {
    return this.http.post(this.baseUrl + 'addfollowup/', data)
  }

  listFilesbylead(lead_id: any,user_id:any): Observable<files[]> {
    return this.http.get<files[]>(this.baseUrl + 'listfilebyid/' + lead_id + '/' + user_id + '/');
  }

  addImage(data:any){
    return this.http.post(this.baseUrl+'addimage/',data)
  }

  getFollowupDate(lead_id:any):Observable<followupDate>{
    return this.http.get<followupDate>(this.baseUrl+'getfollowup/'+ lead_id+'/')
  }

  getremarksbysupervisor(lead_id: any ,user_id:any): Observable<leadremarks[]> {
    return this.http.get<leadremarks[]>(this.baseUrl + 'getremarksbyuser/' + lead_id +'/' + user_id + '/');
  }

  setFollowupDate(id:number,value:any):Observable<followupDate>{
    return this.http.patch<followupDate>(this.baseUrl+'updatefollowupinlead/' + id + '/', value)
  }

  getleadcategorybylead(lead_id:any):Observable<LeadCategory[]>{
    return this.http.get<LeadCategory[]>(this.baseUrl+'getleadcategorybylead/'+ lead_id+'/')
  }

  listmeasurementtypes(): Observable<imeasurementtype[]> {
    return this.http.get<imeasurementtype[]>(this.baseUrl + 'api/listmeasurementtypes/')
  }
  
  addmeasurementdetails(data:any){
      return this.http.post(this.baseUrl + 'api/addmeasurementdetails/',data)
    }

    listprojectsforsupervisors(): Observable<iproject[]> {
      return this.http.get<iproject[]>(this.baseUrl + 'api/listproject/');
    }

  }


