import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'uwmh-quick-navigation',
  templateUrl: './quick-navigation.component.html',
  styleUrls: ['./quick-navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickNavigationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
