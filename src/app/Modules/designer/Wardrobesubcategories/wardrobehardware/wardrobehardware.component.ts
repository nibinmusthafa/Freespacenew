import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService } from '../../designer.service';


@Component({
  selector: 'app-wardrobehardware',
  templateUrl: './wardrobehardware.component.html',
  styleUrls: ['./wardrobehardware.component.css']
})
export class WardrobehardwareComponent implements OnInit {

  WardrobeHardwareForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      brand:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  get detailform() {
    return this.WardrobeHardwareForm.get('detailform') as FormArray;
  }
 

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

  ngOnInit(): void {
  }

  onsubmithardwaredetails(){
    this.http.addwardrobehardware(this.WardrobeHardwareForm.get('detailform').value).subscribe(res=>console.log(res))
    
  }

}
