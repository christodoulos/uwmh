import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'uwmh-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
// export class LayoutComponent {
export class LayoutComponent implements AfterViewInit {
  @ViewChild('left') sidenav!: MatSidenav;
  // @ViewChild('right') sidenavRight!: MatSidenav;
  constructor(private observer: BreakpointObserver, private router: Router) {}
  ngAfterViewInit() {
    this.observer
      .observe('(max-width: 800px)')
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          // this.sidenavRight.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          // this.sidenavRight.mode = 'side';
          this.sidenav.open();
          // this.sidenavRight.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
