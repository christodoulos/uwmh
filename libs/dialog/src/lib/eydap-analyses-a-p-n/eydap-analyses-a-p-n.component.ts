import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EYDAP_APN, EYDAP_APN_ANALYSES_Entities } from '@uwmh/state';

@Component({
  selector: 'uwmh-eydap-analyses-apn-dialog',
  templateUrl: './eydap-analyses-a-p-n.component.html',
  styleUrls: ['./eydap-analyses-a-p-n.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EydapAnalysesAPNDialogComponent implements OnInit {
  today = new Date();
  selected = new FormControl(0);
  constructor(private analyses: EYDAP_APN_ANALYSES_Entities) {}

  ngOnInit(): void {
    console.log();
  }

  onAnalysis(analysis: EYDAP_APN) {
    console.log('OOAOAOAOA', analysis, this.selected.value);
    this.analyses.addAnalysis(analysis);
    if (this.selected.value != null)
      this.selected.setValue(this.selected.value + 1);
  }
}
