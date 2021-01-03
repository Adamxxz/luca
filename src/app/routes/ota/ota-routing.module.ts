import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtaOtapageComponent } from './otapage/otapage.component';
import { OtaCalibrationComponent } from './otapage/calibration/calibration.component';

const routes: Routes = [

  { path: 'otapage', component: OtaOtapageComponent },
  { path: 'calibration', component: OtaCalibrationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtaRoutingModule { }
