import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SupervisorprojectexecutionDataSource, SupervisorprojectexecutionItem } from './supervisorprojectexecution-datasource';

@Component({
  selector: 'app-supervisorprojectexecution',
  templateUrl: './supervisorprojectexecution.component.html',
  styleUrls: ['./supervisorprojectexecution.component.css']
})
export class SupervisorprojectexecutionComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SupervisorprojectexecutionItem>;
  dataSource: SupervisorprojectexecutionDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor() {
    this.dataSource = new SupervisorprojectexecutionDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
