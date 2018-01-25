import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private menuItems = [
    {text: 'form', component: 'InfoComponent'},
    {text: 'info', link: 'info'}
  ];

  constructor() { }
}
