import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, idesignation } from '../admin.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent {

  designations:idesignation[]=[];

  addressForm = this.fb.group({

    name: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    designation_id: [null, Validators.required],          
   
  });           

  constructor(private fb: FormBuilder,private adminservice:AdminService) {}

  addUser(){

    this.adminservice.addUser(this.addressForm.getRawValue()).subscribe(res =>{
    console.log(res);

    })
  }

  listdesignation(){
    
    this.adminservice.getDesignation().subscribe(res =>{
      this.designations=res;
      console.log(this.designations)
    })
  }

  ngOnInit(){
    this.listdesignation()
  }

  onSubmit(): void {
    this.addUser();
    this.addressForm.reset();
    
  }
  canceluser(){
    window.location.reload()
  }
}
