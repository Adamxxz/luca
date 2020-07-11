import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { NzCarouselModule } from 'ng-zorro-antd';
import { NzModalModule} from 'ng-zorro-antd';
import { NgxAmapModule} from 'ngx-amap';
import { NgxEchartsModule} from 'ngx-echarts';
import { LayoutModule} from '../layout/layout.module';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// dashboard pages
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS = [
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent, ];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule,
    RouteRoutingModule,
    LayoutModule,
    NgxAmapModule,
    NgxEchartsModule,
    NzCarouselModule,
  NzModalModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class RoutesModule {}
