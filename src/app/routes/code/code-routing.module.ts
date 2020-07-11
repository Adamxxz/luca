import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeCodeManagementComponent } from './code-management/code-management.component';

const routes: Routes = [

  { path: 'code-management', component: CodeCodeManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule { }
