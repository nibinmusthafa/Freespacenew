import { Component, OnInit, Inject } from '@angular/core';
import { DesignerService,isupervisor } from '../designer.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assignsupervisor',
  templateUrl: './assignsupervisor.component.html',
  styleUrls: ['./assignsupervisor.component.css']
})
export class AssignsupervisorComponent implements OnInit {

  supervisors:isupervisor[]=[];

  constructor(private http:DesignerService, 
    private fb:FormBuilder,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) { }

  listSupervisor(){
    this.http.listSupervisors().subscribe(res =>{
     
      this.supervisors=res
      // console.log(this.supervisors);
    })
  }

  supervisorAssign = this.fb.group({
    supervisor_id:[null],
    
    
  });

  ngOnInit(): void {
    this.listSupervisor();
  }

  updateSupervisor()
  {
    this.http.updateSupervisor(this.data.lead_id,this.supervisorAssign.getRawValue()).subscribe(res =>{
      console.log(res)
      window.location.reload()
    })
    
    
  }
  onSubmit(){

  }

}
