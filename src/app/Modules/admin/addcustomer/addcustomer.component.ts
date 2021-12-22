import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService, icustomer } from '../admin.service';
import { icountry } from '../models/countries';
import { states } from '../models/States';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent {

  customers: icustomer[] = [];
  states:states[]=[];
  countries:icountry[]=[];

  addressForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: ["", Validators.required],
    address1: [null, Validators.required],
    address2: [null, Validators.required],
    email: [null, Validators.required],
    city: [null, Validators.required],
    state: [null, Validators.required],
    country:[null,Validators.required],
    phonenumber: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
  });

  hasUnitNumber = false;

  // states = [
  //   { name: 'Kerala', abbreviation: 1 },
  //   { name: 'Andhra Pradesh', abbreviation: 2 },
  //   { name: 'Arunachal Pradesh', abbreviation: 3 },
  //   { name: 'Assam', abbreviation: 4 },
  //   { name: 'Bihar', abbreviation: 5 },
  //   { name: 'Chattisgarh', abbreviation: 6 },
  //   { name: 'Goa', abbreviation: 7 },
  //   { name: 'Gujarat', abbreviation: 8 },
  //   { name: 'Haryana', abbreviation: 9 },
  //   { name: 'Himachal Pradesh', abbreviation: 10 },
  //   { name: 'Jharkhand', abbreviation: 11 },
  //   { name: 'Karnataka', abbreviation: 12 },
  //   { name: 'Madhya Pradesh', abbreviation: 13 },
  //   { name: 'Maharashtra', abbreviation: 14 },
  //   { name: 'Meghalaya ', abbreviation: 15 },
  //   { name: 'Manipur', abbreviation: 16 },
  //   { name: 'Mizoram', abbreviation: 17 },
  //   { name: 'Nagaland', abbreviation: 18 },
  //   { name: 'Odisha', abbreviation: 19 },
  //   { name: 'Punjab', abbreviation: 20 },
  //   { name: 'Rajasthan', abbreviation: 21 },
  //   { name: 'Sikkim', abbreviation: 22 },
  //   { name: 'Tamil Nadu', abbreviation: 23 },
  //   { name: 'Telangana', abbreviation: 24 },
  //   { name: 'Tripura', abbreviation: 25 },
  //   { name: 'Uttar Pradesh', abbreviation: 26 },
  //   { name: 'Uttarakhand', abbreviation: 27 },
  //   { name: 'West Bengal', abbreviation: 28 }
  // ];

  constructor(private fb: FormBuilder, 
    private adminservice: AdminService,
    private router: Router) {
  }

  addCustomer() {
    var customer = {
      customer_id: {
        updated_by: 1,
        customer_firstname: this.addressForm.get('firstName')?.value,
        customer_lastname: this.addressForm.get('lastName')?.value,
        customer_phonenumber: this.addressForm.get('phonenumber')?.value,
        email: this.addressForm.get('email')?.value,
      },
      addr_line1: this.addressForm.get('address1')?.value,
      addr_line2: this.addressForm.get('address2')?.value,
      city: this.addressForm.get('city')?.value,
      state_id: this.addressForm.get('state')?.value,
      country_id:this.addressForm.get('country')?.value,
      pincode: this.addressForm.get('postalCode')?.value,

    }    
    this.adminservice.addCustomer(customer).subscribe(res => {
    
      console.log(JSON.stringify(res));
    },error=>{
          alert(error.error.detail);})  
    }
  
  listStates(){
    this.adminservice.listStates().subscribe(res=>
      this.states=res
      )
  }
  listCountries(){
    this.adminservice.listCountry().subscribe(res=>
      this.countries=res
      )
  }

  ngOnInit(){
    this.listStates();
    this.listCountries();
  }

  onSubmit(): void {
    this.addCustomer();
    // console.log(this.addressForm.getRawValue());  
    // window.location.reload();
    // this.adminservice.addCustomer(this.addressForm.getRawValue()).subscribe(
    // response =>console.log('Success!',response),
    // error=>console.error('Error!',error)
    // );
  }
 

  cancel(){
    window.location.reload()
  }
}
