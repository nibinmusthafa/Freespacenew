import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SupervisordashboardComponent } from './supervisordashboard/supervisordashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthGuard } from '../auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { UpdateleadbysupervisorComponent } from './updateleadbysupervisor/updateleadbysupervisor.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ViewfileComponent } from './viewfile/viewfile.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { AssignsupervisorComponent } from './assignsupervisor/assignsupervisor.component';
import { UpdatestatusComponent } from './updatestatus/updatestatus.component';
import { FollowupComponent } from './followup/followup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule} from '@angular/material/core'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SupervisorremarksComponent } from './supervisorremarks/supervisorremarks.component';
import { SupervisorviewcategoryComponent } from './supervisorviewcategory/supervisorviewcategory.component';



const routes: Routes = [

  {
    path: '',canActivate:[AuthGuard], component: SupervisordashboardComponent,
    children: [
      { path: "updateleads",canActivate:[AuthGuard], component: UpdateleadbysupervisorComponent },
      { path: "supervisorremarks/:id",canActivate:[AuthGuard], component: SupervisorremarksComponent },
      { path: "supervisorcategory",canActivate:[AuthGuard], component: SupervisorviewcategoryComponent },
      
    ]
  
  }
]

@NgModule({
  declarations: [SupervisordashboardComponent, 
    UpdateleadbysupervisorComponent, 
    ViewfileComponent, 
    FileuploadComponent, 
    AssignsupervisorComponent, 
    UpdatestatusComponent, 
    FollowupComponent, SupervisorremarksComponent, SupervisorviewcategoryComponent],

    entryComponents:[
      AssignsupervisorComponent,
      FileuploadComponent,
    ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSnackBarModule,
    PdfViewerModule

  ],

  exports: [
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,        
    MatNativeDateModule,
    MatSnackBarModule
    
  ],

  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})

export class SupervisorModule { }
