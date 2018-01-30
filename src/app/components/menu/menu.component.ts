import { Component, OnInit } from '@angular/core';

import { ComponentService } from '@app/services/component.service';

@Component({
  selector: 'app-menu',
  styleUrls: ['./menu.component.scss'],
  template: `
  <div class="list">
    <ul>
      <li *ngFor="let menuItem of menuItems;">
        <a [routerLink]="menuItem.link">{{ menuItem.text }}</a>
      </li>
    </ul>
  </div>
  `
})
export class MenuComponent implements OnInit {
  private menuItems = [];

  constructor(private componentService: ComponentService) { }

  ngOnInit() {
    this.menuItems = this.componentService.getEntityLinks();
  }
}
