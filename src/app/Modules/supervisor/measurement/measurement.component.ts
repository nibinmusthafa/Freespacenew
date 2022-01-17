import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { imeasurementtype, SupervisorService } from '../supervisor.service';


@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  fileName = '';
  File: any = '';
  fileToUpload: File | null = null;
  isPhotoError = false;
  image: string;

  measurementtypes:imeasurementtype[]=[];

  MeasurementForm = this.fb.group({
    
    lead_id:[this.data.lead_id],
    measurements:[null, Validators.required],
    measurement_details: [null, Validators.required],
    file_upload: [null],
    supervisor_id:null,

  });

  constructor(private fb: FormBuilder,private http:SupervisorService,
    private route: ActivatedRoute,@Inject(MAT_DIALOG_DATA)public data:any,private router:Router) { }

   
    onFileSelect(event) {
      const selectedfile: File = event.target.files[0];
      if (selectedfile) {
        this.File = selectedfile
        this.fileName = selectedfile.name;
        console.log(this.File);
        
      }
    }
    


  listMeasurementTypes(){

    this.http.listmeasurementtypes().subscribe(res =>{
      this.measurementtypes=res; 
      console.log(res);
         
    })
  }

  ngOnInit(): void {

    this.listMeasurementTypes();
  }

  onsubmitmeasurementdetails(){

    const fd = new FormData();
    fd.append('file_upload', this.File, this.fileName);
    fd.append('measurements', this.MeasurementForm.get('measurements')?.value)
    fd.append('measurement_details', this.MeasurementForm.get('measurement_details')?.value)
    fd.append('lead_id', this.data.lead_id)
    this.http.addmeasurementdetails(fd).subscribe(res=>console.log(res))
    // this.MeasurementForm.reset()
    window.location.reload()
    this.router.navigateByUrl('supervisor/updateleads')
    
  }


}
