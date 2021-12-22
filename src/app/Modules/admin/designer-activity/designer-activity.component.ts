import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { followupDate } from 'src/app/_models/user';
import { MatDialog } from '@angular/material/dialog';
import { FollowupComponent } from '../followup/followup.component';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ViewcategoriesComponent } from '../viewcategories/viewcategories.component';
import { ViewfileComponent } from '../viewfile/viewfile.component';
import { files } from 'src/app/_models/filesmodel';



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
  selector: 'app-designer-activity',
  templateUrl: './designer-activity.component.html',
  styleUrls: ['./designer-activity.component.css']
})

export class DesignerActivityComponent implements OnInit {

  files: files[] = [];
  lead_id: any;
  user_id: any;
  pipe = new DatePipe('en-US');
  designer_id?: any;
  lead: any;
  leadarray: any[] = [];
  designers: any[] = [];
  designerId

  getcurrentUser() {
    const user: any = localStorage.getItem('currentUser');
    return JSON.parse(user)?.id;
  }

  followupDate?: followupDate
  displayedColumns: string[] = ['id', 'customername', 'phonenumber', 'updated_on', 'renovation'];
  leadForm = this.fb.group({
    remark_data: [null, Validators.required],
    lead_id: this.route.snapshot.paramMap.get('id'),
    user_id: this.getcurrentUser(),
    followup_date: [null, Validators.required]
  });

  constructor(private http: AdminService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router) {
  }

  openFollowupDialog() {
    this.dialog.open(FollowupComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } })
  }

  ngOnInit(): void {
    this.loadLead();
    this.getFollowupdate();

  }

  getFollowupdate() {
    this.http.getFollowupDate(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.followupDate = res[0]
    })
  }

  loadLead() {
    this.http.getLeads(this.route.snapshot.paramMap.get('id')).subscribe(lead => {
      this.lead = lead;
      console.log(lead);
      this.designer_id = lead.designer_id
      console.log(this.designer_id);
      this.ListDesigner()
      this.getremarks(lead.designer_id);
      this.listFiles(lead.designer_id)
    })
  }

  getremarks(id: any) {
    this.http.getremarksbydesigner(this.route.snapshot.paramMap.get('id'), id).subscribe(lead => {
      this.leadarray = lead;
      console.log(lead)
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

  openCategoryDialog() {
    this.dialog.open(ViewcategoriesComponent, { data: { lead_id: this.route.snapshot.paramMap.get('id'), user_id: this.getcurrentUser() } })
  }

  btnclick(url: any) {
    this.dialog.open(ViewfileComponent, { data: { img_url: url } })
  }

  listFiles(id: any) {
    this.http.listFilesbyleaddesigner(this.route.snapshot.paramMap.get('id'), id).subscribe(res => {
      this.files = res
      // console.log(res)
    })
  }

  ListDesigner() {

    this.http.listDesigner().subscribe(des => {
      this.designers = des;
      console.log(this.designers);
    })
    console.log(this.designer_id);
    let leadDesigner = this.designers.find(e => e.id === this.designer_id)
    console.log(leadDesigner);
  }
}
