import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    <a *ngIf="this.data?.userId" [routerLink]="routerLink">Go to user</a>
  </div>
  `,
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() currentUrl: any;
  @Input() data: Array<any>;
  @Output() output = new EventEmitter();

  routerLink: Array<any>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // There must a better/cleaner way of achieving the same
    if (this.currentUrl && this.data) {
      this.routerLink = [];
      this.routerLink.push(this.currentUrl.path);
      this.routerLink.push(this.currentUrl.parameters);
      this.routerLink.push('users');
      this.routerLink.push({id: this.data.userId});
    }
  }

}
