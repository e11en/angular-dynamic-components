import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
  <div class="wrapper">
    <label>Id</label>
    <input type="number" [value]="data?.id" disabled/>
    <br>
    <label>Text</label>
    <input type="text" [value]="data?.text"/>
  </div>
  `,
  styles: ['.wrapper { background-color: #e48484; margin-top: 1em; }']
})
export class FormComponent {
  @Input() data: Array<string>;
  @Output() output = new EventEmitter();

  constructor() { }

}
