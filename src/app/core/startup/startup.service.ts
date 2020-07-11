import {ChangeDetectionStrategy, Inject, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService, _HttpClient} from '@delon/theme';
import { TranslateService } from '@ngx-translate/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { catchError } from 'rxjs/operators';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../i18n/i18n.service';
import set = Reflect.set;

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()

export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private http: _HttpClient,
    private injector: Injector,
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }


  user = {};

  private viaHttp(resolve: any, reject: any) {
    const tokenData = this.tokenService.get();
    this.settingService.user.token = tokenData.token;
    if (!tokenData.token || tokenData.token == 'token invalid') {
      this.injector.get(Router).navigateByUrl('/passport/login');
      resolve({});
      return;
    }
    let user = {};
    this.http.get('/user/info').subscribe((res) => {
      user = {
        id: res.result.id,
        phone: res.result.phone,
        nickname: res.result.nickname,
        name: res.result.name,
        email: res.result.email,
        avatar: './assets/tmp/img/avatar.jpg',
        token: tokenData.token
      };
      this.settingService.setUser(user);
    }, error => this.injector.get(Router).navigateByUrl('/passport/login'));
    // mock

    const app: any = {
      name: `SINOPILOT`,
      description: `The SinoPilot`
    };

    const menu: any = [
        {
          text: '主导航',
          group: true,
          hideInBreadcrumb: true,
          children: [
            {
              text: '首页',
              link: '/index/page',
              icon: 'anticon-home',
            },
            {
              text: '车辆信息',
              icon: 'anticon-car',
              children: [
                {
                  text: '车辆监控',
                  link: '/vehicle/monitor',
                },
                {
                  text: '车辆管理',
                  link: '/vehicle/management',
                },
              ]
            },
            {
              text: '个人信息',
              icon: 'anticon-user',
              link: '/pro/center',

            },
            {
              text: '组织机构',
              link: '/group/group-management',
              icon: 'anticon-team',
            },
            {
              text: 'OTA',
              link: '/ota/otapage',
              icon: 'anticon-cloud-sync',
            },
            {
              text: '仿真平台',
              icon: 'anticon-codepen',
              children: [

                {
                  text: '场景库',
                  children: [
                    {
                      text: '场景概述',
                      link: '/simulation/scene-base',
                    },
                    {
                      text: '编辑',
                      link: '/simulation/edit',
                    },
                    {
                      text: 'Logsim场景',
                      link: '/simulation/logsim',
                    },
                    {
                      text: 'Worldsim场景',
                      link: '/simulation/worldsim',
                    }

                  ]
                },
                {
                  text: '场景分析',
                  link: '/simulation/scene-analysis',
                },
                {
                  text: '场景管理',
                  link: '/simulation/scene-management',
                },
                {
                  text: '任务管理',
                  link: '/simulation/task-management',
                },
                {
                  text: '帮助',
                  link: '/simulation/scene-help',
                },
              ]
            },
            {
              text: '代码库',
              link: '/code/code-management',
              icon: 'anticon-code',
            },
            {
              text: '集群管理',
              link: '/cluster/cluster-management',
              icon: 'anticon-cluster',
            },
            {
              text: '版本管理',
              link: '/version/version-management',
              icon: 'anticon-appstore',
            }

          ]
        }];
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // User information: including name, avatar, email address
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add(menu);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;
    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      // this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      this.viaHttp(resolve, reject);
    });
  }
}
