import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-simulation-scene-base',
  templateUrl: './scene-base.component.html',
  styleUrls: ['./scene-base.component.less'],
})
export class SimulationSceneBaseComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
