import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, ibedroomitem, ibrand, icategory, ifinish, imaterial, itypebed, itypesize } from '../designer.service';

@Component({
  selector: 'app-beddetails',
  templateUrl: './beddetails.component.html',
  styleUrls: ['./beddetails.component.css']
})

export class BeddetailsComponent implements OnInit {

  bedroomitems:ibedroomitem[]=[];
  bedtype:itypebed[]=[];
  materials:imaterial[]=[];
  typesizes:itypesize[]=[];
  brands:ibrand[]=[];
  finishes:ifinish[]=[];
  categories_source: icategory[] = [];
  showBedForm = false;
  cat_id:any = null;
  catnum=0;
  selectedCategory:any = null;

  leadBedDetailForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      // category: [{value: '', disabled: true},Validators.required],
      lead_category_id:null,
      bedroomitem:[null, Validators.required],
      type: [null, Validators.required],
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
    return this.leadBedDetailForm.get('detailform') as FormArray;
  }

  addnewDetails(): FormGroup {    
    return this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      // category: [{value: '', disabled: true}],
      lead_category_id:[null],
      bedroomitem:[null, Validators.required],
      type: [null, Validators.required],
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

  manageBedForm(category_id:any){ 
    this.showBedForm = false;
    const num = 0;
    let customer = this.categories_source.find(x => x.id == category_id)
    console.log(customer);
    if (customer.category_id == 1){
      this.showBedForm = true;
    }
    this.detailform.get(num.toString()).get('category').setValue(this.selectedCategory)
    this.detailform.get(num.toString()).get('lead_category_id').setValue(this.selectedCategory)
  }


  getRawValue(){
    console.log(this.leadBedDetailForm.controls.detailform.get('0'))
  }

  setCat_ID(cat_id:any){
    console.log("hiiii")
    this.cat_id=cat_id;
    this.manageBedForm(this.cat_id);
    console.log(this.cat_id)
  }

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

    getCategorylist() {
      this.http.getCategory(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.categories_source = res;
        console.log(res)
      })
    }    

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

    getbedTypeList(){
      this.http.getType().subscribe(res =>{
        this.bedtype=res;
      })

    }

    getBedroomitemlist(){
      this.http.getBedroomitems().subscribe(res =>{
        this.bedroomitems=res;
      })
      
    }

    setSelectedCategory(id:any){
      this.selectedCategory = id;
      this.manageBedForm(id)
      console.log(this.selectedCategory)
    }

    addDetails(){
      this.catnum++;
      this.detailform.push(this.addnewDetails());
      this.detailform.get(this.catnum.toString()).get('lead_category_id').setValue(this.selectedCategory)
      this.detailform.get(this.catnum.toString()).get('category').setValue(this.selectedCategory)  
    }

  ngOnInit(): void {
    this.getCategorylist();
    this.listfinish();
    this.getMaterialList();
    this.getTypesizeList();
    this.getBrandList();
    this.getbedTypeList();
    this.getBedroomitemlist();

  }

  onsubmitaddBedDetails(): void {
    console.log(this.leadBedDetailForm.get('detailform').value)
    this.http.addBeddetails(this.leadBedDetailForm.get('detailform').value).subscribe(res=>console.log(res))
  }


}
