import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import {getTemplateUrl} from "codelyzer/util/ngQuery";

@Component({
  selector: 'app-ota-otapage',
  templateUrl: './otapage.component.html',
})
export class OtaOtapageComponent implements OnInit {

  zdxVisible: boolean = false;
  otaItems = [
    {
      title:"ECU控制",
      url:"/ota/calibration", ///ota/calibration
      details:"远程标定，刷写"
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }


  firstClick() {
    this.zdxVisible = !this.zdxVisible;
  }
}
