import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EYDAP_APN } from '@uwmh/state';

@Component({
  selector: 'uwmh-eydap-analyses-apn-form',
  templateUrl: './eydap-analyses-a-p-n.component.html',
  styleUrls: ['./eydap-analyses-a-p-n.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EydapAnalysesAPNFormComponent implements OnChanges {
  @Output() analysis = new EventEmitter<EYDAP_APN>();
  @Input() analysis_input: EYDAP_APN | undefined;

  id: number | undefined;
  timestamp: Date | undefined;
  form = new FormGroup({
    total_suspended_solids: new FormControl(0, [Validators.required]),
    biochemical_oxygen_demand: new FormControl(0, [Validators.required]),
    total_nitrogen: new FormControl(0, [Validators.required]),
    ammonium: new FormControl(0, [Validators.required]),
    turbidity: new FormControl(0, [Validators.required]),
    total_carbon: new FormControl(0, [Validators.required]),
    electric_conductivity: new FormControl(0, [Validators.required]),
  });

  // prettier-ignore
  ngOnChanges(changes: SimpleChanges): void {
    const analysis = changes['analysis_input'].currentValue;
    if (analysis) {
      this.form = new FormGroup({
        total_suspended_solids: new FormControl(analysis.total_suspended_solids, [Validators.required] ),
        biochemical_oxygen_demand: new FormControl(analysis.biochemical_oxygen_demand, [Validators.required]),
        total_nitrogen: new FormControl(analysis.total_nitrogen, [Validators.required]),
        ammonium: new FormControl(analysis.ammonium, [Validators.required]),
        turbidity: new FormControl(analysis.turbidity, [Validators.required]),
        total_carbon: new FormControl(analysis.total_carbon, [Validators.required]),
        electric_conductivity: new FormControl(analysis.electric_conductivity, [Validators.required]),
      });
      this.id = analysis.id
      this.timestamp = analysis.timestamp
    }
  }

  onSubmit() {
    let timestamp;
    let id;
    if (!this.id || !this.timestamp) {
      // new analysis
      timestamp = new Date();
      id = timestamp.getTime() / 1000;
    } else {
      // edit analysis
      timestamp = this.timestamp;
      id = this.id;
    }
    const measurement = { id, timestamp, ...this.form.value };
    this.analysis.emit(measurement as EYDAP_APN);
  }
}
