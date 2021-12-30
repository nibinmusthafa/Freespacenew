import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeadCategory } from 'src/app/_models/leadCategory';
import { SupervisorService } from '../supervisor.service';

@Component({
  selector: 'app-supervisorviewcategory',
  templateUrl: './supervisorviewcategory.component.html',
  styleUrls: ['./supervisorviewcategory.component.css']
})
export class SupervisorviewcategoryComponent implements OnInit {

  leadCategory?: LeadCategory[]=[];
  category:any;
  catArray:any=[];

  constructor(private http:SupervisorService,
    @Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit(): void {
    this.getleadcategorybylead();

  }
  getleadcategorybylead(){
    this.http.getleadcategorybylead(this.data.lead_id).subscribe(res=>{
      
      this.leadCategory=res
      
      for (let i=0; i< this.leadCategory.length; i++ )
      {
        let data={
          category_name:this.leadCategory[i].category_name,
          // subcat:this.leadCategory[i].subcat,
          location:this.leadCategory[i].location,                  
        }
        this.category=data;
        this.catArray.push(data)             
      }      
      console.log(this.catArray.sort((x:any,y:any) => x.category_id-y.category_id))
    })
  }

}
