import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { staggering, fade } from 'src/app/helpers/animations';
import { DealingWithDataService } from 'src/app/shared/dealing-with-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations:[
    staggering,fade

  ]
})
export class ProfileComponent implements OnInit {
studentInfo:any=[]
rtl1:any=""
currentLanguage:any

  constructor(private dataService:DealingWithDataService,public translate:TranslateService) { }

  ngOnInit(): void {
    if(this.dataService.checkStorage("studentInfo")){
      this.studentInfo=JSON.parse(localStorage.getItem("studentInfo")!)

      this.rtl1=this.dataService.getLanguage()


    }
    this.currentLanguage=localStorage.getItem("currentLanguage") || "en"
    this.translate.use(this.currentLanguage)
  }

}
