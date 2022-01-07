import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { CreateleadComponent } from './createlead/createlead.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CreateuserComponent } from './createuser/createuser.component';
import { AuthGuard } from '../auth/auth.guard';
import { ManageleadsComponent } from './manageleads/manageleads.component';
import { DesignerActivityComponent } from './designer-activity/designer-activity.component';
import { SupervisorActivityComponent } from './supervisor-activity/supervisor-activity.component';
import { FollowupComponent } from './followup/followup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ViewcategoriesComponent } from './viewcategories/viewcategories.component';
import { ViewfileComponent } from './viewfile/viewfile.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditleadComponent } from './editlead/editlead.component';
import { ManagecustomerComponent } from './managecustomer/managecustomer.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { EdituserComponent } from './edituser/edituser.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LeadDetailsComponent } from './lead-details/lead-details.component';

const routes: Routes = [

  { path:'', canActivate:[AuthGuard], component: AdmindashboardComponent, 
   children:[
      { path:'createlead',canActivate:[AuthGuard], component: CreateleadComponent },
      { path:'addcustomer',canActivate:[AuthGuard], component: AddcustomerComponent },
      { path:'createuser',canActivate:[AuthGuard], component: CreateuserComponent },
      { path:'manageleads',canActivate:[AuthGuard], component: ManageleadsComponent },
      { path:'designeractivity/:id',canActivate:[AuthGuard], component: DesignerActivityComponent },
      { path:'supervisoractivity/:id',canActivate:[AuthGuard], component: SupervisorActivityComponent },
      { path:'viewcategories',canActivate:[AuthGuard], component: ViewcategoriesComponent }, 
      { path:'viewfile',canActivate:[AuthGuard], component: ViewfileComponent },
      { path:'editlead/:id',canActivate:[AuthGuard], component: EditleadComponent },
      { path:'managecustomer',canActivate:[AuthGuard], component: ManagecustomerComponent },
      { path:'manageuser',canActivate:[AuthGuard], component: ManageuserComponent },  
      { path:'editcustomer/:id',canActivate:[AuthGuard], component: EditcustomerComponent },
      { path:'edituser/:id',canActivate:[AuthGuard], component: EdituserComponent },
      { path:'leaddetails/:id',canActivate:[AuthGuard], component: LeadDetailsComponent },
  ]}
  ];

@NgModule({ 
  declarations: [

  AdmindashboardComponent,
      CreateleadComponent,
      AddcustomerComponent,
      CreateuserComponent,
      ManageleadsComponent,
      DesignerActivityComponent,
      SupervisorActivityComponent,
      FollowupComponent,
      ViewcategoriesComponent,
      ViewfileComponent,
      EditleadComponent,
      ManagecustomerComponent,
      ManageuserComponent,
      EditcustomerComponent,
      EdituserComponent,
      LeadDetailsComponent,    
   ],

  imports: 
  [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MaterialModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    PdfViewerModule,
    MatSnackBarModule,
   
   ],

  exports: [
    RouterModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
    ],

  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: {} }]
})

export class AdminModule { }
