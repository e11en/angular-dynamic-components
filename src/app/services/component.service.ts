/* tslint:disable:forin */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/state/app.state';

import { Entity } from '@app/models/entity.model';

@Injectable()
export class ComponentService {

  constructor(private store: Store<AppState>) {  }

  jsonData = [
    { entity: 'projects', componentType: 'list', detail: { componentType: 'form' }, data: [
      {id: 1, text: 'some text', userId: 1},
      {id: 2, text: 'some more text', userId: 2},
      {id: 3, text: 'even more text'}
    ]},
    { entity: 'projects2', componentType: 'list', detail: { componentType: 'form' }, data: [
      {id: 1, text: 'some other text', userId: 1},
      {id: 2, text: 'some more other text', userId: 2},
      {id: 3, text: 'even more other text'}
    ]},
    // { entity: 'users', componentType: 'form', data: [
    //   {id: 1, text: 'Some user'},
    //   {id: 2, text: 'Some other user'}
    // ]},
    // { entity: 'other', componentType: 'list', data: [
    //   {id: 1, text: 'Some thing'},
    //   {id: 2, text: 'Some other thing'}
    // ] }
  ];

  getEntityLinks(): Array<string> {
    const entities = [];
    for (const i in this.jsonData) {
      const entity = this.jsonData[i].entity;
      entities.push({ text: entity, link: entity });
    }
    return entities;
  }

  getEntity(name: string): Entity {
    for (const i in this.jsonData) {
      const entity = this.jsonData[i];
      if (entity.entity === name) {
        return entity;
      }
    }
    return null;
  }

  getData(entity: Entity, id?: string) {
    if (id == null) {
      this.store.dispatch({type: 'SET_LIST', payload: entity.data});
    }

    entity.data.forEach(item => {
      if (item.id.toString() === id) {
        this.store.dispatch({type: 'SET_FORM', payload: entity.data});
      }
    });
  }
}

