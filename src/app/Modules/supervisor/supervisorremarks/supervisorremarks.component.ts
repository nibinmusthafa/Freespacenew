import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { files } from 'src/app/_models/filesmodel';
import { followupDate } from 'src/app/_models/user';
import { AssignsupervisorComponent } from '../assignsupervisor/assignsupervisor.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { FollowupComponent } from '../followup/followup.component';
import { isupervisor, SupervisorService } from '../supervisor.service';
import { SupervisorviewcategoryComponent } from '../supervisorviewcategory/supervisorviewcategory.component';
import { UpdatestatusComponent } from '../updatestatus/updatestatus.component';
import { ViewfileComponent } from '../viewfile/viewfile.component';


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
  selector: 'app-supervisorremarks',
  templateUrl: './supervisorremarks.component.html',
  styleUrls: ['./supervisorremarks.component.css']
})
export class SupervisorremarksComponent implements OnInit {

  files: files[] = [];
  supervisors:isupervisor[]=[];
  followupDate?:followupDate 
  lead_id: any;
  user_id:any;
  current_user: any;
  leadId: any;
  pipe = new DatePipe('en-US');

  getcurrentUser() {
    const user: any = localStorage.getItem('currentUser');
    return JSON.parse(user)?.id;
  }
  
  supervisorAssign = this.fb.group({
    supervisor_id:[null],     
  });

  checked = true;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  displayedColumns: string[] = ['id', 'customername', 'phonenumber', 'updated_on', 'renovation'];
  leadForm = this.fb.group({
    remark_data: [null, Validators.required],
    lead_id: this.route.snapshot.paramMap.get('id'),
    user_id: this.getcurrentUser(),
    followup_date: [null, Validators.required]
  });

  lead: any;
  leadarray: any[] = [];
  designerservice: any;
  minDate: Date;
  maxDate: Date;

  constructor(private fb: FormBuilder,
    private http: SupervisorService,
    private route: ActivatedRoute,
    public dialog: MatDialog) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 2, 11, 31);
    }

    setleadId(){
      this.lead_id =this.route.snapshot.paramMap.get('id');
      this.user_id = this.getcurrentUser(); 
    }

    openDialog() {
      this.dialog.open(AssignsupervisorComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id') } });
    }

    openStatusDialog() {
      this.dialog.open(UpdatestatusComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } });
    }
  
    openFollowupDialog() {
      this.dialog.open(FollowupComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } })
    }

  ngOnInit(): void {
    this.setleadId();
    this.loadLead();
    this.getremarks();
    this.listFiles();
    this.geFollowupdate();    
  }

  geFollowupdate(){
    this.http.getFollowupDate(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.followupDate=res[0]      
    })
  }

  loadLead() {
    this.http.getLead(this.route.snapshot.paramMap.get('id')).subscribe(lead => {
      this.lead = lead;
      console.log(this.lead)
    })
  }

  getremarks() {
    this.http.getremarksbysupervisor(this.route.snapshot.paramMap.get('id'),this.getcurrentUser()).subscribe(lead => {
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

  }

  listFiles() {
    this.http.listFilesbylead(this.route.snapshot.paramMap.get('id'),this.getcurrentUser()).subscribe(res => {
      this.files = res
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
  openCategoryDialog(){
    this.dialog.open(SupervisorviewcategoryComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } })
  }
}
