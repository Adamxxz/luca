import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NzCarouselModule } from 'ng-zorro-antd';
import { IndexRoutingModule } from './index-routing.module';
import { IndexPageComponent } from './page/page.component';

const COMPONENTS = [
  IndexPageComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    IndexRoutingModule,
    NzCarouselModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class IndexModule { }
