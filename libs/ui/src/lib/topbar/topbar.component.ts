import {
  EventEmitter,
  ChangeDetectionStrategy,
  Component,
  Output,
} from '@angular/core';
import { UserRepository } from '@uwmh/state';

@Component({
  selector: 'uwmh-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  constructor(private user: UserRepository) {}
  isLoggedIn$ = this.user.isLoggedIn$;
  @Output() topbarSelection = new EventEmitter<string>();
  @Output() quickSelection = new EventEmitter<string>();

  onUserSelection(selection: string) {
    this.topbarSelection.emit(selection);
  }

  onQuickSelection(selection: string) {
    this.quickSelection.emit(selection);
  }
}
