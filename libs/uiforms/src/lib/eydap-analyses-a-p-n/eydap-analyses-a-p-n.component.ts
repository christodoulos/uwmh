import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EYDAP_APN } from '@uwmh/state';

@Component({
  selector: 'uwmh-eydap-analyses-apn-form',
  templateUrl: './eydap-analyses-a-p-n.component.html',
  styleUrls: ['./eydap-analyses-a-p-n.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EydapAnalysesAPNFormComponent {
  @Output() analysis = new EventEmitter<EYDAP_APN>();

  form = new FormGroup({
    total_suspended_solids: new FormControl(0, [Validators.required]),
    biochemical_oxygen_demand: new FormControl(0, [Validators.required]),
    total_nitrogen: new FormControl(0, [Validators.required]),
    ammonium: new FormControl(0, [Validators.required]),
    turbidity: new FormControl(0, [Validators.required]),
    total_carbon: new FormControl(0, [Validators.required]),
    electric_conductivity: new FormControl(0, [Validators.required]),
  });

  onSubmit() {
    const timestamp = new Date();
    const id = timestamp.getTime() / 1000;
    const measurement = { id, timestamp, ...this.form.value };
    this.analysis.emit(measurement as EYDAP_APN);
  }
}
