import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { DealingWithDataService } from 'src/app/shared/dealing-with-data.service';
import { Router } from '@angular/router';
import { forkJoin, map, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { fade, staggering, } from 'src/app/helpers/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    staggering,fade

  ]
})
export class HomeComponent implements OnInit {

  arr: any = []
  elements: any = []
  mediaPix: any
  devicexs: any
  isOpen = false
  studentId: any = 1235

  days: any = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  date: Date = new Date()
  _day: any
  _month: any
  _dayNum: any
  _year: any
  selectedIndex: any = 0
  courses: any = []
  filtered: any = []
  tempArray: any = []
  newArr: any = []
  searchword: any
  searchKey: any
  subscription!: Subscription
  studentCourses: any = []
  cartText: any
  cartTextArabic:any
  showAlert!: boolean
  CourseName: any
  added: any = []
  allCourses: any = []
  requestCourseDetails: any = {}

  rtl1:any=""
  currentLanguage:any





  constructor(private media: MediaObserver, private dataService: DealingWithDataService,
    public router: Router,public translate:TranslateService,private dialog:MatDialog) { }

  ngOnInit(): void {
    //be back ....
    this.rtl1=this.dataService.getLanguage()
    this.currentLanguage=localStorage.getItem("currentLanguage") || "en"
    this.translate.use(this.currentLanguage)




    this.dataService.searchkey.subscribe((a: any) => {
      this.searchKey = a
    });




    // while the page refresh we check wether there is added courses or not and if there is added we put them in the studentcourses

    if (this.dataService.checkStorage("addedCourses")) {
      let newAdded = JSON.parse(localStorage.getItem("addedCourses")!);


      newAdded?.forEach((ele: any) => {
        if (!this.studentCourses.includes(ele)) {
          this.studentCourses.push(ele)
        }
      })

    }



    this.getRequiredData();




    this.mediaPix = this.media.asObservable()
      .subscribe((change) => {
        console.log(change[0].mqAlias)

        this.devicexs = change[0].mqAlias === "xs" ? true : false


      });


  }




  getRequiredData() {
    let data = forkJoin([
      this.dataService.getCourses(),
      this.dataService.getCategories(),
      this.dataService.getRequestedCourses(),
      this.dataService.getStudents()

    ]).pipe(map(([courses, categories, studentsCourses, studentsInfo]) => {
      return { courses, categories, studentsCourses, studentsInfo }
    }))

    this.subscription = data.subscribe((data: any) => {
      this.filtered = data.courses
      this.getStudentInfo(data.studentsInfo)
      this.getStudentCourses(data.studentsCourses)
      // if there is courses in localstorage that is edited by taken seat so we update the courses that displayed for us
      this.courses = this.dataService.checkStorage("allCourses") ? JSON.parse(localStorage.getItem("allCourses")!) :
        data.courses



    });


  }


  // getting student courses in the beginning
  getStudentCourses(studentsCourses: any) {

    studentsCourses?.forEach((ele: any) => {
      if (ele.StudentId == this.studentId) {

        ele.Courses?.forEach((course: any) => {
          this.studentCourses.push(course.CourseId);
        });




        this.requestCourseDetails = { paymentType: ele.PaymentType, date: ele.RequestDate }


      }
    });


    this.dataService.getCourses().subscribe((data: any) => {
      this.studentCourses?.forEach((id: any) => {

        data?.forEach((course: any) => {
          if (id == course.CourseId) {

              this.cartTextArabic = "فى قائمتك";





              this.cartText = "In your cart";


                     }

        });


      });
    })


    localStorage.setItem("studentCourses", JSON.stringify(this.studentCourses));
    localStorage.setItem("courseDetails", JSON.stringify(this.requestCourseDetails));




  }






  getStudentInfo(students: any) {

    let studentInfo = students.filter((student: any) => student.Id === this.studentId);

    localStorage.setItem("studentInfo", JSON.stringify(studentInfo));
  }





  addCourse(courseToAdd: any) {


    //edit avilable seats

    if (!this.dataService.checkStorage("allCourses")) {

      this.dataService.getCourses().subscribe((data: any) => {
        data?.forEach((course: any) => {
          if (course.CourseId === courseToAdd.CourseId) {
            course.AvailableSeats = courseToAdd.AvailableSeats - 1;
            localStorage.setItem("allCourses", JSON.stringify(data));
            this.courses = data;

          }

        });

      })

    }

    // in case all courses is in localstorage
    else {
      let allCourses = JSON.parse(localStorage.getItem("allCourses")!);
      allCourses?.forEach((course: any) => {
        if (course.CourseId === courseToAdd.CourseId) {
          course.AvailableSeats = courseToAdd.AvailableSeats - 1;
          localStorage.setItem("allCourses", JSON.stringify(allCourses));
          this.courses = allCourses;

        }

      });

    }

    // putting the added courses in local storage
    this.studentCourses.push(courseToAdd.CourseId)
    this.added.push(courseToAdd.CourseId)
    if (this.dataService.checkStorage("addedCourses")) {
      JSON.parse(localStorage.getItem("addedCourses")!).forEach((ele: any) => {
        if (!this.added.includes(ele)) {
          this.added.push(ele)
        }
      })
    }

    localStorage.setItem("addedCourses", JSON.stringify(this.added));
    localStorage.setItem("studentCourses", JSON.stringify(this.studentCourses));
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.cartText = "فى قائمتك";




    }else{
      this.cartText = "In your cart";


    }


    const dialogconfig=new MatDialogConfig()
      dialogconfig.data={
        message:courseToAdd.CourseName
      }
      this.dialog.open(ConfirmationComponent,dialogconfig)
      setTimeout(() => {
        this.dialog.closeAll()

      },3500);


  }



  toggleSideBar() {
    this.isOpen = !this.isOpen

  }



  search(event: any) {
    this.searchword = (event.target as HTMLInputElement).value
    this.dataService.searchkey.next(this.searchword)

  }






  filterCourses(event: any) {
    if (event.check === true) {
      this.tempArray = this.filtered.filter((ele: any) => {
        return ele.CourseCategory == event.val
      })
      this.courses = []

      this.newArr.push(this.tempArray)
      console.log(this.newArr)
      this.newArr.forEach((ele: any) => {
        ele.forEach((innerele: any) => {
          this.courses.push(innerele)
        })
      })





    }
    else {
      this.tempArray = this.courses.filter((ele: any) => {
        return ele.CourseCategory != event.val
      })
      this.courses = []
      this.newArr = []

      this.newArr.push(this.tempArray)
      console.log(this.newArr)
      this.newArr.forEach((ele: any) => {
        ele.forEach((innerele: any) => {
          this.courses.push(innerele)
        })
      })
      if (this.courses.length == 0) {
        this.getRequiredData()
      }


    }



  }











}

