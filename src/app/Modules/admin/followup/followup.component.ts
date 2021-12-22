import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})
export class FollowupComponent implements OnInit {
  minDate:Date;
  maxDate:Date;
  pipe = new DatePipe('en-US');
  followupForm = this.fb.group({
    followup_date: [null],
  });

  constructor(private http: AdminService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear + 2, 11, 31);
      }
      
  addFollowup() {
    let data = {
      followup_date: this.pipe.transform(this.followupForm.getRawValue().followup_date, 'MM/dd/yyyy'),
      lead_id: this.data.lead_id,
      updated_by: this.data.user_id
    }
    console.log(data)
    this.setFollowupdate(this.pipe.transform(this.followupForm.getRawValue().followup_date, 'MM/dd/yyyy'));
    this.http.addFollowup(data).subscribe(res => {
      this.updateStatusValue();      
    })
  }

  setFollowupdate(followupDate:any){
    let data={followup_date:followupDate}
    this.http.setFollowupDate(this.data.lead_id,data).subscribe(res=>{
      console.log(res)    
    })
  }

  updateStatusValue() {
    let data = {
      status_id: 4
    }
    this.http.updatestatus(this.data.lead_id, data).subscribe(res => {
      console.log(res)
    })
    this.addStatusTracker();
    window.location.reload();
  }

  addStatusTracker() {
    let data = {
      lead_id: this.data.lead_id,
      status_id: 4,
      user_id: this.data.user_id
    }
    console.log(data)
    this.http.addStatusTracker(data).subscribe(res => {
      console.log(res)
    })
  }

  ngOnInit(): void {
  }

}
