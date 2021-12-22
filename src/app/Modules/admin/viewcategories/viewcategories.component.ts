import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeadCategory } from 'src/app/_models/leadCategory';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-viewcategories',
  templateUrl: './viewcategories.component.html',
  styleUrls: ['./viewcategories.component.css']
})
export class ViewcategoriesComponent implements OnInit {

  leadCategory?: LeadCategory[]=[];
  category:any;
  catArray:any=[];

  constructor(
    private http: AdminService,
    @Inject(MAT_DIALOG_DATA)public data:any
  ) { }

  ngOnInit(): void {
    this.getleadcategorybylead();
  }

  getleadcategorybylead(){
    this.http.getleadcategorybylead(this.data.lead_id).subscribe(res=>{      
      this.leadCategory=res     
      for (let i=0; i< this.leadCategory.length; i++ )
      {
        let data={
          category_id:this.leadCategory[i].category_id,
          subcat:this.leadCategory[i].subcat,
          units:this.leadCategory[i].units,                  
        }
        this.category=data;
        this.catArray.push(data)             
      }      
      console.log(this.catArray.sort((x:any,y:any) => x.category_id-y.category_id))
    })
  }

}
