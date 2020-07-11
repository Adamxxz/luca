import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ClusterClusterManagementComponent } from './cluster-management/cluster-management.component';
import { ClusterRoutingModule } from './cluster-routing.module';

const COMPONENTS = [
  ClusterClusterManagementComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ClusterRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class ClusterModule { }
