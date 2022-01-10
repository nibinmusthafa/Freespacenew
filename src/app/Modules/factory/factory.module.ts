import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FactorynavbarComponent } from './factorynavbar/factorynavbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthGuard } from '../auth/auth.guard';
// import { Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',canActivate:[AuthGuard], component: FactorynavbarComponent,
  }
];


@NgModule({
  declarations: [FactorynavbarComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild(routes)
  ]
})
export class FactoryModule { }
