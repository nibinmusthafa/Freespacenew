import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DesignerService, isupervisor } from '../designer.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignsupervisorComponent } from '../assignsupervisor/assignsupervisor.component';
import { UpdateStatusComponent } from '../update-status/update-status.component';
import { FollowupComponent } from '../followup/followup.component';
import { files } from 'src/app/_models/filesmodel';
import { ViewfileComponent } from '../viewfile/viewfile.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { followupDate } from 'src/app/_models/user';
import { DatePipe } from '@angular/common';
import { ViewcategoryComponent } from '../viewcategory/viewcategory.component';

export interface lead {
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
}

export interface item {
  user_id: number,
  user_name: string
}

@Component({
  selector: 'app-leadremarks',
  templateUrl: './leadremarks.component.html',
  styleUrls: ['./leadremarks.component.css']

})

export class LeadremarksComponent implements OnInit {

  files: files[] = [];
  supervisors:isupervisor[]=[];
  followupDate?:followupDate 
  lead_id: any;
  supervisor:any;
  user_id:any;
  current_user: any;
  leadId: any;
  pipe = new DatePipe('en-US');

  getcurrentUser() {
    const user: any = localStorage.getItem('currentUser');

    return JSON.parse(user)?.id;
  }
  checked = true;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;


  displayedColumns: string[] = ['id', 'customername', 'phonenumber', 'updated_on', 'renovation'];

  leadForm = this.fb.group({
    remark_data: [null, Validators.required],
    lead_id: this.route.snapshot.paramMap.get('id'),
    user_id: this.getcurrentUser(),
    followup_date: [null, Validators.required],
    supervisor_id:[null],
  });
  
  lead: any;
  leadarray: any[] = [];
  designerservice: any;
  minDate: Date;
  maxDate: Date;


  constructor(private fb: FormBuilder,
    private router: Router,
    private http: DesignerService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 2, 11, 31);
    // this.leadId = this.route.snapshot.paramMap.get('id')
    // this.getremarks();

  }

  setleadId(){
    this.lead_id =this.route.snapshot.paramMap.get('id');
    this.user_id = this.getcurrentUser();
  }

  openDialog() {
    this.dialog.open(AssignsupervisorComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id') } });
  }

  openStatusDialog() {
    this.dialog.open(UpdateStatusComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } });
  }

  openFollowupDialog() {
    this.dialog.open(FollowupComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } })
  }

  openCategoryDialog(){
    this.dialog.open(ViewcategoryComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } })
  }

  addCategory(){
    this.router.navigateByUrl('designer/leaddetails/'+this.lead_id)

  }

  ngOnInit(): void {
    this.setleadId();
    this.loadLead();
    this.getremarks();
    this.listFiles();
    this.getFollowupdate();
    // console.log(this.lead);

  }

  getFollowupdate(){
    this.http.getFollowupDate(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.followupDate=res[0]      
    })
  }

  loadLead() {

    this.http.getLead(this.route.snapshot.paramMap.get('id')).subscribe(lead => {
      this.lead = lead;
      // console.log(this.lead)

    })
  }

  getremarks() {
    this.http.getleadremarks(this.route.snapshot.paramMap.get('id'),this.getcurrentUser()).subscribe(lead => {
      this.leadarray = lead;
    })
  }

  addLeadRemarks() {   
      this.http.addRemarks(this.leadForm.getRawValue()).subscribe(res => {  
      this.getremarks();
      this.addFollowup();
      this.updateStatusValue();
      this.addStatusTracker();
      this.clearForm();   
    });

  }

  clearForm() {
    this.leadForm.controls['remark_data'].setValue("");
    this.leadForm.controls['followup_date'].setValue("")

  }

  listFiles() {
    this.http.listFilesbylead(this.route.snapshot.paramMap.get('id'),this.getcurrentUser()).subscribe(res => {
      this.files = res

    // console.log(res)
    })
  }

  btnclick(url: any) {   
    this.dialog.open(ViewfileComponent, { data: { img_url: url } })
  }

  openFileUpload() {
    this.dialog.open(FileuploadComponent, { disableClose: false, data: { lead_id: this.route.snapshot.paramMap.get('id') } })
  }

  updateStatusValue() {
    let data = {
      status_id: 4
    }
    this.http.updatestatus(this.lead_id, data).subscribe(res => {
      console.log(res)
    })
    this.addStatusTracker();
     window.location.reload()
  }

  addStatusTracker() {
    let data = {
      lead_id: this.lead_id,
      status_id: 4,
      user_id: this.user_id
    }   
    this.http.addStatusTracker(data).subscribe(res => {      
    })
  }

  addFollowup() {
    let data = {
      followup_date: this.pipe.transform(this.leadForm.getRawValue().followup_date, 'MM/dd/yyyy'),
      lead_id: this.lead_id,
      updated_by: this.user_id
    }  
    this.http.addFollowup(data).subscribe(res => {
      // console.log(res)
      this.updateStatusValue();
    })
  }

}
