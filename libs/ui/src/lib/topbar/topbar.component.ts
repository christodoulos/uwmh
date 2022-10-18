import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'uwmh-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {
  @Input() brand = 'Attica Digital Twin';
  @Output() menuClick = new EventEmitter();

  onMenuClick() {
    this.menuClick.emit();
  }
}
