import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DesignerService, ibeddetails, icountertopdetails, icpfittingdetails, ikitcehnhardwaredetails, ikitchenbasketdetails, ikitchendrawersdetails, ikitchenhingesdetails, isinkdetails, itilesdetails, itvunitdetails, iwardrobebasketdetails, iwardrobedetails, iwardrobedrawersdetails, iwardrobehardwaredetails, iwardrobehingesdetails, kitchendetails } from '../designer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signoff-detail',
  templateUrl: './signoff-detail.component.html',
  styleUrls: ['./signoff-detail.component.css']
})
export class SignoffDetailComponent implements OnInit {

 
  kitchendetails:kitchendetails[]=[];
  wardrobedetails:iwardrobedetails[]=[];
  cpfittingdetails:icpfittingdetails[]=[];
  sinkdetails:isinkdetails[]=[];
  countertopdetails:icountertopdetails[]=[];
  tilesdetails:itilesdetails[]=[];
  kitchenbasket:ikitchenbasketdetails[]=[];
  kitchenhinges:ikitchenhingesdetails[]=[];
  kitchenhardware:ikitcehnhardwaredetails[]=[];
  kitchendrawers:ikitchendrawersdetails[]=[];
  wardrobebasket:iwardrobebasketdetails[]=[];
  wardrobehinges:iwardrobehingesdetails[]=[];
  wardrobehardware:iwardrobehardwaredetails[]=[];
  wardrobedrawers:iwardrobedrawersdetails[]=[];
  beddetails:ibeddetails[]=[];
  tvdetails:itvunitdetails[]=[];


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

  loadwardrobedetails(){
    this.http.listWardrobedetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.wardrobedetails=res
      console.log(res)
    })
  }
  loadkitchencountertopdetails(){
    this.http.listCountertopdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.countertopdetails=res
      console.log(res)
    })
  }
  loadkitchensinkdetails(){
    this.http.listSinkdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.sinkdetails=res
      console.log(res)
    })
  }
  loadkitchentilesdetails(){
    this.http.listTilesdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.tilesdetails=res
      console.log(res)
    })
  }
  loadkitchencpfittingdetails(){
    this.http.listCpFittingdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.cpfittingdetails=res
      console.log(res)
    })
  }
  loadkitchendrawersdetails(){
    this.http.listkitchendrawersdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.kitchendrawers=res
      console.log(res)
    })
  }
  loadkitchenbasketdetails(){
    this.http.listkitchenbasketdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.kitchenbasket=res
      console.log(res)
    })
  }
  loadkitchenhingesdetails(){
    this.http.listkitchenhingesdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.kitchenhinges=res
      console.log(res)
    })
  }
  loadkitchenhardwaredetails(){
    this.http.listkitchenhardwaredetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.kitchenhardware=res
      console.log(res)
    })
  }
  loadwardrobebasketdetails(){
    this.http.listwardrobebasketdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.wardrobebasket=res
      console.log(res)
    })
  }
  loadwardrobehingesdetails(){
    this.http.listwardrobehingesdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.wardrobehinges=res
      console.log(res)
    })
  }
  loadwardrobedrawersdetails(){
    this.http.listwardrobedrawersdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.wardrobedrawers=res
      console.log(res)
    })
  }
  loadwardrobehardwaredetails(){
    this.http.listwardrobehardwaredetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.wardrobehardware=res
      console.log(res)
    })
  }
  loadbeddetails(){
    this.http.listbeddetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.beddetails=res
      console.log(res)
    })
  }
  loadtvunitdetails(){
    this.http.listtvunitdetails(this.routeee.snapshot.paramMap.get('id'),).subscribe(res=>{
      this.tvdetails=res
      console.log(res)
    })
  }



  ngOnInit(): void {
    this.loadkitchendetails()
    this.loadkitchencountertopdetails();
    this.loadkitchensinkdetails();
    this.loadkitchencpfittingdetails();
    this.loadkitchentilesdetails();
    this.loadkitchendrawersdetails();
    this.loadkitchenbasketdetails();
    this.loadkitchenhingesdetails();
    this.loadkitchenhardwaredetails();
    this.loadwardrobedetails();
    this.loadwardrobebasketdetails();
    this.loadwardrobehingesdetails();
    this.loadwardrobedrawersdetails();
    this.loadwardrobehardwaredetails();
    this.loadbeddetails();
    this.loadtvunitdetails();


  }

}

