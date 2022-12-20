import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { PNPLC, PNPLCEntities } from '@uwmh/state';

import * as XLSX from 'xlsx';

@Component({
  selector: 'uwmh-plant-nursery-plc',
  templateUrl: './plant-nursery-plc.component.html',
  styleUrls: ['./plant-nursery-plc.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlantNurseryPlcComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'ts',
    'col3',
    'col4',
    'col5',
    'col6',
    'col7',
    'col8',
    'col9',
    'col10',
    'col11',
  ];
  dataSource = new MatTableDataSource<PNPLC>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  plcEntities$ = this.pnPLC.allEntities$;
  entities: PNPLC[] = [];
  constructor(private pnPLC: PNPLCEntities) {}

  ngOnInit(): void {
    this.plcEntities$.subscribe((entities) => {
      this.dataSource.data = entities.sort(() => {
        return -1;
      });
      this.entities = entities;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  exportExcell(): void {
    const excelobj = this.entities.map((item) => ({
      timestamp: item.ts,
      'Temperature membrane tank 5': item.col3,
      'LT1 (pH membrane tank 5)': item.col4,
      'DO ppm LDO aeriation tank 4A': item.col5,
      'DO ppm anoxic tank3': item.col6,
      'MLSS SOLID mg/l membrane tank 5': item.col7,
      'MLSS SOLID mg/l membrane tank 4A': item.col8,
      'LDO DO ppm anoxic': item.col9,
      'Temperature anoxic tank': item.col10,
      'Turbidity NTU tank 10': item.col11,
    }));
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelobj);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFileXLSX(wb, 'plant_nursery_plc.xlsx');
  }
}
