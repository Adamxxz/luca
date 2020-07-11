import {ChangeDetectionStrategy, Component, Inject, OnDestroy, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StartupService} from '@core';
import {ReuseTabService} from '@delon/abc/reuse-tab';
import {DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService} from '@delon/auth';
import {SettingsService, _HttpClient} from '@delon/theme';
import {environment} from '@env/environment';
import { NzNotificationService } from 'ng-zorro-antd';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
      remember: [false],
    });
    modalSrv.closeAll();
  }


  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  get remember(){
    return this.form.controls.remember;
  }
  form: FormGroup;
  error = '';
  type = 0;
  // @ts-ignore

  // #region get captcha

  interval$: any;
  count = 0;

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);

    this.http.get('/sms/verify/code??_allow_anonymous=true', {
      phone: this.form.value.mobile,
    }).subscribe((res: any) => {
      if (res.message !== 'success') {
        this.error = res.message;
        return;
    }
    });
  }

  // #endregion

  submit() {
    this.error = '';
    let data = {};
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      data = {
        type: 1,
        name: this.userName.value,
        pwd: this.password.value,
      };
      if (this.userName.invalid || this.password.invalid) {
        return;
      }
    } else {
      data = {
        type: 2,
        phone : this.mobile.value,
        code : this.captcha.value,
      };
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) {
        return;
      }
    }
    this.tokenService.clear();
    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http
      .get('/user/login?_allow_anonymous=true', data)
      .subscribe((res: any) => {
        if (res.message !== 'success') {
          this.error = res.message;
          return;
        }
        // 清空路由复用信息
        // this.reuseTabService.clear();
        // 设置用户Token信息
        // this.settingsService.user.name = this.userName.value ||this.mobile.value;
        this.tokenService.set(res.result);
        let user = {};
        this.http.get('/user/info').subscribe((res) => {
          user = {
            id: res.result.id,
            phone: res.result.phone,
            nickname: res.result.nickname,
            name: res.result.name,
            email: res.result.email,
            avatar: './assets/tmp/img/avatar.jpg',
            token: this.tokenService.get().token
          };
          this.settingsService.setUser(user);
        });

        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        // 由于和http异步的关系，需要在http完成之后再加载页面，防止因用户变化产生数据更新不及时的问题
        setTimeout(() => {
          this.startupSrv.load().then(() => {
            let url = this.tokenService.referrer.url || '/';
            if (url.includes('/passport')) {
              url = '/';
            }
            this.router.navigateByUrl(url);
          });
        }, 500);
      });

  }

  // #region social

  open(type: string, openType: SocialOpenType = 'href') {
    let url = ``;
    let callback = ``;
    // tslint:disable-next-line: prefer-conditional-expression
    if (environment.production) {
      callback = 'https://ng-alain.github.io/ng-alain/#/callback/' + type;
    } else {
      callback = 'http://localhost:4200/#/callback/' + type;
    }
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window',
        })
        .subscribe((res) => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href',
      });
    }
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
