import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { RouteState } from '@app/state/app.state';
import { ComponentService } from '@app/services/component.service';

@Component({
  selector: 'app-big',
  template: `
      TEST COMPONENT

      <div *ngFor="let component of data">

        <!-- {{component.type}}: {{component.label}}: {{component.value}} -->

        <label>{{component.label}}</label>
        <input *ngIf="component.type === 'input-text'" type="text" [value]="component.value" [attr.maxlength]="component.maxlength"/>
        <input *ngIf="component.type === 'input-number'" type="number" [value]="component.value" [attr.maxlength]="component.maxlength"/>
        <input *ngIf="component.type === 'input-password'" type="password" [value]="component.value" [attr.maxlength]="component.maxlength"/>
      </div>
  `,
  styleUrls: ['./big.component.scss']
})
export class BigComponent {
  metaData: Observable<any>;
  data: Array<any>;

  constructor(private store: Store<RouteState>) {
    this.metaData = this.store.select('metaData');

    this.metaData.subscribe(data => {
      this.convert(data);
    });
  }

  convert(data: Array<any>) {
    if (!data) { return; }
    this.data = [];

    data.forEach(value => {
      this.data.push(value);
    });
  }

}
