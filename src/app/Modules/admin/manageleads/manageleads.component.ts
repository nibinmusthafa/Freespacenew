import { DatePipe, formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
// import * as moment from 'moment';

import { AdminService, icustomers } from '../admin.service';
import { ManageleadsItem } from './manageleads-datasource';

@Component({
  selector: 'app-manageleads',
  templateUrl: './manageleads.component.html',
  styleUrls: ['./manageleads.component.css']
})

export class ManageleadsComponent implements AfterViewInit {

  customers: icustomers[] = [];
  displayedColumns: string[] = ['id', 'customername', 'leadname', 'description', 'updated_on', 'statusvalue', 'followup_date', 'action'];
  dataSource = this.customers;
  userId: any;
  pipe = new DatePipe('en-US');
  date: Date = new Date();
  today = this.pipe.transform(this.date, 'yyyy-MM-dd')
  datewithtime = new Date();
  date1;
  date2;
  @ViewChild('followupdate') followupelementref: ElementRef;

  compareDate(fdate):boolean {
    var time = new Date();
    var secondTime= new Date(fdate);
    // this.date1 = formatDate(new Date(), 'MM-dd-yyyy', 'en_US');
    // this.date2 = formatDate(fdate, 'MM-dd-yyyy', 'en_US');
     var Time=time.getTime()- secondTime.getTime()
    
    var Diff=Math.ceil(Time/(1000*3600*24)) 
   
    return Diff > 3

     
  }


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ManageleadsItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(private adminservice: AdminService, private router: Router) {
  }

  getDate(followupdate: Date) {

    return this.pipe.transform(followupdate, 'YYYY-MM-dd')
    //  moment().format('DD MMM YYYY HH:mm:ss');
  }


  getFollowupdate(lead_id: any) {
    this.adminservice.getFollowupDate(lead_id).subscribe(res => {
      return res[0]
    })
  }

  getleadList() {
    this.adminservice.getlead().subscribe(response => {
      console.log(response) 
      this.customers = response;
    });
  }

  navigatetodesigner(id: any) {
    this.router.navigateByUrl('admin/designeractivity/' + id)
  }

  navigatetosupervisor(id: any) {
    this.router.navigateByUrl('admin/supervisoractivity/' + id)

  }
  navigatetoedit(id: any) {
    this.router.navigateByUrl('admin/editlead/' + id)
    
  }

  ngOnInit() {
    this.getleadList();
    // console.log(this.followupelementref.nativeElement)  
  }



  onclick() {
    console.log(this.followupelementref)
  }

  ngAfterViewInit(): void {


    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
