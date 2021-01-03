import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NgxAmapModule} from 'ngx-amap';
import { NgxEchartsModule} from 'ngx-echarts';
import { LayoutModule} from '../../layout/layout.module';
import { VehicleManagementComponent } from './management/management.component';
import { VehicleMonitorComponent } from './monitor/monitor.component';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";


const COMPONENTS = [
  VehicleMonitorComponent,
  VehicleManagementComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    VehicleRoutingModule,
    NgxAmapModule,
    NgxEchartsModule,
    LayoutModule,
    NzDatePickerModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class VehicleModule { }
