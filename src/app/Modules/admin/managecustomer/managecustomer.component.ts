import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService, icustomer } from '../admin.service';
import { ManagecustomerItem } from './managecustomer-datasource';

@Component({
  selector: 'app-managecustomer',
  templateUrl: './managecustomer.component.html',
  styleUrls: ['./managecustomer.component.css']
})
export class ManagecustomerComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ManagecustomerItem>;
  // dataSource: ManagecustomerDataSource;

  customers: icustomer[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','customer_firstname','customer_lastname','customer_phonenumber','email','updated_on','action'];
  dataSource = this.customers;

  constructor(private http:AdminService,private router:Router) {
    // this.dataSource = new ManagecustomerDataSource();
  }

  getcustomerList() {   
    this.http.getCustomer().subscribe(response => {
      this.customers = response;   
      console.log(this.customers);
         
    });
  }
  
  onClick(id:any){
    this.router.navigateByUrl('admin/editcustomer/' + id)
    this.http.ListUser(id)
  }

  ngOnInit() {
    this.getcustomerList();   
  }

  ngAfterViewInit(): void {

    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
