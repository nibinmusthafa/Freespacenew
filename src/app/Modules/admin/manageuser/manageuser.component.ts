import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService, iuser } from '../admin.service';
import { ManageuserItem } from './manageuser-datasource';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ManageuserItem>;
  // dataSource: ManageuserDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  users:iuser[]=[];
  displayedColumns = ['id', 'name','email','userdesignation','action'];
  dataSource=this.users;

  constructor(private http:AdminService,private router:Router) {
    // this.dataSource = new ManageuserDataSource();
  }

  getUserList() {   
    this.http.ListUsers().subscribe(response => {
      this.users = response;   
      console.log(this.users);
       
    });
  }


  
  onClick(id:any){
    console.log(id);   
    this.router.navigateByUrl('admin/edituser/' + id)
    this.http.ListUser(id).subscribe(response => {
      let user = response;    
      console.log(user);
      
    });
  }

  ngOnInit() {
    this.getUserList();   
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
