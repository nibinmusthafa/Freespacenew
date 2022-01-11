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

  DrawersForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      brand:[null, Validators.required],
      noofunits:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  get detailform() {
    return this.DrawersForm.get('detailform') as FormArray;
  }


  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

  ngOnInit(): void {
  }

  onsubmitdrawingsdetails(){
    this.http.adddrawers(this.DrawersForm.get('detailform').value).subscribe(res=>console.log(res))

  }

}
