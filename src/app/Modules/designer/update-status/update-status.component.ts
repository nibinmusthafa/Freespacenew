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

  fileName = '';
  File: any = '';
  upload=false;
  updateButton=true;

  status:iStatus[]=[];

  qoutationForm =false;

  checkPolicy = true;

updateStatus= this.fb.group({
    status_id:[null,Validators.required],
    quotation_amount:[null,Validators.required],
    quotation_flag:[1],
    // file:[null,Validators.required],
  }
  );

  fileform=this.fb.group({
    file:[null],
    name:[null, Validators.required],
  })

  constructor(private http:DesignerService, 
    private fb:FormBuilder,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any) { }


    onFileSelect(event) {
      
      const selectedfile: File = event.target.files[0];
      if (selectedfile) {
        this.File = selectedfile
        this.fileName = selectedfile.name;
      }
    }


    onUpload() {   
      const user_id: any = localStorage.getItem('currentUser');
      const user: any = JSON.parse(user_id)
      const fd = new FormData();
      fd.append('file', this.File);
      fd.append('name',this.fileName);
      fd.append('lead_id', this.data.lead_id);
      fd.append('user_id', user.id);
      console.log(fd)    
      this.http.addfiledetails(fd).subscribe(res => {
        console.log(res);            
      });
      this.updateButton=false;
    }
    

  checkleadfinalised(id:any){
    this.qoutationForm=false
    if(id==7)
    this.qoutationForm=true
  }
  
  checkbuttonStatus(){

  }

  updateStatusValue()
  {
    
    this.http.updatestatus(this.data.lead_id,this.updateStatus.getRawValue()).subscribe(res =>{
      console.log(res)
      // console.log("flag");
      
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
