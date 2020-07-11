import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtaOtapageComponent } from './otapage/otapage.component';

const routes: Routes = [

  { path: 'otapage', component: OtaOtapageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtaRoutingModule { }
