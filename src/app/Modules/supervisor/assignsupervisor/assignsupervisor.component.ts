import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { isupervisor, SupervisorService } from '../supervisor.service';

@Component({
  selector: 'app-assignsupervisor',
  templateUrl: './assignsupervisor.component.html',
  styleUrls: ['./assignsupervisor.component.css']
})
export class AssignsupervisorComponent implements OnInit {

  supervisors:isupervisor[]=[];

  constructor(private http:SupervisorService, 
    private fb:FormBuilder,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

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
