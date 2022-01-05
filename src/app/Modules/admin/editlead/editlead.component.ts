import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, iarchitect, icategory, icustomer, idescription,ileadsource, ilocation, isubcategory, iuser } from '../admin.service';
import { Leads } from '../models/leads';

@Component({
  selector: 'app-editlead',
  templateUrl: './editlead.component.html',
  styleUrls: ['./editlead.component.css']
})

export class EditleadComponent implements OnInit {
  subcategory: boolean = true;
  catvalue: any;
  minDate: Date;
  maxDate: Date;
  showDeleteButton=false;
  followupForm = this.fb.group({
    followup_date: [null],
  });
  
  leadCategory;
  catArray;
  lead?: any = null;
  architects:iarchitect[]=[];
  subcat?:any=null;
  category?: any = null;
  categorynew?: any = null;
  customers: icustomer[] = [];
  leadsources: ileadsource[] = [];
  categories_source: icategory[] = [];
  subcategories: isubcategory[] = [];
  descriptions: idescription[] = [];
  location: ilocation[] = [];
  designers: iuser[] = [];
  leads: Leads[] = [];
  displaydata: {} = {};
  customer: any;
  num: number = 1001;
  leadname: any;
  lead_id: any;
  user_id: any;
  followupDate: any;
  pipe = new DatePipe('en-US');

  leadForm = this.fb.group
    ({
      id: null,
      designer_id: [this.lead?.designer_id, Validators.required],
      customer_id: [this.lead?.customer_id, Validators.required],
      description: [this.lead?.description, Validators.required],
      renovation: [true, Validators.required],
      leadsource_id: [this.lead?.leadsource_id, Validators.required],
      status_value: [null],
      followup_date: [this.lead?.followup_date, Validators.required],
      architect:[this.lead?.architect, Validators.required],
      categories: this.fb.array([]),
    });


  constructor(private fb: FormBuilder, private adminservice: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar,) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 2, 11, 31)
  }

  get categories() {
    return this.leadForm.get('categories') as FormArray;
  }

  addnewCategory(): FormGroup {
    return this.fb.group({
      category_id: [''],
      // sub_cat_id: [''],
      location: [''],
      is_updated:[''],
    })
  }

  checkCategories(){
   if(this.categories.length > 1){
    this.showDeleteButton=true;
    console.log(this.categories.length)
    console.log("iiiiiii")
   }
   if(this.categories.length == 1){
    this.showDeleteButton=false;
    console.log(this.categories.length)
    console.log("iiiiiii")
   }
  }
  
  removeCategory(val) { 
    this.categories.removeAt(val)  
    console.log(this.categories.length + "hiiii")
  }

  getCustomerByid(id: any) {
    this.customer = this.customers.find(x => x.id == id)
    console.log(this.customer);
  }

  getcategoryByid(id: any) {
    let category = this.categories_source.find(x => x.id == id)
    this.leadname = this.customer?.customer_firstname + "_" + category?.category_name
    // this.SubcategoryCheck()
  }

  // SubcategoryCheck() {
  //   if (this.leadForm.value.categories[0].category_id == 2) {
  //     this.subcategory = false;
  //   }
  //   else
  //     this.subcategory = true;
  // }
  manageleadForm() {
    console.log(this.lead);
    this.leadForm.controls['id'].setValue(this.lead?.id)
    this.leadForm.controls['designer_id'].setValue(this.lead?.designer_id)
    this.leadForm.controls['customer_id'].setValue(this.lead?.customer_id)
    this.leadForm.controls['description'].setValue(this.lead?.description)
    this.leadForm.controls['renovation'].setValue(String(this.lead?.renovation))
    this.leadForm.controls['leadsource_id'].setValue(this.lead?.leadsource_id)
    this.leadForm.controls['followup_date'].setValue(this.lead?.followup_date)
    this.leadForm.controls['architect'].setValue(this.lead?.architect_id)

    // console.log(this.leads)
    //-------------------------------------------------------------------------------
    this.lead.categories.map(category => 
      this.categories.push(this.fb.group({
      category_id: [category?.category_id],
      // sub_cat_id: [category?.sub_cat_id],
      location: [category?.location],
      is_updated:[''],
    })))
//-------------------------------------------------------------------------------------
    this.checkCategories();
  }


  updateLead() {
    // const lead = {
    //   categories: this.leadForm.get('categories').value
    // }
    // console.log(lead);
    let lead_id=this.leadForm.controls['id'].value   
        var val = {      
        created_by: 1,
        designer_id: this.leadForm.get('designer_id')?.value,
        customer_id: this.leadForm.get('customer_id')?.value,
        status_id: this.lead.status_id,
        description: this.leadForm.get('description')?.value,
        renovation: this.leadForm.get('renovation')?.value,
        leadsource_id: this.leadForm.get('leadsource_id')?.value,
        supervisor_id: null,
        followup_date:this.pipe.transform(this.leadForm.getRawValue().followup_date, 'MM/dd/yyyy'),
        architect_id:this.leadForm.get('architect')?.value,
        categories: this.leadForm.get('categories')?.value

    }
    this.adminservice.updateLeadbyid(lead_id,val).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('admin/manageleads')     
    })
  }

  // managecategoryForm() {
  //   this.categories.controls.forEach(c=>{
  //     console.log(c);
      
  //     // c.setValue(this.categories.category_id)
  //   })
  //   this.categories.controls['category_id'].setValue(this.categorynew?.category_id)
  //   // this.categories.controls['sub_cat_id'].setValue(this.category?.sub_cat_id)
  //   this.categories.controls['location'].setValue(this.categorynew?.location)
  //   // this.categories.controls['is_updated'].setValue(this.category?.is_updated)

  // }

  // managesubcategoryForm(){
  //   this.categories.controls['sub_cat_id'].setValue(this.subcat?.sub_cat_id)
  //   this.categories.controls['units'].setValue(this.subcat?.units)
  // }

  getleadByid() {
    this.adminservice.getLeadbyid(this.route.snapshot.paramMap.get('id')).subscribe(res => {
    this.lead = res
    console.log(this.lead)
    console.log("test by aswathy");
    
    this.manageleadForm()
    })
  }

  getArchitectList(){
    this.adminservice.listArchitect().subscribe(res =>{
      this.architects=res;
    })
  }

  getcategoriesByid(lead_id) {
    this.adminservice.getCategorybyid(this.route.snapshot.paramMap.get('id'), lead_id).subscribe(res => {
      this.categorynew = res
      console.log("aswathy")
    
      console.log(this.categorynew);  

      // this.managecategoryForm();
      this.checkCategories();
    })
  }
  getsubcategoryByid(){
    this.adminservice.getsubCategorybyid(this.route.snapshot.paramMap.get('id')).subscribe(res=>{     
      this.lead = res

    })
  }

  Cancellead() {
    window.location.reload()
  }

  ListDesigner() {
    this.adminservice.listDesigner().subscribe(des => {
      return this.designers = des;
    })
  }

  addCategory() {
    this.categories.push(this.addnewCategory());
    this.checkCategories();
  }

  getCustomerlist() {
    this.adminservice.getCustomer().subscribe(res => {
      this.customers = res;
      // console.log(res);

    })
  }

  getLeadsourcelist() {
    this.adminservice.getLeadSource().subscribe(res => {
      this.leadsources = res;
      // console.log(res);

    })
  }

  getCategorylist() {
    this.adminservice.getCategory().subscribe(res => {
      this.categories_source = res;

    })
  }

  getSubCategorylist() {
    this.adminservice.getSubCategory().subscribe(res => {
      this.subcategories = res;
    })
  }

  getDescriptionlist() {
    this.adminservice.getDescription().subscribe(res => {
      this.descriptions = res;
    })
  }

  demoFunction() {
    console.log(this.designers);
    let customer = this.customers.find(x => x.id == 17)
    console.log(customer?.customer_phonenumber);
  }

  ngOnInit(): void {  
    console.log("omg")
    this.getCustomerlist();
    this.getLeadsourcelist();
    this.getCategorylist();
    // this.getSubCategorylist();
    this.ListDesigner();
    this.getArchitectList();  
    this.getleadByid();
    // this.getcategoriesByid(this.lead_id)
  }
  onSubmit(): void {
    // window.location.reload()
    // this.num++;
     this.addnewCategory();
    // console.log(this.displaydata);
    // console.log(JSON.stringify(this.displaydata));
    this.leads = this.leadForm.getRawValue();
    console.log(this.leads);
    
  }
  
  getleadcategorybylead() {
    this.adminservice.getleadcategorybylead(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.leadCategory = res
      console.log(this.leadCategory + "hiii")
      for (let i = 0; i < this.leadCategory.length; i++) {
        let data = {
          category_id: this.leadCategory[i].category_id,
          // subcat: this.leadCategory[i].subcat,
          location: this.leadCategory[i].location,
          is_updated:this.leadCategory[i].is_updated,
        }
        this.category = data;
        this.catArray.push(data)
      }
      console.log(this.catArray.sort((x: any, y: any) => x.category_id - y.category_id))
    })
  }

  deleteCategory(i){
    this.categories.removeAt(i)
    this.checkCategories();
    console.log(this.categories.length)
  }
}


