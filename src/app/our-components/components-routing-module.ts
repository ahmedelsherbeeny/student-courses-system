import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},

  {path:'studentCourses/:id',component:StudentCoursesComponent},
  {path:'profile/:id',component:ProfileComponent},
  {path:"**",redirectTo:'',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
