import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { FollowupComponent } from '../followup/followup.component';
import { followupDate } from 'src/app/_models/user';
import { ViewfileComponent } from '../viewfile/viewfile.component';
import { files } from 'src/app/_models/filesmodel';
import { ViewcategoriesComponent } from '../viewcategories/viewcategories.component';
import { ThrowStmt } from '@angular/compiler';
import { DatePipe } from '@angular/common';

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

@Component({
  selector: 'app-supervisor-activity',
  templateUrl: './supervisor-activity.component.html',
  styleUrls: ['./supervisor-activity.component.css']
})

export class SupervisorActivityComponent implements OnInit {

  files: files[] = [];
  lead:any;
  lead_id: any;
  user_id:any;
  pipe = new DatePipe('en-US');
  supervisor_id:any;
  leadarray: any[] = [];
  

  getcurrentUser() {
    const user: any = localStorage.getItem('currentUser');
    return JSON.parse(user)?.id;
  }

  followupDate?:followupDate 
  displayedColumns: string[] = ['id', 'customername', 'phonenumber', 'updated_on', 'renovation'];
  leadForm = this.fb.group({
    remark_data: [null, Validators.required],
    lead_id: this.route.snapshot.paramMap.get('id'),
    user_id: this.getcurrentUser(),
    followup_date: [null, Validators.required]
  });

  constructor(private http:AdminService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router:Router) { }


    openFollowupDialog() {
      this.dialog.open(FollowupComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } })
    }

    ngOnInit(): void {
    this.loadLead();
    this.getFollowupdate();}

    
    getFollowupdate(){
      this.http.getFollowupDate(this.route.snapshot.paramMap.get('id')).subscribe(res=>{
      this.followupDate=res[0]      
      })
    }

    loadLead() {
      this.http.getLeads(this.route.snapshot.paramMap.get('id')).subscribe(lead=>{
        this.lead = lead;
        this.supervisor_id = lead.supervisor_id
        this.getremarks(lead.supervisor_id);
        this.listFiles(lead.supervisor_id);
        // console.log(this.lead)
      })
    }

    getremarks(id:any) {
      this.http.getremarksbysupervisor(this.route.snapshot.paramMap.get('id'),id).subscribe(lead =>{
        this.leadarray = lead;
      })
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
      this.updateStatusValue();
      })
    }   
    
    openCategoryDialog(){
      this.dialog.open(ViewcategoriesComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } })
    }

    btnclick(url: any) {  
      this.dialog.open(ViewfileComponent, { data: { img_url: url } })
    }

    listFiles(id:any) {
      this.http.listFilesbyleadsupervisor(this.route.snapshot.paramMap.get('id'),id).subscribe(res => {
      this.files = res
    // console.log(res)
      })
  }   
}
