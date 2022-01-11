import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './Modules/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwttokenInterceptor } from './jwttoken.interceptor';
import { AuthGuard } from './Modules/auth/auth.guard';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,

    
  ],
  
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    NgMultiSelectDropDownModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,  
  ],

  exports: [
    RouterModule
  ],

  providers: [AuthGuard,
    {
    provide:HTTP_INTERCEPTORS,
    useClass:JwttokenInterceptor,
    multi:true
  }
],
  bootstrap: [    
    AppComponent 
  ]
})

export class AppModule { }
