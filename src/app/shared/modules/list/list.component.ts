import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { listAnimation } from 'src/app/animations/list.animation';

interface ListItem {
  title: string;
  subtitle: string;
  img?: string;
  path?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listAnimation],
})
export class ListComponent {
  @Input() list: ListItem[];
  @Output() itemClick = new Subject<ListItem>();

  constructor() {}

  onItemClicked(e: ListItem) {
    this.itemClick.next(e);
  }
}
