import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { icustomer, SupervisorService } from '../supervisor.service';
import { UpdateleadbysupervisorItem } from './updateleadbysupervisor-datasource';

@Component({
  selector: 'app-updateleadbysupervisor',
  templateUrl: './updateleadbysupervisor.component.html',
  styleUrls: ['./updateleadbysupervisor.component.css']
})
export class UpdateleadbysupervisorComponent implements AfterViewInit {

  customer: icustomer[] = [];
  displayedColumns:string[] = ['id', 'customername', 'leadname', 'description', 'statusvalue', 'updated_on','followup_date','action'];
  dataSource = this.customer;
  num: number = 0;
  updatedresponse: any;
  leads: any;
  userId: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UpdateleadbysupervisorItem>;
  // dataSource: UpdateleadbysupervisorDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  constructor(private supervisorservice:SupervisorService,private router:Router) { }

  btnClick(id: number) {
    var data = {
      status_id: 2
    }
    this.supervisorservice.updatestatus(id, data).subscribe(res => {
      this.leads = res;
      // console.log(res);
    });
    this.router.navigateByUrl('supervisor/supervisorremarks/' + id);
  };
  
  loadRemarks(id: any) {
    this.router.navigateByUrl('supervisor/supervisorremarks/' + id);
  }

  getleadList() {
    this.userId = localStorage.getItem('currentUser')
    this.userId = JSON.parse(this.userId);
    this.supervisorservice.getleadbysupervisor(this.userId.id).subscribe(response => {
      this.customer = response;
      console.log(this.customer)
    });
  }

  updateStatus(id: number, value: any) {
    this.supervisorservice.updatestatus(id, value).subscribe(res => {
      this.updatedresponse = res;
    })
  }

  ngOnInit() {
    this.getleadList();  
  }

  ngAfterViewInit(): void {

    // this.getleadList();
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }
}
