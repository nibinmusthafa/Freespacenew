import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})

export class LeadDetailsComponent {
  leadDetailForm = this.fb.group({
    category: [null,Validators.required],
    part: [null, Validators.required],
    material: [null, Validators.required],
    finish: [null, Validators.required],
    type: [null, Validators.required],
    brand: [null, Validators.required],
    edgebanding: [null, Validators.required],
    colour:[null, Validators.required],
    code: [null, Validators.required],
    photoupload: [null, Validators.required],
    measurement: [null, Validators.required],
    remark: [null, Validators.required],
  });
  
  constructor(private fb: FormBuilder) {}
  onSubmit(): void {
    alert('Thanks!');
  }
}
