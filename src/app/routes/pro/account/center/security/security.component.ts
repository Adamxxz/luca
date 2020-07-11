import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {DA_SERVICE_TOKEN, ITokenService} from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { SettingsService } from '@delon/theme';
import {isCheckDisabled, NzModalService} from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-pro-center-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProCenterSecurityComponent implements OnInit, OnDestroy{


  constructor(fb: FormBuilder,
              private modalSrv: NzModalService,
              public msg: NzMessageService,
              private settings: SettingsService,
              private cdr: ChangeDetectorRef,
              public http: _HttpClient,
              private router: Router,
              @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
              ) {

      this.pwdForm = fb.group({
        oldPwd: [null, Validators.required],
        newPwd: [null, [Validators.required, Validators.minLength(6), ProCenterSecurityComponent.checkPwd.bind(this)]],
        confirmPwd: [null, [Validators.required, Validators.minLength(6), ProCenterSecurityComponent.pwdEquar]],
      });
      this.phoneForm = fb.group({
        oldPhone: new FormControl({value: this.oldMobile, disabled: true}),
        newPhone: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
        captcha: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
      });
      modalSrv.closeAll();
  }

  get oldPwd(){
    return this.pwdForm.controls.oldPwd;
  }
  get newPwd(){
    return this.pwdForm.controls.newPwd;
  }

  get newPhone(){
    return this.phoneForm.controls.newPhone;
  }
  get captcha(){
    return this.phoneForm.controls.captcha;
  }
  user: any;
  @Input() pwdVisible = false;
  @Input() phoneVisible = false;
  @Input() error = '';
  @Input() count = 0;
  pwdLoading = false;
  phoneLoading = false;
  pwdForm: FormGroup;
  phoneForm: FormGroup;
  tag: any;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
   pool: 'exception',
  };
  visible = false;
  interval$: any;
  stepTag = 0;
  oldMobile: any;


  static checkPwd(control: FormControl) {
    if (!control) {
      return null;
    }
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }

  static pwdEquar(control: FormControl) {
    if (!control || !control.parent) {
      return null;
    }
    if (control.value !== control.parent.get('newPwd').value) {
      return { equar: true };
    }
    return null;
  }



  ngOnInit(): void {

    this.user = this.settings.user;
    let phone = this.user.phone.toString();
    if (phone){
      phone = phone.replace(phone.substr(3, 4), '****');
    }
    this.oldMobile = phone;
    this.cdr.detectChanges();
  }

  getCaptcha(stepTag) {
    if (this.newPhone.invalid && stepTag == 1) {
      this.newPhone.markAsDirty({ onlySelf: true });
      this.newPhone.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      this.cdr.detectChanges();
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
    let phone = this.settings.user.phone;
    if (stepTag == 1){
      phone = this.phoneForm.value.newPhone;
    }
    this.http.get('/sms/verify/code??_allow_anonymous=true', {
      phone,
    }).subscribe((res: any) => {
      if (res.message !== 'success') {
        this.error = res.message;
        this.msg.error(this.error);
        return;
      }
      if (stepTag == 0){
        this.stepTag = 1;
      }
    });
  }

  pwdChange() {
    this.pwdVisible = true;
  }
  phoneChange(){
    this.phoneVisible = true;
  }

  pwdCancel() {
    this.pwdVisible = false;
  }
  phoneCancel(){
    this.phoneVisible = false;
  }

  stepChange(stepTag: number) {
    this.stepTag = stepTag;
  }

  pwdOk() {
    this.error = '';
    Object.keys(this.pwdForm.controls).forEach((key) => {
      this.pwdForm.controls[key].markAsDirty();
      this.pwdForm.controls[key].updateValueAndValidity();
    });
    if (this.pwdForm.invalid) {
      return;
    }
    this.http.put('/user/modify/pwd', {}, {
      old_pwd: this.oldPwd.value,
      new_pwd: this.newPwd.value,
    }).subscribe(res => {
      if (res.message !== 'success'){
        this.error = '原密码不正确';
        this.cdr.detectChanges();
        return;
      }
      this.pwdLoading = true;
      setTimeout(() => {
        this.pwdVisible = false;
        this.pwdLoading = false;
        this.tokenService.clear();
        this.msg.success('密码修改成功，请重新登录');
        this.router.navigateByUrl('/passport/login');
      }, 1500);

      // this.router

    });

  }

  phoneOk(){

  }


  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }


}
