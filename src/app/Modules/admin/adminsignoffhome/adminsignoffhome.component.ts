import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService, financelead } from '../admin.service';
import { AdminsignoffhomeDataSource, AdminsignoffhomeItem } from './adminsignoffhome-datasource';

@Component({
  selector: 'app-adminsignoffhome',
  templateUrl: './adminsignoffhome.component.html',
  styleUrls: ['./adminsignoffhome.component.css']
})
export class AdminsignoffhomeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AdminsignoffhomeItem>;
  dataSource: MatTableDataSource<any>;
  leadforsignoff:financelead[]=[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'customername','phonenumber','manage'];

  constructor(private http:AdminService,private router:Router) {
    // this.dataSource = new AdminsignoffhomeDataSource();
  }

  listLeadforsignoff(){

    this.http.listLeadsforsignoff().subscribe(res=>{
    this.leadforsignoff=res
    console.log(res)
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })
  }
  ngOnInit(): void {
    this.listLeadforsignoff();
  }

  navigatetosignoff(id:any){
    this.router.navigateByUrl('admin/adminsignoffdetails/' + id)
  }


  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}


  


