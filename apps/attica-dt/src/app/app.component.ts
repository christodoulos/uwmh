import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter } from 'rxjs';
import { AppService } from './app.service';
import { DTMapService } from './map.service';
import { WelcomeDialogComponent } from './dialogs/welcome-dialog/welcome-dialog.component';
import { UIRepository } from './state';
import { UserRepository } from './state/user';

@UntilDestroy()
@Component({
  selector: 'uwmh-root',
  styleUrls: ['app.component.scss'],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('left') sidenav!: MatSidenav;

  isLoggedIn$ = this.user.isLoggedIn$;
  username$ = this.user.name$;
  userPicture$ = this.user.picture$;
  constructor(
    private mapService: DTMapService,
    private service: AppService,
    private observer: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private ui: UIRepository,
    private user: UserRepository
  ) {}

  ngOnInit() {
    this.ui.setIsLoading(true);
    this.dialog.open(WelcomeDialogComponent);
  }

  ngAfterViewInit() {
    this.observer
      .observe('(max-width: 800px)')
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
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

  async onMapEvent(map: Map) {
    await this.mapService.setupMap(map);
    this.ui.setIsLoading(false);
  }

  attica_bounds() {
    this.service.boundary_zoom();
  }

  rivers() {
    this.service.rivers();
  }

  nursery() {
    this.service.nursery();
  }

  portara() {
    this.service.portara();
  }

  logout() {
    this.service.logout();
  }
}
