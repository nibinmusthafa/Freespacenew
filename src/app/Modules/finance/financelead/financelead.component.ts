import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FinanceleadDataSource, FinanceleadItem } from './financelead-datasource';

@Component({
  selector: 'app-financelead',
  templateUrl: './financelead.component.html',
  styleUrls: ['./financelead.component.css']
})

export class FinanceleadComponent implements AfterViewInit {
  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FinanceleadItem>;
  dataSource: FinanceleadDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //displayedColumns = ['id', 'name'];
  displayedColumns: string[] = ['id', 'customername', 'description', 'statusvalue', 'updated_on','followup_date','action'];


  constructor() {
    this.dataSource = new FinanceleadDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
