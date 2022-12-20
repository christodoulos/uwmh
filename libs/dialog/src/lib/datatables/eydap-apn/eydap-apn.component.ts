import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EYDAP_APN, EYDAP_APN_ANALYSES_Entities } from '@uwmh/state';

@Component({
  selector: 'uwmh-eydap-apn',
  templateUrl: './eydap-apn.component.html',
  styleUrls: ['./eydap-apn.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EydapApnComponent implements OnInit {
  constructor(private eydap_apn: EYDAP_APN_ANALYSES_Entities) {}
  dataSource = new MatTableDataSource<EYDAP_APN>();
  displayedColumns: string[] = ['timestamp', 'turbidity'];
  entities$ = this.eydap_apn.allEntities$;
  entities: EYDAP_APN[] = [];

  ngOnInit(): void {
    this.eydap_apn.getAnalyses();
    this.entities$.subscribe((entities) => {
      console.log('LLLLLLLLLLL', entities);
      this.dataSource.data = entities;
      this.entities = entities;
    });
  }
}
