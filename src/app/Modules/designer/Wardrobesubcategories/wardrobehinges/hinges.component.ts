import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DesignerService, ihingestype } from '../../designer.service';

@Component({
  selector: 'app-hinges',
  templateUrl: './hinges.component.html',
  styleUrls: ['./hinges.component.css']
})
export class HingesComponent implements OnInit {

  hingestypes:ihingestype[]=[];

  WardrobeHingesForm = this.fb.group({
    detailform:this.fb.array([
      this.fb.group({
      lead_id:[this.route.snapshot.paramMap.get('id')],
      brand:[null, Validators.required],
      hingetype:[null, Validators.required],
      remark:[null, Validators.required],
      })
    ])
  })

  get detailform() {
    return this.WardrobeHingesForm.get('detailform') as FormArray;
  }

  constructor(private fb: FormBuilder,  private route: ActivatedRoute,
    private http: DesignerService,) { }

    listhingestypes(){  
      this.http.getHingestype().subscribe(res =>{
        this.hingestypes=res;    
      })
    } 

  ngOnInit(): void {
    this.listhingestypes();
  }

  onsubmitwardrobehingesdetails(){
    this.http.addwardrobehinges(this.WardrobeHingesForm.get('detailform').value).subscribe(res=>console.log(res))
  }

}
