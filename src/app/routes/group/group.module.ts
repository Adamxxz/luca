import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { GroupGroupManagementComponent } from './group-management/group-management.component';
import { GroupRoutingModule } from './group-routing.module';

const COMPONENTS = [
  GroupGroupManagementComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    GroupRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class GroupModule { }
