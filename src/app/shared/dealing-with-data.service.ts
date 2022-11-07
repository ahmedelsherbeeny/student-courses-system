import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealingWithDataService {

  constructor(private http:HttpClient) { }


  searchkey:any=new BehaviorSubject<string>('')

  getCourses(){
    return this.http.get('assets/courses.json')
  }
  getCategories(){
    return this.http.get('assets/categories.json')
  }
  getRequestedCourses(){
    return this.http.get('assets/requests.json')
  }
  getStudents(){
    return this.http.get('assets/students.json')
  }
  checkStorage(name:string){
    if(JSON.parse(localStorage.getItem(name)!)){

      return true;

    }
    else{
      return false;
    }
  }
  getLanguage(){
    let lang=  localStorage.getItem("currentLanguage")

    if(lang=="ar"){
      return 'rtl';
    }
    else{
      return 'ltr'

    }
  }
}
