import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { iproject, SupervisorService } from '../supervisor.service';
import { ListprojectsDataSource, ListprojectsItem } from './listprojects-datasource';

@Component({
  selector: 'app-listprojects',
  templateUrl: './listprojects.component.html',
  styleUrls: ['./listprojects.component.css']
})
export class ListprojectsComponent implements AfterViewInit {

  projects:iproject[]=[];
  dataSource:  MatTableDataSource<any>;;
  displayedColumns = ['id', 'completion_date' ,'tentative_date' ,'customername','lead_id','manage'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ListprojectsItem>;



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */


  constructor(private http:SupervisorService,private router:Router,private route:ActivatedRoute) {
   
  }
  listproject(){
    this.http.listprojectsforsupervisors().subscribe(res=>{
      this.projects=res
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     
      
  })
}

 manageproject(id: any) {
  this.router.navigateByUrl('supervisor/manageproject/' + id);
}


  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

  ngOnInit(){
    this.listproject()
  }


}
