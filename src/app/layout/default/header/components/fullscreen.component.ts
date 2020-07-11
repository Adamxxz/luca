import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import {nzModalAnimations} from 'ng-zorro-antd';
// import {$, element} from 'protractor';
import * as screenfull from 'screenfull';

@Component({
  selector: 'header-fullscreen',
  template: `
      <i nz-icon [nzType]="status ? 'fullscreen-exit' : 'fullscreen'"></i>
  `,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.d-block]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderFullScreenComponent {
  status = false;
  private static get sf(): screenfull.Screenfull {
    return screenfull as screenfull.Screenfull;
  }

  @HostListener('window:resize')
  _resize() {
    this.status = HeaderFullScreenComponent.sf.isFullscreen;
  }
  @HostListener('click')
  _click() {
    if (HeaderFullScreenComponent.sf.isEnabled) {
      const ele = document.getElementById('my-modal');
      if (ele){
        HeaderFullScreenComponent.sf.request(ele);
      }
      if (this.status){
        HeaderFullScreenComponent.sf.toggle();
      }
    }
  }
}

