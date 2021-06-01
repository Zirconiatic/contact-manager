import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path:'demo', loadChildren:'./demo/demo.module#DemoModule'}, this doesnt work, for angular 9 onwards
  { path:'contactmanager', loadChildren:()=>import('./contactmanager/contactmanager.module').then(m=>m.ContactmanagerModule)},
  { path:'demo', loadChildren:()=>import('./demo/demo.module').then(m=>m.DemoModule)},
  // { path:'**', redirectTo:'demo' }
  { path:'**', redirectTo:'contactmanager' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
