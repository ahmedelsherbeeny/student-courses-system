import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialogRef } from '@angular/material/dialog';
import { fade } from 'src/app/helpers/animations';
import { DealingWithDataService } from '../dealing-with-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations:[
   fade
  ]
})
export class TodoComponent implements OnInit {

  arr:any=[]
elements:any=[]
 days:any = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
date:Date=new Date()
_day:any
_month:any
_dayNum:any
_year:any
_time:any
mediaPix:any
devicexs:boolean=false
@Input() toDoCourses:any=new EventEmitter()
rtl:string=''


  constructor(private dialogRef:MatDialogRef<TodoComponent>,private media:MediaObserver,private dataService:DealingWithDataService) {
    this._day=this.days[this.date.getDay()]
    this._month=this.date.toLocaleString('default', { month: 'short' });
    this._dayNum=this.date.getDate();
    this._year=this.date.getFullYear()


   }

   ngOnInit(): void {
    this.rtl=this.dataService.getLanguage()




  }





  deleteFromToDo(course:any){
    this.toDoCourses.includes(course)?this.toDoCourses.splice(this.toDoCourses.indexOf(course),1):0



  }


}
