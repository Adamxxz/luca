import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VersionVersionManagementComponent } from './version-management/version-management.component';

const routes: Routes = [

  { path: 'version-management', component: VersionVersionManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionRoutingModule { }
