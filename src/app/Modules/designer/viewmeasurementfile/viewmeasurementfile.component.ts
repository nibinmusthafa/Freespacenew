import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewmeasurementfile',
  templateUrl: './viewmeasurementfile.component.html',
  styleUrls: ['./viewmeasurementfile.component.css']
})
export class ViewmeasurementfileComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
