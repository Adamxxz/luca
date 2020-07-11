import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProCenterBaseComponent} from './account/center/base/base.component';
import { ProCenterComponent } from './account/center/center.component';
import {ProCenterSecurityComponent} from './account/center/security/security.component';

const routes: Routes = [

  { path: 'center', component: ProCenterComponent,
    children: [
      { path: '', redirectTo: 'base', pathMatch: 'full' },
      {
        path: 'base',
        component: ProCenterBaseComponent,
      },
      {
        path: 'security',
        component: ProCenterSecurityComponent,
      }
      ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProRoutingModule { }
