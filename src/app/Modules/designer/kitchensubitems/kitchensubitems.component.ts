import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService } from '../designer.service';

@Component({
  selector: 'app-kitchensubitems',
  templateUrl: './kitchensubitems.component.html',
  styleUrls: ['./kitchensubitems.component.css']
})
export class KitchensubitemsComponent implements OnInit {


  CountertopForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      material:[null, Validators.required],
      colour:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  TilesForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      brand:[null, Validators.required],
      colour:[null, Validators.required],
      size:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  BrandForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      brand:[null, Validators.required],
      colour:[null, Validators.required],
      size:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  


  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }



  ngOnInit(): void {

  }

}
