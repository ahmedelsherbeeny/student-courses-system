import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCourse'
})
export class SearchCoursePipe implements PipeTransform {

  transform(value:any[],filterString:string,propertyName:string): any[] {
    const result:any[]=[]
    if(!value || filterString===""|| propertyName===""){
      return value;

    }

    value.forEach((ele:any)=>{
      if(ele[propertyName].trim().toLowerCase().includes(filterString))
      result.push(ele)
    })


  return result;
  }

}
