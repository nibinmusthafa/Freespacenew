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
  categories_source: icategory[] = [];
  parts:ipart[]=[];
  materials:imaterial[]=[];
  typesizes:itypesize[]=[];
  brands:ibrand[]=[];
  lead?: any=null;
  cat_id:any = null;


  CategoryForm=this.fb.group({
    categories: [null,Validators.required],
  })

  leadDetailForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      category: [null, Validators.required],
      part: [null, Validators.required],
      material: [null, Validators.required],
      finishs: [null, Validators.required],
      type: [null, Validators.required],
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
    return this.leadDetailForm.get('detailform') as FormArray;
  }

  addnewDetails(): FormGroup {    
    return this.fb.group({
      category: [''],
      part: [''],
      material: [''],
      finishs: [''],
      type: [''],
      brand: [''],
      edgebanding: [''],
      colour:[''],
      code: [''],
      photoupload: [''],
      measurement: [''],
      remark: [''],
    })
  }
  
  manageForm(cat_id:any){ 
    this.detailform.controls['category'].setValue(cat_id)
  }

  getRawValue(){
    console.log(this.leadDetailForm.controls.detailform.get('0'))
  }

  setCat_ID(cat_id:any){
    // console.log("hiiii")
    // this.cat_id=cat_id;
    // this.manageForm(this.cat_id);
    // console.log(this.cat_id)
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

  getCategorylist() {
    this.http.getCategory(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.categories_source = res;
      console.log(res)

    })
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
    this.detailform.push(this.addnewDetails());  
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
  

  onSubmit(): void {

    this.getRawValue();
    alert('Thanks!');
  }



}
