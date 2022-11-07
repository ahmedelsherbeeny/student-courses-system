import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DealingWithDataService } from '../dealing-with-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  studentId:any=1235;
  currentLanguage!:string
  rtl:string=''


  constructor(public translate:TranslateService,private dataService:DealingWithDataService) {
    this.currentLanguage=localStorage.getItem("currentLanguage") || "en"
    this.translate.use(this.currentLanguage)


   }


  ngOnInit(): void {
    this.rtl=this.dataService.getLanguage()


  }
  changeCurrentLanguage(lang:string){
    this.translate.use(lang)
    localStorage.setItem("currentLanguage",lang)
  }




}



