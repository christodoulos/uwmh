import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'uwmh-quick-navigation',
  templateUrl: './quick-navigation.component.html',
  styleUrls: ['./quick-navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickNavigationComponent {
  @Output() quickSelection = new EventEmitter<string>();

  onClick(selection: string) {
    this.quickSelection.emit(selection);
  }
}
