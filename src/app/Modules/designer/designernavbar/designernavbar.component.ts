import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designernavbar',
  templateUrl: './designernavbar.component.html',
  styleUrls: ['./designernavbar.component.css']
})
export class DesignernavbarComponent {

  links:any=["updateleads"];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router:Router) {}
  btnclick() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.router.navigate(['']);

  }


}
