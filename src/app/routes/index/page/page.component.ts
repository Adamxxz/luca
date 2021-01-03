 import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import { SFSchema } from '@delon/form';
import {ModalHelper, SettingsService, _HttpClient} from '@delon/theme';
import {element} from "protractor";

@Component({
  selector: 'app-index-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexPageComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];
  indexImgs = [1, 2, 3, 4];
  indexInfo = [
    ["OTA","云端","/ota/otapage"],
    ["DATA","数据","/vehicle/monitor"],
    ["SIMULATION","仿真平台","/simulation/scene-base"],
    ["VEHICLE","车辆管理","/vehicle/management"]
  ];

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              public settings: SettingsService,
              private  cdr: ChangeDetectorRef,
              @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
  }

  ngOnInit() {
    if(!this.settings.user.isMobile){
      let page = document.getElementsByClassName("alain-default__content");
      let aside = document.getElementsByClassName("alain-default__aside");
      // console.log("content",page);
      // console.log("aside",aside);
      // page[0]. = 200;
    }


    // document.location.reload();

  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
