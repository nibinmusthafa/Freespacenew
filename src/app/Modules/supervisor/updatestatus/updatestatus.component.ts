import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { iStatus, SupervisorService } from '../supervisor.service';


@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.component.html',
  styleUrls: ['./updatestatus.component.css']
})
export class UpdatestatusComponent implements OnInit {

  status:iStatus[]=[];
  updateStatus = this.fb.group({
    status_id:[null,Validators.required],    
  });

  constructor(private http:SupervisorService, 
    private fb:FormBuilder,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.listStatus();
  }

  updateStatusValue()
  {
    this.http.updatestatus(this.data.lead_id,this.updateStatus.getRawValue()).subscribe(res =>{
      console.log(res)
    })
    this.addStatusTracker();
    window.location.reload()
  }

  listStatus(){
    this.http.listStatus().subscribe(res =>{    
      this.status=res
      // console.log(this.supervisors);
    })
  }

  addStatusTracker(){
    let data={
      lead_id:this.data.lead_id,
      status_id:this.updateStatus.getRawValue().status_id,
      user_id:this.data.user_id
    } 
    this.http.addStatusTracker(data).subscribe(res=>{
      console.log(res)
    })
  }
}
