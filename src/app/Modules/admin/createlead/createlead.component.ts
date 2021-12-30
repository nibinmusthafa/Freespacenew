import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, icustomer, icategory, idescription, ileadsource, isubcategory, iuser, ilocation } from '../admin.service';
import { Leads } from '../models/leads';

@Component({
  selector: 'app-createlead',
  templateUrl: './createlead.component.html',
  styleUrls: ['./createlead.component.css']
})

export class CreateleadComponent {
  subcategory: boolean = true;
  catvalue: any;
  minDate: Date;
  maxDate: Date;
  //followupForm = this.fb.group({
  followup_date: [null];
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
  user_id:any;
  showDeleteButton=false;
  pipe = new DatePipe('en-US');

  leadForm = this.fb.group({
    id:null,
    designer_id: [null,Validators.required],
    customer_id: [null, Validators.required],
    description: [null, Validators.required],
    renovation: [null, Validators.required],
    leadsource_id: [null, Validators.required],
    status_value: [null],
    followup_date:[null,Validators.required],
    categories: this.fb.array([
        this.fb.group({
        category_id: [null,Validators.required],
        // sub_cat_id: [null,Validators.required],
        location: [null,Validators.required],
      }),
    ]),
  });
  //followupDate: any;

  constructor(private fb: FormBuilder, private adminservice: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router,private route: ActivatedRoute,private snackBar: MatSnackBar,) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 2, 11, 31);
   }

  get categories() {
    return this.leadForm.get('categories') as FormArray;
  }

  addnewCategory(): FormGroup {
    
    return this.fb.group({

      category_id: [''],
      // sub_cat_id: [''],
      location: [''],
    })
  }

  getCustomerByid(id: any) {
    this.customer = this.customers.find(x => x.id == id)
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

  createLead() {
        var val = {  
        created_by: 1,
        designer_id: this.leadForm.get('designer_id')?.value,
        customer_id: this.leadForm.get('customer_id')?.value,
        status_id: 1,
        description: this.leadForm.get('description')?.value,
        renovation: this.leadForm.get('renovation')?.value,
        leadsource_id: this.leadForm.get('leadsource_id')?.value,
        supervisor_id: null,
        followup_date:this.pipe.transform(this.leadForm.getRawValue().followup_date, 'MM/dd/yyyy'), 
        categories: this.leadForm.get('categories')?.value   
    }

    this.adminservice.createLead(val).subscribe(value => {
      console.log(value);
    })
  }

  onSubmit(): void {  
    this.num++;
    this.addnewCategory();
    this.leads = this.leadForm.getRawValue();
    this.createLead();   
  }

  Cancellead(){
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
    })
  }

  getLeadsourcelist() {
    this.adminservice.getLeadSource().subscribe(res => {
      this.leadsources = res;
    })
  }

  getCategorylist() {
    this.adminservice.getCategory().subscribe(res => {
      this.categories_source = res;

    })
  }

  // getSubCategorylist() {
  //   this.adminservice.getSubCategory().subscribe(res => {
  //     this.subcategories = res;
  //   })
  // }

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
 

  ngOnInit() {
    this.getCustomerlist();
    this.getLeadsourcelist();
    this.getCategorylist();
    // this.getSubCategorylist();
    this.ListDesigner();
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

  deleteCategory(i){
    this.categories.removeAt(i)  
    this.checkCategories();
    console.log(this.categories.length)
  }
  // addFollowup() {
  //   let data = {
  //     followup_date: this.pipe.transform(this.leadForm.getRawValue().followup_date, 'MM/dd/yyyy'),
  //     lead_id: this.lead_id,
  //     updated_by: this.user_id
  //   }   
  //   this.adminservice.addFollowup(data).subscribe(res => {
  //     // console.log(res)
  //     this.setFollowupdate(this.pipe.transform(this.followupForm.getRawValue().followup_date, 'MM/dd/yyyy'));
  //   })
  // }

  // setFollowupdate(followupDate:any){
  //   let data={followup_date:followupDate}
  //   console.log(data)
  //   this.adminservice.setFollowupDate(this.data.lead_id,data).subscribe(res=>{
  //     console.log(res)    
  //   })
  // }
}
