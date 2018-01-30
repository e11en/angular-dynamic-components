import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
  <div class="wrapper">
    <ul>
      <li *ngFor="let item of data" (click)="output.next(item)">{{item.id}}: {{item.text}}</li>
    </ul>
  </div>
  `,
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() data: Array<string>;
  @Output() output = new EventEmitter();

  constructor() { }

}
