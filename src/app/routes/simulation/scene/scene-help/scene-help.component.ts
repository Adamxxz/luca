import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-simulation-scene-help',
  templateUrl: './scene-help.component.html',
})
export class SimulationSceneHelpComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
