import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeManagementComponent } from './code-management/code-management.component';
import { CodeCompilationComponent } from './code-management/compilation/compilation.component';
import { CodeBrushingComponent } from './code-management/brushing/brushing.component';

const routes: Routes = [
  { path: 'code-management', component: CodeManagementComponent,
  children:[
    { path: '', redirectTo: 'compilation', pathMatch: 'full' },
    { path: 'compilation', component: CodeCompilationComponent },
    { path: 'brushing', component: CodeBrushingComponent }
  ]
  },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule { }
