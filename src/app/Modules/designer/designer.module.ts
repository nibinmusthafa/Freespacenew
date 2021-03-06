import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignernavbarComponent } from './designernavbar/designernavbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LeadremarksComponent } from './leadremarks/leadremarks.component';
import { UpdateleadsComponent } from './updateleads/updateleads.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {  MatCheckboxModule} from '@angular/material/checkbox';
import {  MatDialogModule } from '@angular/material/dialog';
import { AssignsupervisorComponent } from './assignsupervisor/assignsupervisor.component';
import { MatInputModule } from '@angular/material/input'
import {  MatSelectModule } from '@angular/material/select';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { FollowupComponent } from './followup/followup.component';
import { AuthGuard } from '../auth/auth.guard';
import { ViewfileComponent } from './viewfile/viewfile.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { LeaddetailsdesignerComponent } from './leaddetailsdesigner/leaddetailsdesigner.component';
import { MatRadioModule } from '@angular/material/radio';
import { KitchendetailsComponent } from './kitchendetails/kitchendetails.component';
import { WardrobedetailsComponent } from './wardrobedetails/wardrobedetails.component';
import { BeddetailsComponent } from './beddetails/beddetails.component';
import { TvunitdetailsComponent } from './tvunitdetails/tvunitdetails.component';
import { CountertopComponent } from './Kitchensubcategories/countertop/countertop.component';
import { TilesComponent } from './Kitchensubcategories/tiles/tiles.component';
import { SinkComponent } from './Kitchensubcategories/sink/sink.component';
import { CpfittingComponent } from './Kitchensubcategories/cpfitting/cpfitting.component';
import { DrawersComponent } from './Kitchensubcategories/kitchendrawers/drawers.component';
import { BasketComponent } from './Kitchensubcategories/kitchenbasket/basket.component';
import { HingesComponent } from './Kitchensubcategories/kitchenhinges/hinges.component';
import { HardwareComponent } from './Kitchensubcategories/kitchenhardware/hardware.component';
import { LeadtoprojectComponent } from './leadtoproject/leadtoproject.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { WardrobebasketComponent } from './Wardrobesubcategories/wardrobebasket/wardrobebasket.component';
import { WardrobehardwareComponent } from './Wardrobesubcategories/wardrobehardware/wardrobehardware.component';
import { WardrobedrawersComponent } from './Wardrobesubcategories/wardrobedrawers/wardrobedrawers.component';
import { WardrobehingesComponent } from './Wardrobesubcategories/wardrobehinges/wardrobehinges.component';
import { SignoffHomeComponent } from './signoff-home/signoff-home.component';
import { SignoffDetailComponent } from './signoff-detail/signoff-detail.component';
import { ViewmeasurementdetailsComponent } from './viewmeasurementdetails/viewmeasurementdetails.component';
import { ViewmeasurementfileComponent } from './viewmeasurementfile/viewmeasurementfile.component';








const routes: Routes = [
  {
    path: '',canActivate:[AuthGuard], component: DesignernavbarComponent,
    children: [
      { path: "updateleads",canActivate:[AuthGuard], component: UpdateleadsComponent },
      { path: "leadremarks/:id",canActivate:[AuthGuard], component: LeadremarksComponent },
      { path: "viewcategory",canActivate:[AuthGuard],component:ViewcategoryComponent},
      { path: "leaddetails/:id",canActivate:[AuthGuard],component:LeaddetailsdesignerComponent },
      { path: "kitchendetails",canActivate:[AuthGuard],component:KitchendetailsComponent },
      { path: "beddetails",canActivate:[AuthGuard],component:BeddetailsComponent },
      { path: "tvunitdetails",canActivate:[AuthGuard],component:TvunitdetailsComponent },
      { path: "wardrobedetails",canActivate:[AuthGuard],component:WardrobedetailsComponent },
      { path: "leadtoproject",canActivate:[AuthGuard], component: LeadtoprojectComponent },
      { path: "createproject/:id",canActivate:[AuthGuard], component: CreateprojectComponent },
      { path: "signoffhome",canActivate:[AuthGuard], component: SignoffHomeComponent },
      { path: "signoffdetail/:id",canActivate:[AuthGuard], component: SignoffDetailComponent },
      { path: "viewmeasurementdetails/:id",canActivate:[AuthGuard], component: ViewmeasurementdetailsComponent }, 
           
    ]
  }
];

@NgModule({

  declarations: [
    DesignernavbarComponent,
    LeadremarksComponent,
    UpdateleadsComponent,
    AssignsupervisorComponent,
    UpdateStatusComponent,
    FollowupComponent,
    ViewfileComponent,
    FileuploadComponent,
    ViewcategoryComponent,
    LeaddetailsdesignerComponent,
    KitchendetailsComponent,
    WardrobedetailsComponent,
    BeddetailsComponent,
    TvunitdetailsComponent,
    CountertopComponent,
    TilesComponent,
    SinkComponent,
    CpfittingComponent,
    DrawersComponent,
    BasketComponent,
    HingesComponent,
    HardwareComponent,
    LeadtoprojectComponent,
    CreateprojectComponent,
    WardrobebasketComponent,
    WardrobehardwareComponent,
    WardrobedrawersComponent,
    WardrobehingesComponent,
    SignoffHomeComponent,
    SignoffDetailComponent,
    ViewmeasurementdetailsComponent,
   
  

    LeadtoprojectComponent,
    CreateprojectComponent,
    ViewmeasurementfileComponent,


],

  entryComponents:[
    AssignsupervisorComponent,
    FileuploadComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PdfViewerModule,
    MatSnackBarModule,
    MatRadioModule,
 
  ],

  exports: [
    
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
   
  ],
  
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class DesignerModule { }
