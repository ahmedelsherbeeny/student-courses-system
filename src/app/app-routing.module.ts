import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:'/components/home',pathMatch:'full'},

  {path:'components',loadChildren:()=>import('./our-components/our-components.module').then(mod=>
    mod.OurComponentsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
