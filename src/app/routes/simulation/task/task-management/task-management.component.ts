import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-simulation-task-management',
  templateUrl: './task-management.component.html',
})
export class SimulationTaskManagementComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
