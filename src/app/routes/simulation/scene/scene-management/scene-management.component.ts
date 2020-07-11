import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-simulation-scene-management',
  templateUrl: './scene-management.component.html',
})
export class SimulationSceneManagementComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
