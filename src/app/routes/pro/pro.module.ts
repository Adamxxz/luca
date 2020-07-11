import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import {NzListModule, NzStepsModule, NzUploadModule} from 'ng-zorro-antd';
import { ProCenterBaseComponent} from './account/center/base/base.component';
import { ProCenterComponent } from './account/center/center.component';
import { ProCenterSecurityComponent } from './account/center/security/security.component';
import { ProRoutingModule } from './pro-routing.module';

const COMPONENTS = [
  ProCenterComponent,
  ProCenterBaseComponent,
  ProCenterSecurityComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ProRoutingModule,
    NzListModule,
    NzUploadModule,
    NzStepsModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class ProModule { }
