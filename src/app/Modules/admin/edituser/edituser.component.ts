import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, idesignation } from '../admin.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  designations: idesignation[] = [];
  users?: any = null;

  addressForm = this.fb.group({
    id: [null],
    name: [this.users?.name, Validators.required],
    email: [this.users?.email, Validators.required],
    password: [this.users?.password, Validators.required],
    designation_id: [this.users?.designation_id, Validators.required],

  });

  constructor(private fb: FormBuilder,
    private adminservice: AdminService, private router: Router,public admin:AdminService,
    private route: ActivatedRoute) { }

  listdesignation() {
    this.adminservice.getDesignation().subscribe(res => {
      this.designations = res;
      console.log(this.designations)
    })
  }

  adduser() {
    var user = {
      name: this.addressForm.get('name')?.value,
      email: this.addressForm.get('email')?.value,
      password: this.addressForm.get('password')?.value,
      designation_id: this.addressForm.get('designation_id')?.value,

    }

    this.adminservice.addUser(user).subscribe(res => {
      console.log(res);
    })
  }

  manageForm() {

    this.addressForm.controls['id'].setValue(this.users?.id)
    this.addressForm.controls['name'].setValue(this.users?.name)
    this.addressForm.controls['email'].setValue(this.users?.email)
    this.addressForm.controls['designation_id'].setValue(this.users?.designation_id)
    // this.addressForm.controls['password'].setValue(this.users?.password)
  }

  getUserByid() {

    this.adminservice.getUserbyid(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.users = res;
      this.manageForm()
    })
  }



  updateUser() {
    let value = this.addressForm.value
    console.log(value);
    let jsn = {
      "id": value.id,
      "name": value.name,
      "email": value.email,
      // "password":value.password,
      "designation_id": value.designation_id,
    }
    // alert(JSON.stringify(jsn))
    this.adminservice.updateUserbyid(value.id, jsn).subscribe(res => {
      console.log(res);
      window.location.reload()
    })
    this.router.navigateByUrl('admin/manageuser')
  }



  canceluser() {
    this.addressForm.reset()
  }
  resetpassword() {
  
    let id = this.route.snapshot.paramMap.get('id')
    console.log(id);
   
    this.router.navigateByUrl('admin/passwordreset/' +id)

  }
  
  ngOnInit(): void {

    this.listdesignation();
    this.getUserByid();
  }
  onSubmit(): void {
  }
}

function updateUserbyid() {
  throw new Error('Function not implemented.');
}

