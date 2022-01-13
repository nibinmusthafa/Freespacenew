import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FinanceService, leads } from '../finance.service';
import { FinanceleadDataSource, FinanceleadItem } from './financelead-datasource';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-financelead',
  templateUrl: './financelead.component.html',
  styleUrls: ['./financelead.component.css']
})

export class FinanceleadComponent implements AfterViewInit {
  
  leadsbyfinance:leads[]=[]
  displayedColumns: string[] = ['id', 'customername','quotation_amount','manage'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FinanceleadItem>;

  constructor(private http:FinanceService,private router:Router) {
}
updatePayment(id: any) {
  this.router.navigateByUrl('finance/payment/' + id);
}
  listLeads(){

    this.http.listLeadbyfinance().subscribe(res=>{
    this.leadsbyfinance=res
    console.log(res)
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })

  }
  ManageFinance(){

  }
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    
  }
  ngOnInit(){
    this.listLeads();
  }
}
