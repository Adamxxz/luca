import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import {CacheService } from '@delon/cache';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-default__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="userMenu"
    >
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
        <span id="pageUsername">{{settings.user.name}}</span>
    </div>
    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <div nz-menu-item routerLink="/pro/center">
          <i nz-icon nzType="user" class="mr-sm"></i>
          {{ '个人中心' | translate }}
        </div>
        <li nz-menu-divider></li>
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout" class="mr-sm"></i>
          {{ '登出' | translate }}
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent{
  constructor(
    public settings: SettingsService,
    private router: Router,
    public cache: CacheService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
  }
  logout() {
    this.tokenService.clear();
    this.cache.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
