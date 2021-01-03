import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { OtaRoutingModule } from './ota-routing.module';
import { OtaOtapageComponent } from './otapage/otapage.component';
import { OtaCalibrationComponent } from './otapage/calibration/calibration.component';

const COMPONENTS = [
  OtaOtapageComponent,
  OtaCalibrationComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    OtaRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class OtaModule { }
