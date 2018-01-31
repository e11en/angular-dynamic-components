import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '@app/state/app.state';

@Component({
  selector: 'app-list',
  template: `
  <div class="wrapper">
    <ul>
      <li *ngFor="let item of listItems$ | async">{{item.displayValue}}</li>
    </ul>
  </div>
  `,
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  listItems$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.listItems$ = this.store.select('listItems');
    this.store.dispatch({type: 'GET_ALL'});
  }
}
