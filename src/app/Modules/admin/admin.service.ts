import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { followupDate } from 'src/app/_models/user';
import { leadremarks } from './adminmodels/remarks';
import { LeadCategory } from 'src/app/_models/leadCategory';
import { files } from 'src/app/_models/filesmodel';
import { states } from './models/States';
import { icountry } from './models/countries';


export interface idesignation {
  id: number;
  designation_name: string
}

export interface iuser {
  id: number;
  name: string;
  user_designation: number;
  designationname: string;
}

export interface icustomer {
  id: number;
  customer_firstname: string;
  customer_lastname: string;

}

export interface ileadsource {
  id: number;
  sourcevalue: string;
}

export interface ilead {
  id: number;
  customer_firstname: string;
  customer_lastname: string;

}

export interface isupervisor {
  id: number;
  name: string
}

export interface iuser {
  id: number;
  name: string;
  email: string;
  userdesignation: string;
}

export interface icategory {
  id: number;
  category_name: string;

}

export interface isubcategory {
  id: number;
  name: string;
}

export interface idescription {
  name: string;
}

export interface icustomer {
  id: number;
  customer_firstname: string;
  customer_lastname: string;
  customer_phonenumber: number;
  email: string;
  updated_on: number;
  state_name: string;

}

export interface icustomers {
  id: number,
  leadsource: string,
  statusvalue: string,
  phonenumber: number,
  customername: string,
  created_by: number,
  designer_id: number,
  customer_id: number,
  status_id: number,
  description: string,
  renovation: boolean,
  leadsource_id: number,
  supervisor_id: number,
  updated_on: Date
}

export interface ilocation {
  id: number;
  location: string;
}
export interface iarchitect {
  id: number;
  architect_name: string;
  architect_id: number;

}
export interface financelead {     
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

export interface iwardrobedetails{
  lead_id: number,
  lead_category_id: number,
  Part: number,
  type: number,
  types: string,
  material: number,
  typesizess: string,
  materials: string,
  finish: number,
  finishes: string,
  brand: number,
  brandss: string,
  typesize: number,
  edgebanding: string,
  colour: string,
  code: number,
  measurement: number,
  remark: string,
 
}
export interface ibeddetails{
  lead_id: number,
  lead_category_id: number,
  item_name: number,
  finishs: string,
  type: number,
  brands: string,
  types: string,
  finish: number,
  brand: number,
  typesizes: string,
  typesize: number,
  edgebanding: string,
  colour: string,
  code: number,
  measurement: number,
  remark: string,
 
}
export interface itvunitdetails{
  lead_id: number,
  lead_category_id: number,
  material: number,
  materials: string,
  finishs: string,
  finish: number,
  brand: number,
  brands: string,
  edgebanding:string,
  colour: string,
  code: number,
  measurement: string,
  remark: string,
 
}



export interface icountertopdetails{
  lead_id: number,
  material: number,
  materials: string,
  colour: string,
  remark: string,
}

export interface itilesdetails{
  lead_id: number,
  brand: string,
  colour: string,
  size: string,
  remark: string,
  
}
export interface isinkdetails{
  lead_id: number,
  brand: string,
  colour: string,
  size: string,
  remark: string,
  
  
}
export interface icpfittingdetails{
  id:number,
  brand: string,
  colour: string,
  size: number,
  remark: string,
  lead_id: number,
  
}
export interface ikitchendrawersdetails{
  id: number,
  brand: string,
  units: number,
  remark: string,
  lead_id: number
  
}
export interface ikitchenbasketdetails{
  id: number,
  brand: string,
  units: number,
  remark: string,
  lead_id: number,
}

  
export interface ikitchenhingesdetails{
  lead_id: number,
  brand: string,
  hingetype: number,
  typessss: string,
  remark: string,

  
}
export interface ikitcehnhardwaredetails{
  id: number,
  brand: string,
  remark: string,
  lead_id: number
}

export interface iwardrobedrawersdetails{

  id: number,
  brand: string,
  unit: number,
  remark: string,
  lead_id: number,

  
}

export interface iwardrobebasketdetails{
  id: number,
  brand: string,
  units: number,
  remark: string,
  lead_id: number,
  
}

export interface iwardrobehingesdetails{
  lead_id: number,
  brand: string,
  hingetype: number,
  hingetypes: string,
  remark: string,
  
}

export interface iwardrobehardwaredetails{
  id: number,
  brand: string,
  remark: string,
  lead_id: number
}

let userToken: any = localStorage.getItem('user');
let token = JSON.parse(userToken)?.jwt;

// const header= new HttpHeaders()
// .set('content-type', 'application/json')
// .set('Access-Control-Allow-Origin', '*')
// .set('token', token);

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl
  }
  listsupervisor(): Observable<isupervisor[]> {
    return this.http.get<isupervisor[]>(this.baseUrl + 'listsupervisors/')

  }

  getDesignation(): Observable<idesignation[]> {
    return this.http.get<idesignation[]>(this.baseUrl + 'listdesignations/');
  }

  ListUsers(): Observable<iuser[]> {
    return this.http.get<iuser[]>(this.baseUrl + 'listusers/');
  }

  ListUser(id: any): Observable<iuser[]> {
    console.log(id);
    return this.http.get<iuser[]>(this.baseUrl + 'getuser/' + id + '/');
  }

  listDesigner(): Observable<iuser[]> {
    return this.http.get<iuser[]>(this.baseUrl + 'listdesigners/');
  }

  getCustomer(): Observable<icustomer[]> {
    return this.http.get<icustomer[]>(this.baseUrl + 'listcustomers/');
  }

  getCustomerbyId(pk: any): Observable<icustomer> {
    return this.http.get<icustomer>(this.baseUrl + 'getcustomer/' + pk + '/');
  }

  getLeadSource(): Observable<ileadsource[]> {
    return this.http.get<ileadsource[]>(this.baseUrl + 'listleadsource/');
  }

  getLead(): Observable<ilead[]> {
    return this.http.get<ilead[]>(this.baseUrl + 'listlead/');
  }

  getCategory(): Observable<icategory[]> {
    return this.http.get<icategory[]>(this.baseUrl + 'listcategory/');
  }

  getSubCategory(): Observable<isubcategory[]> {
    return this.http.get<isubcategory[]>(this.baseUrl + 'listsubcategory/');
  }

  getDescription(): Observable<idescription[]> {
    return this.http.get<idescription[]>(this.baseUrl + 'listlead/');
  }

  createLead(val: any) {
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + 'addlead/', val);
  }

  addCustomer(val: any) {
    return this.http.post(this.baseUrl + 'createcustomer/', val)
  }

  getUserlist() {
    return this.http.get(this.baseUrl + 'user/')
  }

  addUser(data: any) {
    return this.http.post(this.baseUrl + 'register/', data)
  }

  getlead(): Observable<icustomers[]> {
    return this.http.get<icustomers[]>(this.baseUrl + 'listlead/');
  }

  getLeads(id: any): Observable<icustomers> {
    return this.http.get<icustomers>(this.baseUrl + 'getlead/' + id + '/');
  }

  getleadsupervisor(id: any): Observable<icustomers> {
    return this.http.get<icustomers>(this.baseUrl + 'getleadbysupervisor/' + id + '/');
  }

  addFollowup(data: any) {
    return this.http.post(this.baseUrl + 'addfollowup/', data)
  }

  updatestatus(id: number, value: any) {
    return this.http.patch(this.baseUrl + 'updatestatusinlead/' + id + '/', value);
  }

  addStatusTracker(data: any) {
    return this.http.post(this.baseUrl + 'addstatustracker/', data)
  }

  getFollowupDate(lead_id: any): Observable<followupDate> {
    return this.http.get<followupDate>(this.baseUrl + 'getfollowup/' + lead_id + '/')
  }
  // getleadbyfollowup(lead_id:any){
  //   return this.http.patch(this.baseUrl + 'getleadbyfollowup/'+ lead_id +'/')
  // }

  getremarksbydesigner(lead_id: any, user_id: any): Observable<leadremarks[]> {
    return this.http.get<leadremarks[]>(this.baseUrl + 'getremarksbyuser/' + lead_id + '/' + user_id + '/');
  }

  getremarksbysupervisor(lead_id: any, user_id: any): Observable<leadremarks[]> {
    return this.http.get<leadremarks[]>(this.baseUrl + 'getremarksbyuser/' + lead_id + '/' + user_id + '/');
  }

  getleadcategorybylead(lead_id: any): Observable<LeadCategory[]> {
    return this.http.get<LeadCategory[]>(this.baseUrl + 'getleadcategorybylead/' + lead_id + '/')
  }

  listFilesbyleaddesigner(lead_id: any, user_id: any): Observable<files[]> {
    return this.http.get<files[]>(this.baseUrl + 'listfilebyid/' + lead_id + '/' + user_id + '/')
  }

  listFilesbyleadsupervisor(lead_id: any, user_id: any): Observable<files[]> {
    return this.http.get<files[]>(this.baseUrl + 'listfilebyid/' + lead_id + '/' + user_id + '/')
  }

  setFollowupDate(id: number, value: any): Observable<followupDate> {
    return this.http.patch<followupDate>(this.baseUrl + 'updatefollowupinlead/' + id + '/', value)
  }

  createcustomer(val: any) {
    return this.http.post(this.baseUrl + 'addcustomer/', val);
  }

  listStates(): Observable<states[]> {
    return this.http.get<states[]>(this.baseUrl + 'liststate/')
  }

  getCustomerById(customer_id: any) {
    return this.http.get(this.baseUrl + 'getcustomer/' + customer_id + '/')
  }

  getAddressById(customer_id: any) {
    return this.http.get(this.baseUrl + 'getaddressbyid/' + customer_id + '/')
  }

  getLeadbyid(id: any) {
    return this.http.get(this.baseUrl + 'getlead/' + id + '/')
  }

  getCategorybyid(id: any, lead_id: any) {
    return this.http.get(this.baseUrl + 'getleadcategorybylead/' + id + '/')
  }

  getsubCategorybyid(id: any) {
    return this.http.get(this.baseUrl + 'getsubcategory/' + id + '/')
  }

  listCountry(): Observable<icountry[]> {
    return this.http.get<icountry[]>(this.baseUrl + 'listcountry/')
  }

  updatecustomer(id: any, data: any) {
    return this.http.put(this.baseUrl + 'updatecustomer/' + id + '/', data)
  }

  updateaddressbyid(id: any, data: any) {
    return this.http.put(this.baseUrl + 'updateaddress/' + id + '/', data)
  }

  getUserbyid(id: any) {
    return this.http.get(this.baseUrl + 'getuser/' + id + '/')
  }

  updateUserbyid(id: any, data: any) {
    return this.http.put(this.baseUrl + 'updateuser/' + id + '/', data)
  }

  updateLeadbyid(id: any, data: any) {
    return this.http.put(this.baseUrl + 'updatelead/' + id, data)
  }

  updatePasswordbyid(id: any,data: any) {
    return this.http.put(this.baseUrl + 'changepassword/' + id + '/', data)
  }

  listArchitect(): Observable<iarchitect[]> {
    return this.http.get<iarchitect[]>(this.baseUrl + 'listarchitect/')
  }

  listLeadsforsignoff(): Observable<financelead[]> {
    return this.http.get<financelead[]>(this.baseUrl + 'listleadsforfinance/');
  }

  listKitchendetails(id:any): Observable<kitchendetails[]> {
    return this.http.get<kitchendetails[]>(this.baseUrl + 'api/listkitchendetails/'+id+'/');
  } 

  listWardrobedetails(id:any): Observable<iwardrobedetails[]> {
    return this.http.get<iwardrobedetails[]>(this.baseUrl + 'api/listwardrobedetails/'+id+'/');
  } 

  listCountertopdetails(id:any): Observable<icountertopdetails[]> {
    return this.http.get<icountertopdetails[]>(this.baseUrl + 'api/listcountertopdetails/'+id+'/');
  } 

  listTilesdetails(id:any): Observable<itilesdetails[]> {
    return this.http.get<itilesdetails[]>(this.baseUrl + 'api/listtilesdetails/'+id+'/');
  } 
  listSinkdetails(id:any): Observable<isinkdetails[]> {
    return this.http.get<isinkdetails[]>(this.baseUrl + 'api/listsinkdetails/'+id+'/');
  } 
  listCpFittingdetails(id:any): Observable<icpfittingdetails[]> {
    return this.http.get<icpfittingdetails[]>(this.baseUrl + 'api/listcpfittingdetails/'+id+'/');
  } 

  listkitchendrawersdetails(id:any): Observable<ikitchendrawersdetails[]> {
    return this.http.get<ikitchendrawersdetails[]>(this.baseUrl + 'api/listdrawers/'+id+'/');
  } 
  listkitchenbasketdetails(id:any): Observable<ikitchenbasketdetails[]> {
    return this.http.get<ikitchenbasketdetails[]>(this.baseUrl + 'api/listkitchenbasket/'+id+'/');
  } 
  listkitchenhingesdetails(id:any): Observable<ikitchenhingesdetails[]> {
    return this.http.get<ikitchenhingesdetails[]>(this.baseUrl + 'api/listkitchenhinges/'+id+'/');
  } 
  listkitchenhardwaredetails(id:any): Observable<ikitcehnhardwaredetails[]> {
    return this.http.get<ikitcehnhardwaredetails[]>(this.baseUrl + 'api/listkitchenhardware/'+id+'/');
  } 
  listwardrobedrawersdetails(id:any): Observable<iwardrobedrawersdetails[]> {
    return this.http.get<iwardrobedrawersdetails[]>(this.baseUrl + 'api/listwardrobedrawers/'+id+'/');
  } 
  listwardrobebasketdetails(id:any): Observable<iwardrobebasketdetails[]> {
    return this.http.get<iwardrobebasketdetails[]>(this.baseUrl + 'api/listwardrobebasket/'+id+'/');
  } 
  listwardrobehingesdetails(id:any): Observable<iwardrobehingesdetails[]> {
    return this.http.get<iwardrobehingesdetails[]>(this.baseUrl + 'api/listwardrobehinges/'+id+'/');
  } 
  listwardrobehardwaredetails(id:any): Observable<iwardrobehardwaredetails[]> {
    return this.http.get<iwardrobehardwaredetails[]>(this.baseUrl + 'api/listwardrobehardware/'+id+'/');

  }
  listbeddetails(id:any): Observable<ibeddetails[]> {
    return this.http.get<ibeddetails[]>(this.baseUrl + 'api/listbeddetails/'+id+'/');
  }
  listtvunitdetails(id:any): Observable<itvunitdetails[]> {
    return this.http.get<itvunitdetails[]>(this.baseUrl + 'api/listtvcrockery/'+id+'/');
  }




}

