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
  edit_analysis: EYDAP_APN | undefined;
  constructor(private analyses: EYDAP_APN_ANALYSES_Entities) {}

  ngOnInit(): void {
    this.analyses.getAnalyses();
    console.log();
  }

  onAnalysis(analysis: EYDAP_APN) {
    this.analyses.addAnalysis(analysis);
    if (this.selected.value != null)
      this.selected.setValue(this.selected.value + 1);
  }

  onEditRow(row: EYDAP_APN) {
    this.edit_analysis = row;
    this.selected.setValue(2);
  }

  onEditAnalysis(analysis: EYDAP_APN) {
    this.analyses.updateAnalysis(analysis);
    this.selected.setValue(1);
  }
}
