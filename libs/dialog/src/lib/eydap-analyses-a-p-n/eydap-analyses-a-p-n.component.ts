import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EYDAP_APN, EYDAP_APN_ANALYSES_Entities } from '@uwmh/state';

@Component({
  selector: 'uwmh-eydap-analyses-apn-dialog',
  templateUrl: './eydap-analyses-a-p-n.component.html',
  styleUrls: ['./eydap-analyses-a-p-n.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EydapAnalysesAPNDialogComponent {
  today = new Date();
  constructor(private analyses: EYDAP_APN_ANALYSES_Entities) {}

  onAnalysis(analysis: EYDAP_APN) {
    console.log(analysis);
    this.analyses.addAnalysis(analysis);
  }
}
