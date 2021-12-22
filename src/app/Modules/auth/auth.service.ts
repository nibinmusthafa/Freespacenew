import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';


export interface loginuser {
  id: number,
  name: string,
  email: string,
  designationname: string,
  phone_number: number;
  user_designation: number;
};

let user: any = localStorage.getItem('user');
let token;
if (user === null || user === "") {
  token = JSON.parse(user)?.jwt;
}

const header = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('token', token);

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private baseUrl: string = "";

  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl
  }

  login(val: any) {

    return this.http.post(this.baseUrl + 'login/', val).pipe(
      map((response: any) => {
        const userres = response;
        localStorage.setItem('token', JSON.stringify(userres));
        this.currentUserSource.next(user);
        // console.log(userres)

      })
    )
  }

  logout() {
    localStorage.clear()
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  userdata() {
    return this.http.get(this.baseUrl + 'user/')
  }
}



