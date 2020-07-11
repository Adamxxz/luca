import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { VersionVersionManagementComponent } from './version-management/version-management.component';
import { VersionRoutingModule } from './version-routing.module';

const COMPONENTS = [
  VersionVersionManagementComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    VersionRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class VersionModule { }
