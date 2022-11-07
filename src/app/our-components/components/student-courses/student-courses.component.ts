import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { staggering, fade } from 'src/app/helpers/animations';
import { DealingWithDataService } from 'src/app/shared/dealing-with-data.service';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.scss'],
  animations:[
    staggering,fade

  ]
})
export class StudentCoursesComponent implements OnInit {
myCourses:any
displayData:any[]=[]
courseDetails:any={}
totalPrice:any=0
toDoCourses:any=[]
listBtnText:string=""
rtl1:any=""
currentLanguage:any




  constructor(private dataService:DealingWithDataService,public translate:TranslateService) { }

  ngOnInit(): void {

    this.getmyCourses()
    this.rtl1=this.dataService.getLanguage()
    this.currentLanguage=localStorage.getItem("currentLanguage") || "en"
    this.translate.use(this.currentLanguage)





  }

  getmyCourses(){
    this.courseDetails=JSON.parse(localStorage.getItem("courseDetails")!)
    let coursesId=JSON.parse(localStorage.getItem("studentCourses")!)

    this.dataService.getCourses().subscribe((data:any)=>{
      coursesId?.forEach((ele:any)=>{
        data?.forEach((course:any)=>{
          if(course.CourseId==ele){
            this.displayData.push(course)
          }
        })









      })
     this.getTotalPrice(this.displayData)


    })




  }
  getTotalPrice(data:any){
    data.forEach((e:any)=>{
      this.totalPrice+=e.CoursePrice

    })

  }

  sendCourse(course:any){
  this.toDoCourses.push(course)
  this.listBtnText="In your todolist"



  }




  }



