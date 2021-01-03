import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CodeManagementComponent } from './code-management/code-management.component';
import { CodeRoutingModule } from './code-routing.module';
import { CodeCompilationComponent } from './code-management/compilation/compilation.component';
import { CodeBrushingComponent } from './code-management/brushing/brushing.component';
import { NzUploadModule } from "ng-zorro-antd";
import { SFSchema } from "@delon/form";

const COMPONENTS = [
  CodeManagementComponent,
  CodeCompilationComponent,
  CodeBrushingComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    CodeRoutingModule,
    NzUploadModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class CodeModule { }
