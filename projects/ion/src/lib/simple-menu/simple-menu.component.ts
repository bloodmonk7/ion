import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabInGroup } from '../tab-group/tab-group.component';
import { SafeAny } from '../utils/safe-any';

interface MenuProfile {
  imageUrl: string;
  name: string;
}
export interface SimpleMenuProps {
  options: TabInGroup[];
  profile: MenuProfile;
  selected?: EventEmitter<TabInGroup>;
  logoutClick?: EventEmitter<SafeAny>;
}

@Component({
  selector: 'ion-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
})
export class SimpleMenuComponent {
  @Input() options: SimpleMenuProps['options'];
  @Input() profile: SimpleMenuProps['profile'];

  @Output() selected = new EventEmitter<TabInGroup>();
  @Output() logoutClick = new EventEmitter();

  public open = false;

  private timeToAutoClose = 1000;
  private menuTimeout: ReturnType<typeof setTimeout>;

  changeTab(tabSelected: TabInGroup) {
    this.selected.emit(tabSelected);
  }

  dismissMenu() {
    this.menuTimeout = setTimeout(() => {
      this.open = false;
    }, this.timeToAutoClose);
  }

  openMenu() {
    clearTimeout(this.menuTimeout);
    this.open = true;
  }

  logout() {
    this.logoutClick.emit();
  }
}
