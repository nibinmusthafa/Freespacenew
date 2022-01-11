import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, icountermaterial } from '../../designer.service';

@Component({
  selector: 'app-countertop',
  templateUrl: './countertop.component.html',
  styleUrls: ['./countertop.component.css']
})
export class CountertopComponent implements OnInit {

  countertopmaterials:icountermaterial[]=[];

  CountertopForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      lead_category_id:null,
      material:[null, Validators.required],
      colour:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  get detailform() {
    return this.CountertopForm.get('detailform') as FormArray;
  }

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

    listcountertopmaterial(){  
      this.http.getCountertopmaterial().subscribe(res =>{
        this.countertopmaterials=res;    
      })
    }

    ngOnInit(): void {
      this.listcountertopmaterial();
    }

    onsubmitaddcontertopdetails(){
      this.http.addcounterdetails(this.CountertopForm.get('detailform').value).subscribe(res=>console.log(res))

    }
}
