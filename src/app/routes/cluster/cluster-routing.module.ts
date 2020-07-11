import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClusterClusterManagementComponent } from './cluster-management/cluster-management.component';

const routes: Routes = [

  { path: 'cluster-management', component: ClusterClusterManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClusterRoutingModule { }
