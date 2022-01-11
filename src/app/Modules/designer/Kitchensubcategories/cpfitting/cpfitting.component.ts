import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService } from '../../designer.service';

@Component({
  selector: 'app-cpfitting',
  templateUrl: './cpfitting.component.html',
  styleUrls: ['./cpfitting.component.css']
})
export class CpfittingComponent implements OnInit {

  CPFittingForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      lead_category_id:null,
      brand:[null, Validators.required],
      colour:[null, Validators.required],
      size:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  get detailform() {
    return this.CPFittingForm.get('detailform') as FormArray;
  }

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }


  ngOnInit(): void {
  }

  onsubmitcpfittingdetails(){

      this.http.addcpfitting(this.CPFittingForm.get('detailform').value).subscribe(res=>console.log(res))

  }

}
