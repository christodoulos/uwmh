import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { UserRepository } from '@uwmh/state';

@Component({
  selector: 'uwmh-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarMenuComponent {
  constructor(private user: UserRepository) {}
  username$ = this.user.name$;
  userPicture$ = this.user.picture$;
  @Output() menuSelection = new EventEmitter<string>();

  onClick(selection: string) {
    this.menuSelection.emit(selection);
  }
}
