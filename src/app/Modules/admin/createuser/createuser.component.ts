import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, Validators } from '@angular/forms';
import { AdminService, idesignation } from '../admin.service'


export interface iuser{
  message:string;
  status:boolean;
  response:number;
}
@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent {
  user:any;
  designations:idesignation[]=[];

  addressForm = this.fb.group({

    name: [null, Validators.required],
    email: [null, [Validators.required]],
    password: [null, Validators.required],
    designation_id: [null, Validators.required],          
   
  });           

  constructor(private fb: FormBuilder,private adminservice:AdminService) {}

  addUser(){
    this.adminservice.addUser(this.addressForm.getRawValue()).subscribe(res =>{
    this.user=res,
    console.log(this.user.message)
    alert(this.user.message === "Success"?"Successfully added":"failed to add")
    this.canceluser();
    },
    error=>{
      alert(error.error.email[0])
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
  }

  canceluser(){
    window.location.reload()
  }
}
