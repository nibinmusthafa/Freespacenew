import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, ibrand, icategory, ifinish, imaterial, itypesize, iwardrobepart, iwardrobetype } from '../designer.service';

@Component({
  selector: 'app-wardrobedetails',
  templateUrl: './wardrobedetails.component.html',
  styleUrls: ['./wardrobedetails.component.css']
})
export class WardrobedetailsComponent implements OnInit {
  @Input() catID:any;

  wardrobeparts:iwardrobepart[]=[];
  materials:imaterial[]=[];
  typesizes:itypesize[]=[];
  brands:ibrand[]=[];
  finishes:ifinish[]=[];
  wardrobetypes:iwardrobetype[]=[];
  showWardrobeform = false;
  categories_source: icategory[] = [];
  cat_id:any = null;
  catnum=0;
  selectedCategory:any = null;

  leadWardrobeDetailForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      // category: [{value: '', disabled: true},Validators.required],
      lead_category_id:null,
      wardrobetype:[null, Validators.required],
      part: [null, Validators.required],
      material: [null, Validators.required],
      finish: [null, Validators.required],
      typesize: [null, Validators.required],
      brand: [null, Validators.required],
      edge_banding: [null, Validators.required],
      colour:[null, Validators.required],
      code: [null, Validators.required],
      photoupload: [null, Validators.required],
      measurement: [null, Validators.required],
      remark: [null, Validators.required],
      })      
    ])   
  });
  
  get detailform() {
    return this.leadWardrobeDetailForm.get('detailform') as FormArray;
  }

  addnewDetails(): FormGroup {    
    return this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      // category: [{value: '', disabled: true}],
      lead_category_id:[this.catID],
      wardrobetype:[null, Validators.required],
      part: [null, Validators.required],
      material: [null, Validators.required],
      finish: [null, Validators.required],
      typesize: [null, Validators.required],
      brand: [null, Validators.required],
      edge_banding: [null, Validators.required],
      colour:[null, Validators.required],
      code: [null, Validators.required],
      photoupload: [null, Validators.required],
      measurement: [null, Validators.required],
      remark: [null, Validators.required],
    })
  }

  manageWardrobeForm(category_id:any){ 
    this.showWardrobeform = false;
    const num = 0;
    let customer = this.categories_source.find(x => x.id == category_id)
    console.log(customer);
    if (customer.category_id == 2){
      this.showWardrobeform = true;
    }
    this.detailform.get(num.toString()).get('lead_category_id').setValue(this.catID)
  }

  initCategory(){
    const num = 0;
    this.detailform.get(num.toString()).get('lead_category_id').setValue(this.catID)
  }



  getRawValue(){
    console.log(this.leadWardrobeDetailForm.controls.detailform.get('0'))
  }

  setCat_ID(cat_id:any){
    console.log("hiiii")
    this.cat_id=cat_id;
    this.manageWardrobeForm(this.cat_id);
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

    getWardrobetypelist(){
      this.http.getWardrobetype().subscribe(res =>{
        this.wardrobetypes=res;
      })
    }

    getWardrobepartlist(){
      this.http.getWardrobepart().subscribe(res =>{
        this.wardrobeparts=res;
      })

    }

    setSelectedCategory(id:any){
      this.selectedCategory = id;
      this.manageWardrobeForm(id)
      console.log(this.selectedCategory)
    }

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
    this.getWardrobetypelist();
    this.getWardrobepartlist();
    this.initCategory();
  }

  onsubmitaddWardrobeDetails(): void {
    console.log(this.leadWardrobeDetailForm.get('detailform').value)
    this.http.addWardrobedetails(this.leadWardrobeDetailForm.get('detailform').value).subscribe(res=>console.log(res))
  }
}
