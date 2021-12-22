import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupervisorService } from '../supervisor.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  public uploadProgress: number | null | undefined = null;
  // selectedFile  = null;
  fileName = '';
  File: any = '';
  response: any;
  // public user
  _id: any;

  fileForm = this.fb.group({    
    name: [null, Validators.required],      
  }); 

  constructor(
    private http: SupervisorService,
    public Ref: MatDialogRef<FileuploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

    onFileSelected(event) {
      const selectedfile: File = event.target.files[0];
      if (selectedfile) {
        this.File = selectedfile
        this.fileName = selectedfile.name;
      }
    }
  
    onUpload() {
      const user_id: any = localStorage.getItem('currentUser');
      const user: any = JSON.parse(user_id)
      const fd = new FormData();
      fd.append('file', this.File, this.fileName);
      fd.append('name', this.fileForm.get('name')?.value)
      fd.append('lead_id', this.data.lead_id)
      fd.append('user_id', user.id)
      console.log(fd)    
      this.http.addImage(fd).subscribe(res => {
        console.log(res);
        this.response = res
        if (this.response.file) {
          window.location.reload()
          this.snackBar.open("Uploaded Successfully", "ok", {
            duration: 2500
          });
          this.Ref.close();
        }
        else {
          this.snackBar.open("Can not Upload")
        }
      })
    }
                                                                                                                                                                                           
  ngOnInit(): void {

  }
}
