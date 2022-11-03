import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UIRepository } from '../../state';

@Component({
  selector: 'uwmh-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeDialogComponent {
  constructor(private ui: UIRepository) {}
  is_loading$ = this.ui.is_loading$;
}
