import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getStore } from '@ngneat/elf';
import { Map } from 'mapbox-gl';
import { DTMapService } from '@uwmh/mapbox';
import { UIRepository } from '@uwmh/state';
import { DTDialogService } from '@uwmh/dialog';
import { UIService } from '../ui.service';

@Component({
  selector: 'uwmh-atticadt',
  templateUrl: './atticadt.component.html',
  styleUrls: ['./atticadt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtticadtComponent implements OnInit {
  constructor(
    private mapService: DTMapService,
    private ui: UIRepository,
    private dialog: DTDialogService,
    private service: UIService
  ) {}

  ngOnInit(): void {
    this.ui.setIsLoading(true);
    this.dialog.openDialog('welcome-dialog');
  }

  async onMapEvent(map: Map) {
    await this.mapService.setupMap(map);
    this.ui.setIsLoading(false);
  }

  onUserSelection(selection: string) {
    switch (selection) {
      case 'logout':
        this.logout();
        break;
      case 'attica-region':
        this.service.boundary_zoom();
        break;
      case 'attica-rivers':
        this.service.rivers();
        break;
      case 'plant-nursery':
        this.service.nursery();
        break;
      case 'ellinikon':
        this.service.ellinikon();
        break;
      case 'eydap-apn':
        this.eydap_analyses();
        break;
      default:
        break;
    }
  }

  logout() {
    const user = getStore('user');
    user?.reset();
    localStorage.removeItem('access_token');
  }

  eydap_analyses() {
    const ref = this.dialog.openDialog('eydap-analyses-a-p-n');
    ref.then((dialog) =>
      dialog.afterClosed().subscribe(() => {
        const eydap = getStore('eydap-apn-analyses');
        eydap?.reset();
      })
    );
  }
}
