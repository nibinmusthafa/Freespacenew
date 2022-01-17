
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


export interface kitchendetails{
  id:number;
  lead_id:number;
  lead_category_id:number;
  part:number;
  partname:string;
  material:number;
  finish:number;
  materials:string;
  finishs:string;
  typesize:string;
  brand:number;
  brands:string;
  edge_banding
  colour:string;
  code:string;
  measurement:string;
  remark:string;

}

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




export interface isupervisors{
  id: number,
  name:string ,

}
export interface istatusforprojects{
  id:number,
  status_value:string,

}
// listsupervisors/
// listdesigners/

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
export interface itypebed{
  id:number;
  type:string;
}
export interface ibedroomitem{
  id:number;
  item:string;
}

export interface iwardrobetype{
  id:number;
  type:string;

}
export interface iwardrobepart{
  id:number;
  part:string;
}

export interface icountermaterial{
  id:number;
  material:string;
}

export interface ihingestype{
  id:number;
  type:string;
}

export interface projectlead{
  id:number;
  customername:string;
  phonenumber:number;
  statusvalue:string;
  leadsource: string;
  created_by: number,
  designer_id: number,
  designername:string,
  customer_id: number,
  status_id: number,
  description:string,
  renovation: string,
  leadsource_id: number,
  supervisor_id: number,
  updated_on: number,
  followup_date: number,
  quotation_amount: number,
  architect_id: number,
  architectname:string,
  quotation_flag: number,
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

  getCategorybyid(lead_id: any):Observable<icategory[]>  {
    return this.http.get<icategory[]>(this.baseUrl + 'getleadcategorynotupdated/'+ lead_id+'/')
  }

  updateLeadCategory(id :any,data:any){
    return this.http.put(this.baseUrl+'patchleadcategory/'+ id + '/',data)
  }
  
  addKitchendetails(data:any){
    return this.http.post(this.baseUrl + 'api/addkitchendetails/',data)
  }

  getType():Observable<itypebed[]>{
    return this.http.get<itypebed[]>(this.baseUrl+'api/listbedroomtype/')
  }

  getBedroomitems():Observable<ibedroomitem[]>{
    return this.http.get<ibedroomitem[]>(this.baseUrl+'api/listbedroomitem/')
  }

  addBeddetails(data:any){
    return this.http.post(this.baseUrl +'api/addbeddetails/',data)
  }

  getWardrobetype():Observable<iwardrobetype[]>{
    return this.http.get<iwardrobetype[]>(this.baseUrl + 'api/listwardrobetype/')
  }

  getWardrobepart():Observable<iwardrobepart[]>{
    return this.http.get<iwardrobepart[]>(this.baseUrl + 'api/listwardrobepart/')
  }

  addWardrobedetails(data:any){
    return this.http.post(this.baseUrl + 'api/addwardrobedetails/',data)
  }

  addTVunitetails(data:any){
    return this.http.post(this.baseUrl + 'api/addtvcrockery/',data)
  }

  getCountertopmaterial():Observable<icountermaterial[]>{
    return this.http.get<icountermaterial[]>(this.baseUrl + 'api/listcountertopmaterial/')
  }

  addkitchenbasketdetails(data:any){
    return this.http.post(this.baseUrl + 'api/addkitchenbasket/',data)
  }
  addwardrobebasketdetails(data:any){
    return this.http.post(this.baseUrl + 'api/addwardrobebasket/',data)
  }

  addcounterdetails(data:any){
    return this.http.post(this.baseUrl + 'api/addcountertopdetails/',data)
  }

  addcpfitting(data:any){
    return this.http.post(this.baseUrl + 'addcpfitting/',data)
  }

  addkitchendrawers(data:any){
    return this.http.post(this.baseUrl + 'api/adddrawers/',data)
  }

  addwardrobedrawers(data:any){
    return this.http.post(this.baseUrl + 'api/addwardrobedrawers/',data)
  }

  addkitchenhardware(data:any){
    return this.http.post(this.baseUrl + 'api/addkitchenhardware/',data)
  }
  addwardrobehardware(data:any){
    return this.http.post(this.baseUrl + 'api/addwardrobehardware/',data)
  }

  getHingestype():Observable<ihingestype[]>{
    return this.http.get<ihingestype[]>(this.baseUrl + 'api/listkitchenhinges/')
  }

  addkitchenhinges(data:any){
    return this.http.post(this.baseUrl + 'api/addkitchenhinges/',data)
  }

  addwardrobehinges(data:any){
    return this.http.post(this.baseUrl + 'api/addwardrobehinges/',data)
  }

  addsink(data:any){
    return this.http.post(this.baseUrl + 'api/addsinkdetails/',data)
  }

  addtiles(data:any){

    return this.http.post(this.baseUrl + 'api/addtilesdetails/',data)
  }

  addProject(data:any){
    return this.http.post(this.baseUrl + 'api/addproject/',data)
  }

  getDesignername():Observable<isupervisors[]>{
    return this.http.get<isupervisors[]>(this.baseUrl+'listsupervisors/')
  }

  getSupervisorname():Observable<istatusforprojects[]>{
    return this.http.get<istatusforprojects[]>(this.baseUrl+'api/projectstatus/')
  }
  addProjectdetails(data:any){
    return this.http.post(this.baseUrl + 'api/addproject/',data)
  }

  listLeadbyProject():Observable<leads[]>{
    return this.http.get<leads[]>(this.baseUrl + 'api/listleadsforprojects/');
  }

  addfiledetails(data:any){
      return this.http.post(this.baseUrl + 'api/addimagedesigner/',data)
    }

    listLeadbyfinance(): Observable<leads[]> {
      return this.http.get<leads[]>(this.baseUrl + 'listleadsforfinance/');
    }

    listLeadsforsignoff(): Observable<leads[]> {
      return this.http.get<leads[]>(this.baseUrl + 'listleadsforfinance/');
    }

    listKitchendetails(id:any): Observable<kitchendetails[]> {
      return this.http.get<kitchendetails[]>(this.baseUrl + 'api/listkitchendetails/'+id+'/');
    } 

    listWardrobedetails(id:any): Observable<kitchendetails[]> {
      return this.http.get<kitchendetails[]>(this.baseUrl + 'api/listwardrobedetails/'+id+'/');
    } 

  }


