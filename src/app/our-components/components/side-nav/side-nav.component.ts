import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { TranslateService } from '@ngx-translate/core';
import { staggering } from 'src/app/helpers/animations';
import { DealingWithDataService } from 'src/app/shared/dealing-with-data.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations:[
    staggering

  ]
})
export class SideNavComponent implements OnInit {
  devicexs:any;
  mediaPix:any;
  isOpen=true
  selectedIndex: any = 0
  courses: any = []
  filtered: any = []
  tempArray: any = []
  newArr: any = []
  searchword:any
  searchKey:any
  categories:any=[]

  @Output() filter=new EventEmitter()
  rtl1:any=""
  currentLanguage:any




  constructor(private media: MediaObserver,private dataService: DealingWithDataService,public translate:TranslateService)
     { }

  ngOnInit(): void {
    this.getAllCategories()
    this.rtl1=this.dataService.getLanguage()
    this.currentLanguage=localStorage.getItem("currentLanguage") || "en"
    this.translate.use(this.currentLanguage)


  }



  applyFilter(event:any){

    this.filter.emit({val:event.target.value,check:event.target.checked})
    }




    getAllCategories(){
      this.dataService.getCategories().subscribe((data:any)=>{
        this.categories=data

      })
    }

}
