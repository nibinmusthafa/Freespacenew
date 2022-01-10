import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormArray,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, ibrand, icategory, ifinish, imaterial, ipart, itypesize } from '../designer.service';

@Component({
  selector: 'app-leaddetailsdesigner',
  templateUrl: './leaddetailsdesigner.component.html',
  styleUrls: ['./leaddetailsdesigner.component.css']
})


export class LeaddetailsdesignerComponent {

  category_id:null;
  finishes:ifinish[]=[];
  categories: icategory[] = [];
  parts:ipart[]=[];
  materials:imaterial[]=[];
  typesizes:itypesize[]=[];
  brands:ibrand[]=[];
  lead?: any=null;
  cat_id:any = null;
  selectedCategory:any = null;
  showKitchenForm = false;
  showBedForm=false;
  showWardrobeform=false;
  showTvunitform=false;
  catnum=0;


  CategoryForm=this.fb.group({
    categories: [null,Validators.required],
  })

  Checkcategory(category_id:any){
    this.showKitchenForm = false;
    this.showBedForm=false;
    this.showWardrobeform=false;
    this.showTvunitform=false;
    const num = 0;
    let customer = this.categories.find(x => x.id == category_id)
    console.log(customer);
    if (customer.category_id == 1){
      this.showKitchenForm = true;
    }
    if (customer.category_id == 4){
      this.showBedForm = true;
    }
    if (customer.category_id == 2){
      this.showWardrobeform = true;
    }
    if (customer.category_id == 3){
      this.showTvunitform = true;
    }
  }
  
  setSelectedCategory(id:any){
    this.Checkcategory(id);
    this.selectedCategory = id;
    console.log(this.selectedCategory)
  }

  setCat_ID(cat_id:any){
    console.log("hiiii")
    this.cat_id=cat_id;
    console.log(this.cat_id)
  }

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,
    ) {}

  getCategorylist() {
    this.http.getCategorybyid(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.categories = res;
      console.log(res)
    })
  }

  ngOnInit(){
    this.getCategorylist();
   
    // this.getCategoriesid();
  }

 
}
