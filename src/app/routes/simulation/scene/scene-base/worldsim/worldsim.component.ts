import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-simulation-worldsim',
  templateUrl: './worldsim.component.html',
})
export class SimulationWorldsimComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
