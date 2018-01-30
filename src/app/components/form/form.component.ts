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
    <br>
    <a *ngIf="data?.userId" [routerLink]="['users', {id: data?.userId}]">Go to user</a>
  </div>
  `,
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() data: Array<string>;
  @Output() output = new EventEmitter();

  constructor() { }

}
