import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-simulation-scene-analysis',
  templateUrl: './scene-analysis.component.html',
})
export class SimulationSceneAnalysisComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
