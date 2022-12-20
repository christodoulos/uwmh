import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EYDAP_APN, EYDAP_APN_ANALYSES_Entities } from '@uwmh/state';

@Component({
  selector: 'uwmh-eydap-analyses-apn-dialog',
  templateUrl: './eydap-analyses-a-p-n.component.html',
  styleUrls: ['./eydap-analyses-a-p-n.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EydapAnalysesAPNDialogComponent implements OnInit {
  today = new Date();
  constructor(private analyses: EYDAP_APN_ANALYSES_Entities) {}

  ngOnInit(): void {
    console.log();
  }

  onAnalysis(analysis: EYDAP_APN) {
    console.log(analysis);
    this.analyses.addAnalysis(analysis);
  }
}
