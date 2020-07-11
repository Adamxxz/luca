import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { zip } from 'rxjs';

@Component({
  selector: 'app-pro-center-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProCenterBaseComponent implements OnInit {
  constructor(private http: _HttpClient,
              private cdr: ChangeDetectorRef,
              private msg: NzMessageService,
              private settings: SettingsService) {}
  avatar = '';
  userLoading = true;
  user: any;

  // #region geo

  provinces: any[] = [];
  cities: any[] = [];

  ngOnInit(): void {
      this.user = this.settings.user;
      console.log(this.user);
      const phone = this.user.phone.toString();
      if (phone){
        this.user.phone = phone.replace(phone.substr(3, 4), '****');
      }
      this.cdr.detectChanges();
  }

  choProvince(pid: string, cleanCity = true) {
    this.http.get(`/geo/${pid}`).subscribe((res: any) => {
      this.cities = JSON.parse(res);
      if (cleanCity) {
        this.user.geographic.city.key = '';
      }
      this.cdr.detectChanges();
    });
  }

  // #endregion
}
