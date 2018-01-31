import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '@app/state/app.state';

@Component({
  selector: 'app-form',
  template: `
  <div class="wrapper" *ngIf="formItem$ | async as f">
    <label>Id</label>
    <input type="number" [value]="f.id" disabled/>
    <br>
    <label>Text</label>
    <input type="text" [value]="f.text"/>
    <br>
    <a *ngIf="f.userId" href="#">Go to user</a>
  </div>
  `,
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  formItem$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.formItem$ = this.store.select('formItem');
  }
}
