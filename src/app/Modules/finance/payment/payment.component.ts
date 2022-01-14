import { identifierModuleUrl } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService, leads, paymentcategory, paymenttype } from '../finance.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

paymenttypes:paymenttype[]=[];
paymentcategorys:paymentcategory[]=[];

currentUser:any;
currentLead:any;
quoteamount:any;

  addressForm = this.fb.group({
    project_id: null,
    pay_amount: [null, Validators.required],
    remarks: [null, Validators.required],
    updated_by: this.getCurrentuser(),
    lead_id: this.route.snapshot.paramMap.get('id'),
    quotation_amount: null,
    payment_type: [null, Validators.required],
    payment_category: [null, Validators.required],
    reference_id: [null, Validators.required]
  });





  constructor(private fb: FormBuilder,private http:FinanceService,private router:Router,
    private route:ActivatedRoute) {


  }

  listPaytype(){
    this.http.listPaymenttype().subscribe(res=>{this.paymenttypes=res})

  }

  listPaycategory(){
    this.http.listPaymentcategory().subscribe(res=>{this.paymentcategorys=res})

  }


  getCurrentuser(){
   this.currentUser=localStorage.getItem("currentUser")
  return JSON.parse(this.currentUser)?.id 
  }

  ngOnInit(){
    this.listPaytype();
    this.listPaycategory();
    this.getCurrentuser();
    this.getLead();
    
  }

  getLead(){
    this.http.getleadByid(this.route.snapshot.paramMap.get('id')).subscribe(res=>{      
     this.currentLead=res;
     this.setAmount();
     
    })
  }
  
  setAmount(){
    this.addressForm.get('quotation_amount').setValue(this.currentLead.quotation_amount)
  }
  onSubmit(){

    this.http.addPaymentdetails(this.addressForm.value).subscribe(res=>
      console.log(res));
      this.statusUpdate();
      this.addressForm.reset()
      this.router.navigateByUrl('finance/financelead')

  }

  statusUpdate(){
    let data={
      status_id:5
    }
    this.http.updatestatus(this.route.snapshot.paramMap.get('id'),data).subscribe(res=>console.log(res));
  }
}
