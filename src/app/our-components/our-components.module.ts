import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';


import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { SearchCoursePipe } from '../shared/search-course.pipe';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { ProfileComponent } from './profile/profile.component';
import { ComponentsRoutingModule } from './components-routing-module';







@NgModule({
  declarations: [
    HomeComponent,
    StudentCoursesComponent,
    SearchCoursePipe,
    SideNavComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,

    MatIconModule,
    SharedModule,
    MatDialogModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule,
    MatSidenavModule,
    TranslateModule.forRoot({
      defaultLanguage:"en",
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }
    })

  ],
  exports:[
    HomeComponent,
    StudentCoursesComponent,
    FlexLayoutModule,
    SideNavComponent,
    ProfileComponent

  ],

})
export class OurComponentsModule { }
