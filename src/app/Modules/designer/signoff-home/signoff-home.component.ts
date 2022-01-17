import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DesignerService, leads } from '../designer.service';
import { SignoffHomeDataSource, SignoffHomeItem } from './signoff-home-datasource';

@Component({
  selector: 'app-signoff-home',
  templateUrl: './signoff-home.component.html',
  styleUrls: ['./signoff-home.component.css']
})

export class SignoffHomeComponent implements AfterViewInit {

  leadforsignoff:leads[]=[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<SignoffHomeItem>;
  dataSource: MatTableDataSource<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'customername','phonenumber','manage'];

  constructor(private http:DesignerService,private router:Router) {
    
  }

  listLeads(){

    this.http.listLeadsforsignoff().subscribe(res=>{
    this.leadforsignoff=res
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

  ngOnInit(){
    this.listLeads();
  }

  navigatetosignoff(id:any){
    this.router.navigateByUrl('designer/signoffdetail/' + id)
  }
}
