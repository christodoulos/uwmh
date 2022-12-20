import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'uwmh-eydap-analyses-apn',
  templateUrl: './eydap-analyses-a-p-n.component.html',
  styleUrls: ['./eydap-analyses-a-p-n.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EydapAnalysesAPNComponent {
  @Output() meassurement = new EventEmitter<any>();

  form = new FormGroup({
    total_suspended_solids: new FormControl('', [Validators.required]),
    biochemical_oxygen_demand: new FormControl('', [Validators.required]),
    total_nitrogen: new FormControl('', [Validators.required]),
    ammonium: new FormControl('', [Validators.required]),
    turbidity: new FormControl('', [Validators.required]),
    total_carbon: new FormControl('', [Validators.required]),
    electric_conductivity: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const measurement = { timestamp: new Date(), ...this.form.value };
    this.meassurement.emit(measurement);
  }
}
