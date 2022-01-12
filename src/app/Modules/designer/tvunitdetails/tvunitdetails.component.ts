import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, ibrand, icategory, ifinish, imaterial, itypesize } from '../designer.service';

@Component({
  selector: 'app-tvunitdetails',
  templateUrl: './tvunitdetails.component.html',
  styleUrls: ['./tvunitdetails.component.css']
})
export class TvunitdetailsComponent implements OnInit {

  @Input() catID:any;

  materials:imaterial[]=[];
  typesizes:itypesize[]=[];
  brands:ibrand[]=[];
  finishes:ifinish[]=[];
  categories_source: icategory[] = [];
  showTvunitform = false;
  cat_id:any = null;
  selectedCategory:any = null;
  catnum=0;


  leadTvUnitDetailForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      lead_category_id:null,
      material: [null, Validators.required],
      finish: [null, Validators.required],
      typesize: [null, Validators.required],
      brand: [null, Validators.required],
      edgebanding: [null, Validators.required],
      colour:[null, Validators.required],
      code: [null, Validators.required],
      // photoupload: [null, Validators.required],
      measurement: [null, Validators.required],
      remark: [null, Validators.required],
      })      
    ])   
  });

  get detailform() {
    return this.leadTvUnitDetailForm.get('detailform') as FormArray;
  }

  addnewDetails(): FormGroup {    
    return this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      // category: [{value: '', disabled: true}],
      lead_category_id:[this.catID],
      material: [null, Validators.required],
      finish: [null, Validators.required],
      typesize: [null, Validators.required],
      brand: [null, Validators.required],
      edgebanding: [null, Validators.required],
      colour:[null, Validators.required],
      code: [null, Validators.required],
      // photoupload: [null, Validators.required],
      measurement: [null, Validators.required],
      remark: [null, Validators.required],
    })
  }

  // manageTVUnitForm(category_id:any){ 
  //   this.showTvunitform = false;
  //   const num = 0;
  //   let customer = this.categories_source.find(x => x.id == category_id)
  //   console.log(customer);
  //   if (customer.category_id == 3){
  //     this.showTvunitform = true;
  //   }
  //   this.detailform.get(num.toString()).get('lead_category_id').setValue(this.catID)
  // }

  initCategory(){
    const num = 0;
    this.detailform.get(num.toString()).get('lead_category_id').setValue(this.catID)
  }


  setCat_ID(cat_id:any){
    console.log("hiiii")
    this.cat_id=cat_id;
    // this.manageTVUnitForm(this.cat_id);
    console.log(this.cat_id)
  }

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

    getMaterialList(){
      this.http.getMaterial().subscribe(res =>{
        this.materials=res;
      })
    }
  
    getTypesizeList(){
      this.http.getTypesize().subscribe(res =>{
        this.typesizes=res;
      })
    }
  
    getBrandList(){
      this.http.getBrand().subscribe(res =>{
        this.brands=res;
      })
    }

    listfinish(){  
      this.http.getfinish().subscribe(res =>{
        this.finishes=res;    
      })
    }

    // setSelectedCategory(id:any){
    //   this.selectedCategory = id;
    //   this.manageTVUnitForm(id)
    //   console.log(this.selectedCategory)
    // }

    
    addDetails(){
      this.catnum++;
      this.detailform.push(this.addnewDetails());
      this.detailform.get(this.catnum.toString()).get('lead_category_id').setValue(this.catID) 
    }


  ngOnInit(): void {
    this.listfinish();
    this.getMaterialList();
    this.getTypesizeList();
    this.getBrandList();
    this.initCategory();

  }

  onsubmitaddTVunitDetails(): void {
    console.log(this.leadTvUnitDetailForm.get('detailform').value)
    this.http.addTVunitetails(this.leadTvUnitDetailForm.get('detailform').value).subscribe(res=>console.log(res))
  }
}
