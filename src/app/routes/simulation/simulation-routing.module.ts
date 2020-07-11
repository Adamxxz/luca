import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulationSceneAnalysisComponent } from './scene/scene-analysis/scene-analysis.component';
import { SimulationLogsimComponent } from './scene/scene-base/logsim/logsim.component';
import { SimulationSceneBaseComponent } from './scene/scene-base/scene-base.component';
import { SimulationWorldsimComponent } from './scene/scene-base/worldsim/worldsim.component';
import { SimulationSceneHelpComponent } from './scene/scene-help/scene-help.component';
import { SimulationSceneManagementComponent } from './scene/scene-management/scene-management.component';
import { SimulationTaskManagementComponent } from './task/task-management/task-management.component';

const routes: Routes = [
  { path: 'scene-base', component: SimulationSceneBaseComponent },
  { path: 'scene-management', component: SimulationSceneManagementComponent },
  { path: 'scene-help', component: SimulationSceneHelpComponent },
  { path: 'scene-analysis', component: SimulationSceneAnalysisComponent },
  { path: 'task-management', component: SimulationTaskManagementComponent },
  { path: 'logsim', component: SimulationLogsimComponent },
  { path: 'worldsim', component: SimulationWorldsimComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationRoutingModule { }
