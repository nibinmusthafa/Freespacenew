import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatFormFieldModule,
    
    // MatDatepickerModule,
    // MatNativeDateModule,


  ],
  exports:[
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatFormField,
    MatExpansionModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
   
  
    
  ],
})
export class MaterialModule { }
