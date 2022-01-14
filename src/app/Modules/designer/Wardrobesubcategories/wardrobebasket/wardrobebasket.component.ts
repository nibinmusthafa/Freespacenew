import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService } from '../../designer.service';


@Component({
  selector: 'app-wardrobebasket',
  templateUrl: './wardrobebasket.component.html',
  styleUrls: ['./wardrobebasket.component.css']
})


export class WardrobebasketComponent implements OnInit {

  WardrobeBasketForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      brand:[null, Validators.required],
      units:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  get detailform() {
    return this.WardrobeBasketForm.get('detailform') as FormArray;
  }


  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

  ngOnInit(): void {
  }



  onsubmitaddwardrobebasketdetails(): void {
    console.log(this.WardrobeBasketForm.get('detailform').value);
    
     this.http.addwardrobebasketdetails(this.WardrobeBasketForm.get('detailform').value).subscribe(res=>console.log(res))
  }

}



