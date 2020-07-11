import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CodeCodeManagementComponent } from './code-management/code-management.component';
import { CodeRoutingModule } from './code-routing.module';

const COMPONENTS = [
  CodeCodeManagementComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    CodeRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class CodeModule { }
