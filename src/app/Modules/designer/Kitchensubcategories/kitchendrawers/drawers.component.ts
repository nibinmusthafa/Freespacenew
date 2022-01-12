import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService } from '../../designer.service';

@Component({
  selector: 'app-drawers',
  templateUrl: './drawers.component.html',
  styleUrls: ['./drawers.component.css']
})
export class DrawersComponent implements OnInit {

  KitchenDrawersForm = this.fb.group({
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
    return this.KitchenDrawersForm.get('detailform') as FormArray;
  }


  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

  ngOnInit(): void {
  }

  onsubmitkitchendrawingsdetails(){
    this.http.addkitchendrawers(this.KitchenDrawersForm.get('detailform').value).subscribe(res=>console.log(res))

  }

}
