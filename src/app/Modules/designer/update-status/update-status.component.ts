import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, iStatus } from '../designer.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})

export class UpdateStatusComponent implements OnInit {

  status:iStatus[]=[];

  qoutationForm =false;

  checkPolicy = true;


  updateStatus = this.fb.group({
    status_id:[null,Validators.required],
    quotation_amount:[null,Validators.required],
    quotation_flag:[1]


  }
  );

  constructor(private http:DesignerService, 
    private fb:FormBuilder,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  

  checkleadfinalised(id:any){

    this.qoutationForm=false
    if(id==7)
    this.qoutationForm=true
  }
  
  checkbuttonStatus(){

  }

  updateStatusValue()
  {
    console.log("before flag");
    
    console.log(this.updateStatus.getRawValue());
    
    this.http.updatestatus(this.data.lead_id,this.updateStatus.getRawValue()).subscribe(res =>{
      console.log(res)
      console.log("flag");
      
    })
    this.addStatusTracker();
    // window.location.reload()
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

  ngOnInit(): void {

    this.listStatus();
  }


}
