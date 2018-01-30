import { Component, OnInit } from '@angular/core';

import { ComponentService } from '@app/services/component.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private menuItems = [];

  constructor(private componentService: ComponentService) { }

  ngOnInit() {
    this.componentService.getAllEntities().forEach(entity => {
      this.menuItems.push({ text: entity, link: entity });
    });
  }
}
