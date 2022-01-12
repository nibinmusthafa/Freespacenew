import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, ibrand, icategory, ifinish, imaterial, itypesize, iwardrobepart, iwardrobetype } from '../designer.service';

@Component({
  selector: 'app-wardrobeshutter',
  templateUrl: './wardrobeshutter.component.html',
  styleUrls: ['./wardrobeshutter.component.css']
})
export class WardrobeshutterComponent implements OnInit {
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
  checked=false;
  checked1=false;
  checked2=false;
  checked3=false;
  
  leadShutterDetailForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      // category: [{value: '', disabled: true},Validators.required],
      lead_category_id:null,
      type:[null, Validators.required],
      Part: [null, Validators.required],
      material: [null, Validators.required],
      finish: [null, Validators.required],
      typesize: [null, Validators.required],
      brand: [null, Validators.required],
      edgebanding: [null, Validators.required],
      colour:[null, Validators.required],
      code: [null, Validators.required],
      photoupload: [null, Validators.required],
      measurement: [null, Validators.required],
      remark: [null, Validators.required],
      })      
    ])   
  });
  
  get detailform() {
    return this.leadShutterDetailForm.get('detailform') as FormArray;
  }

  addnewDetails(): FormGroup {    
    return this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      // category: [{value: '', disabled: true}],
      lead_category_id:[this.catID],
      type:[null, Validators.required],
      Part: [null, Validators.required],
      material: [null, Validators.required],
      finish: [null, Validators.required],
      typesize: [null, Validators.required],
      brand: [null, Validators.required],
      edgebanding: [null, Validators.required],
      colour:[null, Validators.required],
      code: [null, Validators.required],
      photoupload: [null, Validators.required],
      measurement: [null, Validators.required],
      remark: [null, Validators.required],
    })
  }

  // manageWardrobeForm(category_id:any){ 
  //   this.showWardrobeform = false;
  //   const num = 0;
  //   let customer = this.categories_source.find(x => x.id == category_id)
  //   console.log(customer);
  //   if (customer.category_id == 2){
  //     this.showWardrobeform = true;
  //   }
  //   this.detailform.get(num.toString()).get('lead_category_id').setValue(this.catID)
  // }

  initCategory(){
    const num = 0;
    this.detailform.get(num.toString()).get('lead_category_id').setValue(this.catID)
  }



  getRawValue(){
    console.log(this.leadShutterDetailForm.controls.detailform.get('0'))
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

    // setSelectedCategory(id:any){
    //   this.selectedCategory = id;
    //   this.manageWardrobeForm(id)
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
    this.getWardrobetypelist();
    this.getWardrobepartlist();
    this.initCategory();
  }

  onsubmitaddWardrobeDetails(): void {
    console.log(this.leadShutterDetailForm.get('detailform').value)
    this.http.addWardrobedetails(this.leadShutterDetailForm.get('detailform').value).subscribe(res=>console.log(res))
  }

}
