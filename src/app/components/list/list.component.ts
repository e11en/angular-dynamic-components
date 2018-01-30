import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
  <div class="wrapper">
    <ul *ngFor="let item of data">
      <li (click)="output.next(item)">{{item.id}}: {{item.text}}</li>
    </ul>
  </div>
  `,
  styles: ['.wrapper { background-color: #a1a1e0; }', 'li:hover { color: grey; cursor: pointer; }']
})
export class ListComponent {
  @Input() data: Array<string>;
  @Output() output = new EventEmitter();

  constructor() { }

}
