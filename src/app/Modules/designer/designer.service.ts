
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { leadremarks } from './models/leadremarks';
// import { leadremarks } from '../interface/leadinterface';
import { environment } from 'src/environments/environment';
import { files } from 'src/app/_models/filesmodel';
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
export interface ifinish{
  id:number;
  finish:string;

}
export interface isupervisor {
  id: number;
  name: string
}

export interface iStatus {
  id: number;
  status_value: string;
}
export interface icategory {
  id: number;
  category_id:number;
  updated_on:number;
  is_updated:string;
  category_name: string;
  location:string;

}
export interface itypesize{
  id:number;
  typesize:string;
}
export interface ipart{
   id:number;
   part:string;
}
export interface imaterial{
  id:number;
  material:string;
}
export interface ibrand{
  id:number;
  brand:string;
}


@Injectable({

  providedIn: 'root'

})

export class DesignerService {

  private baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl

  }

  getleaddesigners(id: any): Observable<icustomer[]> {
    return this.http.get<icustomer[]>(this.baseUrl + 'getleadbydesigners/' + id+'/');
  }
  updatestatus(id: number, value: any) {
    return this.http.patch(this.baseUrl + 'updatestatusinlead/' + id + '/', value);
  }

  getLead(id: any): Observable<icustomer> {
    return this.http.get<icustomer>(this.baseUrl + 'getlead/' + id + '/');
  }

  getleadremarks(lead_id: any,user_id:any): Observable<leadremarks[]> {
    return this.http.get<leadremarks[]>(this.baseUrl + 'getremarksbyuser/' + lead_id+'/'+ user_id +'/');
  }

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
    return this.http.get<iStatus[]>(this.baseUrl + 'getstatusfordesigner/')
  }

  addStatusTracker(data: any) {
    return this.http.post(this.baseUrl + 'addstatustracker/', data)
  }


  addFollowup(data: any) {

    return this.http.post(this.baseUrl + 'addfollowup/', data)
  }

  listFilesbylead(lead_id: any,user_id:any): Observable<files[]> {
    return this.http.get<files[]>(this.baseUrl + 'listfilebyid/' + lead_id + '/' + user_id + '/')
  }

  addImage(data:any){
    return this.http.post(this.baseUrl+'addimage/',data)
  }

  getFollowupDate(lead_id:any):Observable<followupDate>{
    return this.http.get<followupDate>(this.baseUrl+'getfollowup/' + lead_id + '/')
  }

  setFollowupDate(id:number,value:any):Observable<followupDate>{
    return this.http.patch<followupDate>(this.baseUrl+'updatefollowupinlead/' + id + '/', value)
  }
  getleadcategorybylead(lead_id:any):Observable<LeadCategory[]>{
    return this.http.get<LeadCategory[]>(this.baseUrl+'getleadcategorybylead/'+ lead_id+'/')
  }
 
  getCategory(lead_id:any): Observable<icategory[]> {
    return this.http.get<icategory[]>(this.baseUrl + 'getleadcategorybylead/'+ lead_id+'/');
  }

  getfinish():Observable<ifinish[]>{
    return this.http.get<ifinish[]>(this.baseUrl+'api/listfinish/')
  }

  getPart():Observable<ipart[]>{
    return this.http.get<ipart[]>(this.baseUrl+'api/listkitchenpart/')
  }
  getMaterial():Observable<imaterial[]>{
    return this.http.get<imaterial[]>(this.baseUrl+'api/listmaterial/')
  }
  getTypesize():Observable<itypesize[]>{
    return this.http.get<itypesize[]>(this.baseUrl+'api/listkitchentypesize/')
  }
  getBrand():Observable<ibrand[]>{
    return this.http.get<ibrand[]>(this.baseUrl+'api/listbrands/')
  }

}
