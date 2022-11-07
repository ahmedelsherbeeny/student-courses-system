import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { TodoComponent } from './todo/todo.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';






@NgModule({
  declarations: [
    HeaderComponent,
    TodoComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    TranslateModule.forRoot({
      defaultLanguage:"en",
      loader:{
        provide:TranslateLoader,
        useFactory:createTranslateLoader,
        deps:[HttpClient]
      }
    })

  ],
  exports:[HeaderComponent,
  MatDialogModule,
  TodoComponent,
  ConfirmationComponent

],
providers:[
  {
    provide:MatDialogRef,
    useValue: {}
  }
]
})
export class SharedModule { }
