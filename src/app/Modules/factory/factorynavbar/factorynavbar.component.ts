import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-factorynavbar',
  templateUrl: './factorynavbar.component.html',
  styleUrls: ['./factorynavbar.component.css']
})
export class FactorynavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private router:Router) {}
  btnclick() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.router.navigate(['']);  
  }
}
