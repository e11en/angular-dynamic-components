import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '@app/state/app.state';
import { ComponentService } from '@app/services/component.service';

@Component({
  selector: 'app-list',
  template: `
  <div class="wrapper">
    <ul>
      <li *ngFor="let item of listItems$ | async" (click)="onClick(item)">{{item.id}}: {{item.text}}</li>
    </ul>
  </div>
  `,
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  listItems$: Observable<any[]>;

  constructor(private store: Store<AppState>,
              private componentService: ComponentService) {
    this.listItems$ = this.store.select('listItems');
    this.store.dispatch({type: 'SET_LIST'});
  }

  onClick(item: any) {
    this.store.dispatch({type: 'SET_FORM', payload: item});
  }
}
