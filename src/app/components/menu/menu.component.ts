import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

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

    <p>URL: {{currentUrl}}</p>
    <div class="clear-fix"></div>
  </div>
  `
})
export class MenuComponent implements OnInit {
  menuItems = [];
  currentUrl: string;

  constructor(private componentService: ComponentService,
              private router: Router) { }

  ngOnInit() {
    this.menuItems = this.componentService.getEntityLinks();
    this.currentUrl = this.router.url;

    this.router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        this.currentUrl = event.url;
      }
    });
  }
}
