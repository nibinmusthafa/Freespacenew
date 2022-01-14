import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, idesignation } from '../admin.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {

 
  userid:any
  addressForm = this.fb.group({ 

    password: [null,Validators.required],
    password2: [null,Validators.required],
    

  });           

constructor(private fb:FormBuilder,private adminservice:AdminService,private router:Router,private route:ActivatedRoute) { }
    

resetPassword(){

      var jsn={
      password:this.addressForm.get('password')?.value,
      password2:this.addressForm.get('password2')?.value,

    }


    if(jsn.password!=jsn.password2)
      {
      console.log("error")
      alert("password must be same")
        }
      else{

    this.userid =this.route.snapshot.paramMap.get('id')
    this.adminservice.updatePasswordbyid(this.userid,jsn).subscribe(res=>{
      console.log(res);
     alert("Updated successfully!!")
     
     this.router.navigateByUrl('admin/manageuser')  
    })
  
      }
  }

    cancel(){
      this.addressForm.reset()
    }

    ngOnInit(): void {
  

      
    }
    onSubmit(): void { 
      
      //alert(res)
    } 
  }

    



































//   states:states[]=[];
//   countries:icountry[]=[];
//   customers: icustomer[] = [];
//   custom?: any=null;
//   address?:any=null;
//   table=[];

//   addressForm = this.fb.group({
//     id:[null],
//     customerid:[null],
//     firstName: [this.custom?.customer_firstname, Validators.required],
//     lastName: [this.custom?.customer_lastname, Validators.required],
//     address1: [this.address?.addr_line1, Validators.required],
//     address2: [this.address?.addr_line2, Validators.required],
//     email: [this.custom?.email, Validators.required],
//     city: [this.address?.city, Validators.required],
//     state: [this.address?.state_name, Validators.required],
//     country: [this.address?.country_name, Validators.required],
//     phonenumber: [this.custom?.customer_phonenumber, Validators.required],
//     postalCode: [this.address?.pincode, Validators.compose([
//       Validators.required, Validators.minLength(5), Validators.maxLength(5)])
//     ],
//   });

//   hasUnitNumber = false;

//   constructor(private fb: FormBuilder,
//     private adminservice: AdminService,
//     private router: Router, private route: ActivatedRoute,
//     @Inject(MAT_DIALOG_DATA) public data: any) { 
            
//     }   

//   addCustomer() {
//     var customer = {

//       customer_id: {
//         updated_by: 1,
//         customer_firstname: this.addressForm.get('firstName')?.value,
//         customer_lastname: this.addressForm.get('lastName')?.value,
//         customer_phonenumber: this.addressForm.get('phonenumber')?.value,
//         email: this.addressForm.get('email')?.value,
//       },
//       addr_line1: this.addressForm.get('address1')?.value,
//       addr_line2: this.addressForm.get('address2')?.value,
//       city: this.addressForm.get('city')?.value,
//       state_id: this.addressForm.get('state')?.value,
//       pincode: this.addressForm.get('postalCode')?.value,
//       country_id:this.addressForm.get('country')?.value,
//     }
//     this.adminservice.addCustomer(customer).subscribe(res => {
//       console.log(res);
//     })
//   }

//   initializeForm(){
//     this.addressForm.controls['id'].setValue(this.custom?.id)
//     this.addressForm.controls['firstName'].setValue(this.custom?.customer_firstname)
//     this.addressForm.controls['lastName'].setValue(this.custom?.customer_lastname)
//     this.addressForm.controls['phonenumber'].setValue(this.custom?.customer_phonenumber)
//     this.addressForm.controls['email'].setValue(this.custom?.email) 
//   }

//   initializeaddressForm(){
//     this.addressForm.controls['customerid'].setValue(this.custom?.customer_id)
//     this.addressForm.controls['address1'].setValue(this.address?.addr_line1)
//     this.addressForm.controls['address2'].setValue(this.address?.addr_line2)
//     this.addressForm.controls['city'].setValue(this.address?.city)
//     this.addressForm.controls['state'].setValue(this.address?.state_id)
//     this.addressForm.controls['postalCode'].setValue(this.address?.pincode)
//     this.addressForm.controls['country'].setValue(this.address?.country_id)
//   }
//   //   updateCustomer()
//   // {
//   //   this.adminservice.updatecustomer(this.data.id).subscribe(res =>{
//   //     console.log(res)
//   //     window.location.reload()
//   //   }) 
//   // }

//   listStates(){
//     this.adminservice.listStates().subscribe(res=>
//       this.states=res
//       )
//     }

//   listCountries(){
//     this.adminservice.listCountry().subscribe(res=>
//       this.countries=res
//       )
//     }
 
//   getCustomerByid(){
//     this.adminservice.getCustomerById(this.route.snapshot.paramMap.get('id')).subscribe(res=>{     
//       this.custom = res
//       console.log(this.custom);
      
//       this.getAddressbyID();
//       // console.log(this.custom?.customer_firstname)
//       this.initializeForm()       
//     })
//   }

//   getAddressbyID(){
//     this.adminservice.getAddressById(this.route.snapshot.paramMap.get('id')).subscribe(add=>{ 
//       this.address =add
//       // console.log(this.address?.state_name)
//       this.initializeaddressForm()
//     })
//   }
  
//   cancel() {
//     window.location.reload()
//   }

//   updateCustomer(){
//     // let _id=this.addressForm.value.id;
//     // let data=this.addressForm.value
//     // alert(JSON.stringify(data));
//     // console.log(this.customers); 
//     let data = this.addressForm.value
//     var customer = {
      
//       updated_by: 1,
//       customer_firstname: this.addressForm.get('firstName')?.value,
//       customer_lastname: this.addressForm.get('lastName')?.value,
//       customer_phonenumber: this.addressForm.get('phonenumber')?.value,
//       email: this.addressForm.get('email')?.value,
   
//     addresses:[{addr_line1: this.addressForm.get('address1')?.value,
//     addr_line2: this.addressForm.get('address2')?.value,
//     city: this.addressForm.get('city')?.value,
//     state_id: this.addressForm.get('state')?.value,
//     country_id:this.addressForm.get('country')?.value,
//     pincode: this.addressForm.get('postalCode')?.value,}]
    
//   }    
//     this.adminservice.updatecustomer(data.id, customer).subscribe(res => {
//       console.log(res);
//       alert(res)
//     })
//     // window.location.reload()
   
//     this.router.navigateByUrl('admin/managecustomer')  
//   }

//   ngOnInit(): void {
//     this.listStates();
//     this.listCountries();   
//     // let id = this.route.snapshot.paramMap.get('id')
//     // console.log(id);
//     this.getCustomerByid();
//     console.log()   
//   }

//   onSubmit(): void {      
//   }
// }
