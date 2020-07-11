import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-simulation-logsim',
  templateUrl: './logsim.component.html',
})
export class SimulationLogsimComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
