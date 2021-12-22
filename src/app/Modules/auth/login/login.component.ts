import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';



export interface user {
  user_id: number,
  user_name: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  user: any;
  loggedUser: any;
  desig: string = "";

  constructor(private fb: FormBuilder, private router: Router, private http: AuthService,private snackBar: MatSnackBar,) { }

  onSubmit() {

    this.user = this.loginForm.getRawValue();

    if (this.user.email === "abna@gmail.com" && this.user.password === "1234") {

      const item: user = { user_id: 1, user_name: "Abna" };

      localStorage.setItem('item', JSON.stringify(item));

      this.router.navigate(['admindashboard']);

    };
    if (this.user.email === "nibin@gmail.com" && this.user.password === "1234") {

      const item: user = { user_id: 2, user_name: "nibin" };

      localStorage.setItem('item', JSON.stringify(item));

      this.router.navigate(['admin']);

      this.router.navigate(['designer']);

    };
  }

  login() {
    console.log(this.loginForm.getRawValue());
    this.http.login(this.loginForm.getRawValue()).subscribe(res => {
      this.loggedUser = res;   
      
      //  this.setToken(JSON.stringify(res));
      // this.router.navigateByUrl('/admin')
      this.getuser();
    },error=>{
    
      alert(error.error.detail);
      
    })
  }

  setToken(token: any) {
    localStorage.setItem('user', token);
  }

  getcurrentUser() {
    const user: any = localStorage.getItem('currentUser');
    // console.log(JSON.parse(user)?.jwt);
    return JSON.parse(user)?.jwt;
  }


  ngOnInit(): void {

  }

  getuser() {
    this.http.userdata().subscribe(res => {
      console.log(res)
      localStorage.setItem('currentUser', JSON.stringify(res))
      // console.log(res)
      this.desig = this.getDesignation().toLowerCase()
      this.router.navigate([this.desig]);
    })
  }

  logout() {
    this.http.logout();
  }

  getDesignation() {
    const designation: any = localStorage.getItem('currentUser');
    return JSON.parse(designation)?.userdesignation;
  }
}

