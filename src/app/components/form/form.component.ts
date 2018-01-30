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
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() data: Array<string>;
  @Output() output = new EventEmitter();

  constructor() { }

}
