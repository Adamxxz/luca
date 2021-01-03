import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  OnDestroy
} from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
// import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'app-code-management',
  templateUrl: './code-management.component.html',
  styleUrls: ['./code-management.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeManagementComponent implements AfterViewInit, OnDestroy {
  private resize$: Subscription;
  private router$: Subscription;
  mode = 'horizontal';
  title: string;
  user: any;
  menus: any[] = [
    {
      key: 'compilation',
      title: '远程编译',
    },
    {
      key: 'brushing',
      title: '远程刷写',
    },
  ];

  constructor(private router: Router,
              private cdr: ChangeDetectorRef,
              private el: ElementRef) {
    this.router$ = this.router.events.pipe(filter(e => e instanceof ActivationEnd)).subscribe(() => this.setActive());
  }

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    this.menus.forEach(i => {
      i.selected = i.key === key;
    });
    this.title = this.menus.find(w => w.selected).title;
  }

  to(item: any) {
    this.router.navigateByUrl(`/code/code-management/${item.key}`);
  }

  private resize() {
    const el = this.el.nativeElement as HTMLElement;
    let mode = 'vertical';
    const { offsetWidth } = el;
    if (offsetWidth < 641 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    if (window.innerWidth < 768 && offsetWidth > 400) {
      mode = 'horizontal';
    }
    this.mode = mode;
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.resize$ = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.resize());
  }

  ngOnDestroy(): void {
    this.resize$.unsubscribe();
    this.router$.unsubscribe();
  }
}
