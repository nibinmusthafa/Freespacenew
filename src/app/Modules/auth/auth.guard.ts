import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public JWTVALUES: any;
  public JWTs: any;

  constructor(private router: Router,
    // @Inject(DOCUMENT) private _document: Document

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    this.JWTVALUES = localStorage.getItem('token')
    this.JWTs = JSON.parse(this.JWTVALUES)?.jwt
    
    if (this.JWTs) {
      return true;
    }

    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
