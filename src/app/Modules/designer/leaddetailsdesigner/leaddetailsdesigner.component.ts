import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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


  // CategoryForm=this.fb.group({
  //   categories: [null,Validators.required],

  // })

  leadDetailForm = this.fb.group({
    category: [null,Validators.required],
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
  });

 

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


  ngOnInit(){
    this.getCategorylist();
    this.listfinish();
    this.getPartList();
    this.getMaterialList();
    this.getTypesizeList();
    this.getBrandList();
  }

  onSubmit(): void {
    alert('Thanks!');
  }


}
