import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService } from '../../designer.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  KitchenBasketForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      brand:[null,Validators.required],
      units:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  get detailform() {
    return this.KitchenBasketForm.get('detailform') as FormArray;
  }

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

  ngOnInit(): void {
  }

  onsubmitaddbasketdetails(): void {
    // console.log(this.KitchenBasketForm.get('detailform').value);
    
   this.http.addkitchenbasketdetails(this.KitchenBasketForm.get('detailform').value).subscribe(res=>console.log(res))
  }

}
