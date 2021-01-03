import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-ota-calibration',
  templateUrl: './calibration.component.html',
})
export class OtaCalibrationComponent implements OnInit {
  innerWidth = window.innerWidth*0.8;
  innerHeight = window.innerHeight*0.8;
  constructor(private http: _HttpClient) { }

  ngOnInit() {
  }

}
