import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { states } from '../../admin/models/States';
import { DesignerService,  istatusforprojects,  isupervisors } from '../designer.service';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent {


  statuses:istatusforprojects[]=[];
  supervisors:isupervisors[]=[];
  pipe = new DatePipe('en-US');

  currentUser:any;
  minDate: Date;
  maxDate: Date;
  
  addresssForm = this.fb.group({
  lead_id: this.route.snapshot.paramMap.get('id'),
  completion_date: [null, Validators.required],
  tentative_date: [null, Validators.required],
  user_id: this.getCurrentuser(),
  supervisor_id: [null, Validators.required],
  designer_id: this.getCurrentuser(),
  status_id: 1,

  });
  // addressForm = this.fb.group({
  //   company: null,
  //   firstName: [null, Validators.required],
  //   lastName: [null, Validators.required],
  //   address: [null, Validators.required],
  //   address2: null,
  //   city: [null, Validators.required],
  //   state: [null, Validators.required],
  //   postalCode: [null, Validators.compose([
  //     Validators.required, Validators.minLength(5), Validators.maxLength(5)])
  //   ],
  //   shipping: ['free', Validators.required]
  // });

  hasUnitNumber = false;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
  ];


  constructor(private fb: FormBuilder,private http:DesignerService,private router:Router,
    private route:ActivatedRoute) {    
      const currentYear = new Date().getFullYear();
      this.minDate = new Date();
      this.maxDate = new Date(currentYear + 2, 11, 31);
    }

    listDesigners(){
      this.http.getDesignername().subscribe(res=>{this.supervisors=res})
  
    }
  
    // listProjectsstatus(){
    //   this.http.getSupervisorname().subscribe(res=>{this.statuses=res})
  
    // }


    ngOnInit(){
     this.listDesigners()
    //  this.listProjectsstatus()
      
    }
    Cancelprojects(){
      window.location.reload()

    }

    // trimDate(myDate){
    //   let strDate = JSON.stringify(myDate.value)
    //   let newDate = strDate.substring(1, 11)
    //   //assign the new trimmed date to date value in ur form
    //   this.addresssForm.controls['date_field'].setValue(newDate)
    // }

  getCurrentuser(){
    this.currentUser=localStorage.getItem("currentUser")
    return JSON.parse(this.currentUser)?.id 

  }
  onSubmit(): void {
  

    let data={
      user_id: this.getCurrentuser(),
      designer_id: this.getCurrentuser(),
      supervisor_id: this.addresssForm.getRawValue().supervisor_id,
      lead_id: this.route.snapshot.paramMap.get('id'),
      completion_date:this.pipe.transform(this.addresssForm.getRawValue().completion_date, 'MM/dd/yyyy'),
      tentative_date:this.pipe.transform(this.addresssForm.getRawValue().tentative_date, 'MM/dd/yyyy'),
      status_id: 1,
    }

    this.http.addProjectdetails(data).subscribe(res=>
    console.log(res));
    alert('PROJECT CREATED SUCCESSFULLY!!!!');
    this.addresssForm.reset()
    this.router.navigateByUrl('designer/leadtoproject')
  }
}










