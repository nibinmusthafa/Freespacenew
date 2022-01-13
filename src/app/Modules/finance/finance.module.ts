import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FinancedashboardComponent } from './financedashboard/financedashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthGuard } from '../auth/auth.guard';
import { FinanceleadComponent } from './financelead/financelead.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import { PaymentComponent } from './payment/payment.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';


//import { FinancedashboardComponent } from './financedashboard/financedashboard.component';

const routes: Routes = [
  {
    path: '',canActivate:[AuthGuard], component: FinancedashboardComponent,
    children:[
    { path: 'financelead',canActivate:[AuthGuard], component: FinanceleadComponent },
    { path: 'payment/:id',canActivate:[AuthGuard], component: PaymentComponent},
  ]
  }
];

@NgModule({
  declarations: [
FinancedashboardComponent,
FinanceleadComponent,
PaymentComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class FinanceModule { }
