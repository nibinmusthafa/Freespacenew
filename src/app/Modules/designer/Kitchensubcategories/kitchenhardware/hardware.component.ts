import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService } from '../../designer.service';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css']
})
export class HardwareComponent implements OnInit {

  KitchenHardwareForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      brand:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  get detailform() {
    return this.KitchenHardwareForm.get('detailform') as FormArray;
  }


  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }


  ngOnInit(): void {
  }


  onsubmitkitchenhardwaredetails(){
    this.http.addkitchenhardware(this.KitchenHardwareForm.get('detailform').value).subscribe(res=>console.log(res))
    
  }

}
