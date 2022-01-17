import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DesignerService, kitchendetails } from '../designer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signoff-detail',
  templateUrl: './signoff-detail.component.html',
  styleUrls: ['./signoff-detail.component.css']
})
export class SignoffDetailComponent implements OnInit {

 
  kitchendetails:kitchendetails[]=[];
  wardrobe

  @ViewChild('content') content: ElementRef; 
  
  public openPDF():void {
    let DATA = document.getElementById('htmlData');
      
    html2canvas(DATA).then(canvas => {      
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 1;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        PDF.save('angular-demo.pdf');
    });     
  }

  constructor(private http:DesignerService,private route:Router,private routeee:ActivatedRoute) { }
  loadkitchendetails(){
    this.http.listKitchendetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.kitchendetails=res
      console.log(res)
    })
  }

  // loadwardrobedetails(){
  //   this.http.listdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
  //     this.kitchendetails=res
  //     console.log(res)
  //   })
  // }

  
  ngOnInit(): void {
    this.loadkitchendetails()
  }

}

