import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

 
links:any=["leads","projects","supervisor","usermanage","addprojects","addcustomer","createlead","designation","managelead"];
user:any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private http:AdminService,private router:Router) {}

  ngOnInit(){
      // this.user = localStorage.getItem('item')
      // this.user = JSON.parse(this.user);   
      }

    getuser(){
      this.http.getUserlist().subscribe(res =>{
        console.log(res);
      })
    }

    btnclick() {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      this.router.navigate(['']);  
    }
}