import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, ibedroomitem, ibrand, icategory, ifinish, imaterial, itypebed, itypesize } from '../designer.service';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { ViewfileComponent } from '../viewfile/viewfile.component';


@Component({
  selector: 'app-beddetails',
  templateUrl: './beddetails.component.html',
  styleUrls: ['./beddetails.component.css']
})

export class BeddetailsComponent implements OnInit {
  
   url="./assets/img/user.jpg"

//   onFileSelected(event){    
//     const file = event.target.files[0];
//     console.log(file); 
//     if(event.target.files){
//       var reader = new FileReader();
//       reader.readAsDataURL(event.target.files[0]);
//       reader.onload=(events:any)=>{
//          this.url=events.target.result;
//       }
//     }
// }
  
  // onUpload(){
  //   const fd = new FormData();
  //   fd.append('file', this.File, this.fileName);

  //   // this.https.post().subscribe(res => {
  //   //   console.log(res);
  //   //   this.response = res
      
  //     // if (res.type == HttpEventType.UploadProgress) {
  //     //   this.uploadProgress = Math.round(100 * (event.loaded/event.total));
  //     // }
   
  //   // this.http.request(Upload$).subscribe(event => {
  //   //   if (event.type == HttpEventType.UploadProgress) {
  //   //     this.uploadProgress = Math.round(100 * (event.loaded/event.total));
  //   //   }
  //   // })
  //   // }
  // }


  selectedFile:File=null;
  fileName = '';
  File: any = '';
  response: any;
  // public user
  _id: any;

 

  @Input() catID:any;

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
      // category: null,
      lead_category_id:null,
      item_name:[null, Validators.required],
      type: [null, Validators.required],
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
    return this.leadBedDetailForm.get('detailform') as FormArray;
  }

  addnewDetails(): FormGroup {    
    return this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      // category: [null],
      lead_category_id:[this.catID],
      item_name:[null, Validators.required],
      type: [null, Validators.required],
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
  
  // manageBedForm(category_id:any){ 
  //   this.showBedForm = false;
  //   const num = 0;
  //   let customer = this.categories_source.find(x => x.id == category_id)
  //   console.log(customer);
  //   if (customer.category_id == 4){
  //     this.showBedForm = true;
  //   }
  //   // this.detailform.get(num.toString()).get('category').setValue(this.catID)
  //   this.detailform.get(num.toString()).get('lead_category_id').setValue(this.catID)
  // }

  initCategory(){
    const num = 0;
    this.detailform.get(num.toString()).get('lead_category_id').setValue(this.catID)
  }


  getRawValue(){
    console.log(this.leadBedDetailForm.controls.detailform.get('0'))
  }

  setCat_ID(cat_id:any){
    console.log("hiiii")
    this.cat_id=cat_id;
    // this.manageBedForm(this.cat_id);
    console.log(this.cat_id)
  }

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,private https:HttpClient,public dialog: MatDialog
   ) { }

   
    
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

    // setSelectedCategory(id:any){
    //   this.selectedCategory = id;
    //   this.manageBedForm(id)
    //   console.log(this.selectedCategory)
    // }

    addDetails(){
      this.catnum++;
      this.detailform.push(this.addnewDetails());
      this.detailform.get(this.catnum.toString()).get('lead_category_id').setValue(this.catID)  
    }


  ngOnInit(): void {
    this.getCategorylist();
    this.listfinish();
    this.getMaterialList();
    this.getTypesizeList();
    this.getBrandList();
    this.getbedTypeList();
    this.getBedroomitemlist();
    this.initCategory();
  } 

  onsubmitaddBedDetails(): void {
    let data = { 
      is_updated:true
    }
    // console.log(this.leadBedDetailForm.get('detailform').value)
    this.http.addBeddetails(this.leadBedDetailForm.get('detailform').value).subscribe(res=>console.log(res))
    this.http.updateLeadCategory(this.catID,data).subscribe(res=>console.log(res));
  }
}
