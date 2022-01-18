import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupervisorService } from '../supervisor.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-supervisortask',
  templateUrl: './supervisortask.component.html',
  styleUrls: ['./supervisortask.component.css']
})

export class SupervisortaskComponent implements OnInit {

  catnum=0;
  minDate:Date;
  maxDate:Date;
  pipe = new DatePipe('en-US');
  showDeleteButton=false;

  TaskForm = this.fb.group({
    taskdetailform:this.fb.array([
      this.fb.group({
      Task: [null, Validators.required],
      Description: [null, Validators.required],
      startdate: [null, Validators.required],
      enddate: [null, Validators.required], 
      })      
    ])   
  });

  get taskdetailform() {
    return this.TaskForm.get('taskdetailform') as FormArray;
  }

  addnewtaskDetails(): FormGroup {    
    return this.fb.group({
      Task: [''],
      Description: [''],
      startdate: [''],
      enddate: [''],
    })
  }

  constructor(private fb: FormBuilder, 
    private http: SupervisorService,
    private router: Router,) {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear + 2, 11, 31)
     }

    addtaskDetails(){
      this.catnum++;
      this.taskdetailform.push(this.addnewtaskDetails());

    }

    checkTask(){
      if(this.taskdetailform.length > 1){
       this.showDeleteButton=true;  
       console.log(this.taskdetailform.length);
       console.log("hiiiiiiiiiiiiiiiiiii");
       
       
      }
      if(this.taskdetailform.length == 1){
       this.showDeleteButton=false;
       console.log(this.taskdetailform.length);
       console.log("baaaaaaaaaaaaaa");
      }  
    }

    deleteCategory(i){
      this.taskdetailform.removeAt(i);
      this.checkTask()  
    }

  ngOnInit(): void {

  }

  onsubmitaddTaskdetails(){
    // this.http.addTaskdetails(this.TaskForm.get('taskdetailform').value).subscribe(res=>console.log(res))
  }

}
