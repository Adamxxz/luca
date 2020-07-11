import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SimulationSceneAnalysisComponent } from './scene/scene-analysis/scene-analysis.component';
import { SimulationLogsimComponent } from './scene/scene-base/logsim/logsim.component';
import { SimulationSceneBaseComponent } from './scene/scene-base/scene-base.component';
import { SimulationWorldsimComponent } from './scene/scene-base/worldsim/worldsim.component';
import { SimulationSceneHelpComponent } from './scene/scene-help/scene-help.component';
import { SimulationSceneManagementComponent } from './scene/scene-management/scene-management.component';
import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationTaskManagementComponent } from './task/task-management/task-management.component';

const COMPONENTS = [
  SimulationSceneBaseComponent,
  SimulationSceneManagementComponent,
  SimulationSceneHelpComponent,
  SimulationSceneAnalysisComponent,
  SimulationTaskManagementComponent,
  SimulationLogsimComponent,
  SimulationWorldsimComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SimulationRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class SimulationModule { }
