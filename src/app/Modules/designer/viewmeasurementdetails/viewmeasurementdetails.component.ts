import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { files } from 'src/app/_models/filesmodel';
import { DesignerService, imeasurementdetails } from '../designer.service';
import { ViewmeasurementfileComponent } from '../viewmeasurementfile/viewmeasurementfile.component';
import { ViewmeasurementdetailsDataSource, ViewmeasurementdetailsItem } from './viewmeasurementdetails-datasource';

@Component({
  selector: 'app-viewmeasurementdetails',
  templateUrl: './viewmeasurementdetails.component.html',
  styleUrls: ['./viewmeasurementdetails.component.css']
})
export class ViewmeasurementdetailsComponent implements AfterViewInit {
  files: files[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ViewmeasurementdetailsItem>;
  dataSource: MatTableDataSource<any>;
  measurementdetails:imeasurementdetails[]=[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['measurement_details', 'file_upload','measurementtype'];

  constructor(private http:DesignerService,private routee: Router,private router: ActivatedRoute,
    public dialog: MatDialog) {
    // this.dataSource = new ViewmeasurementdetailsDataSource();
  }
  btnclick(url: any) {   
    this.dialog.open(ViewmeasurementfileComponent, { data: { img_url: url } })
  }

  listmeasurementdetail(){
    this.http.listmeasurementdetails(this.router.snapshot.paramMap.get('id')).subscribe(res=>{
      this.measurementdetails=res
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

  ngOnInit(): void {
    this.listmeasurementdetail();
  }
}
