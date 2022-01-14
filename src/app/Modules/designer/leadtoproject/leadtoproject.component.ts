import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DesignerService, leads} from '../designer.service';
import { LeadtoprojectDataSource, LeadtoprojectItem } from './leadtoproject-datasource';

@Component({
  selector: 'app-leadtoproject',
  templateUrl: './leadtoproject.component.html',
  styleUrls: ['./leadtoproject.component.css']
})

export class LeadtoprojectComponent implements AfterViewInit {

  leadsforprojects:leads[]=[]
  displayedColumns: string[] = ['id', 'customername','quotation_amount','manage'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LeadtoprojectItem>;


  constructor(private http:DesignerService,private router:Router) {
    //  this.dataSource = new LeadtoprojectDataSource();
  }

  listLeads(){

    this.http.listLeadbyProject().subscribe(res=>{
    //this.leadsbyfinance=res
    this.leadsforprojects=res
    console.log(res)
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    })
  }

 
  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

 Createproject(id:any){
  this.router.navigateByUrl('designer/createproject/' + id);
 }


  ngOnInit(){
    this.listLeads();
  }
}

