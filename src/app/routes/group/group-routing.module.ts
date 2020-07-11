import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupGroupManagementComponent } from './group-management/group-management.component';

const routes: Routes = [

  { path: 'group-management', component: GroupGroupManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
