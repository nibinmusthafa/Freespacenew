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
  finishes:ifinish[]=[];
  // architects:iarchitect[]=[];
  categories_source: icategory[] = [];
  parts:ipart[]=[];
  materials:imaterial[]=[];
  typesizes:itypesize[]=[];
  brands:ibrand[]=[];
  lead?: any=null;
  cat_id:any = null;
  selectedCategory:any = null;
  showKitchenForm = false;
  catnum=0;


  CategoryForm=this.fb.group({
    categories: [null,Validators.required],
  })

  leadDetailForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      category: [{value: '', disabled: true},Validators.required],
      lead_category_id:null,
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
    return this.leadDetailForm.get('detailform') as FormArray;
  }

  addnewDetails(): FormGroup {    
    return this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      category: [{value: '', disabled: true}],
      lead_category_id:[null],
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
  
  manageForm(category_id:any){ 
    this.showKitchenForm = false;
    const num = 0;
    let customer = this.categories_source.find(x => x.id == category_id)
    console.log(customer);
    if (customer.category_id == 1){
      this.showKitchenForm = true;
    }
    this.detailform.get(num.toString()).get('category').setValue(category_id)
    this.detailform.get(num.toString()).get('lead_category_id').setValue(category_id)
  }
 

  getRawValue(){
    console.log(this.leadDetailForm.controls.detailform.get('0'))
  }

  setCat_ID(cat_id:any){
    console.log("hiiii")
    this.cat_id=cat_id;
    this.manageForm(this.cat_id);
    console.log(this.cat_id)
  }

  // getCategoriesid(lead_id){

  //   this.leadDetailForm.getCategorybyid(this.route.snapshot.paramMap.get('id'),lead_id).subscribe(res=>{     
  //     this.lead = res;
  //     this.manageForm()            
  //   })
  // }
  
  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,
    ) {}

    listfinish(){  
    this.http.getfinish().subscribe(res =>{
      this.finishes=res;    
    })
  }

  // AddKitchenDetails(){
  //   var data = [{
  //     lead_id:null,
  //     lead_category_id:this.leadDetailForm.get('category')?.value,
  //     part:this.leadDetailForm.get('part')?.value,
  //     material:this.leadDetailForm.get('material')?.value,
  //     finish:this.leadDetailForm.get('finishs')?.value,
  //     typesize:this.leadDetailForm.get('type')?.value,
  //     brand:this.leadDetailForm.get('brand')?.value,
  //     edge_banding:this.leadDetailForm.get('edgebanding')?.value,
  //     colour:this.leadDetailForm.get('colour')?.value,
  //     code:this.leadDetailForm.get('code')?.value,
  //     photo:this.leadDetailForm.get('photoupload')?.value,
  //     measurement:this.leadDetailForm.get('measurement')?.value,
  //     remark:this.leadDetailForm.get('remark')?.value,
  //     updated_on:null,
  //   }]
  //     this.http.addKitchendetails(data).subscribe(res => {
  //       console.log(res);  
  //   }) 
  // }

  getCategorylist() {
    this.http.getCategory(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.categories_source = res;
      console.log(res)
    })
  }

  setSelectedCategory(id:any){
    this.selectedCategory = id;
    this.manageForm(id)
    console.log(this.selectedCategory)
  }

  getPartList(){
    this.http.getPart().subscribe(res =>{
      this.parts=res;
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

  addDetails(){
    this.catnum++;
    this.detailform.push(this.addnewDetails());
    this.detailform.get(this.catnum.toString()).get('lead_category_id').setValue(this.selectedCategory)
    this.detailform.get(this.catnum.toString()).get('category').setValue(this.selectedCategory)  
  }

  ngOnInit(){
    this.getCategorylist();
    this.listfinish();
    this.getPartList();
    this.getMaterialList();
    this.getTypesizeList();
    this.getBrandList();
    // this.getCategoriesid();
  }
  
  // onSubmit(): void {
  //   // this.AddKitchenDetails();
  //   // this.getRawValue();
  //   console.log(this.leadDetailForm.get('detailform').value)
  //   // this.http.addKitchendetails(this.leadDetailForm.get('detailform').value).subscribe(res=>console.log(res))  
  //   // alert('Thanks!');
  // }
  onsubmitaddKitchenDetails(): void {
    console.log(this.leadDetailForm.get('detailform').value)
    this.http.addKitchendetails(this.leadDetailForm.get('detailform').value).subscribe(res=>console.log(res))
  }
}
