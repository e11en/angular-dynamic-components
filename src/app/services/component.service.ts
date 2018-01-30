/* tslint:disable:forin */
import { Injectable } from '@angular/core';

import { Entity } from '@app/models/entity.model';
import { ListComponent } from '../components/list/list.component';
import { FormComponent } from '../components/form/form.component';

@Injectable()
export class ComponentService {

  jsonData = [
    { entity: 'projects', componentType: 'list', detail: { componentType: 'form' }, data: [
      {id: 1, text: 'some text', userId: 1},
      {id: 2, text: 'some more text', userId: 1},
      {id: 3, text: 'even more text'}
    ]},
    { entity: 'user', componentType: 'form', data: {id: 1, text: 'Some user'} },
    { entity: 'other', componentType: 'list', data: [
      {id: 1, text: 'Some thing'},
      {id: 2, text: 'Some other thing'}
    ] }
  ];

  getAllEntities(): Array<string> {
    const entities = [];
    for (const i in this.jsonData) {
      entities.push(this.jsonData[i].entity);
    }
    return entities;
  }

  getEntity(path: string): Entity {
    for (const i in this.jsonData) {
      const entity = this.jsonData[i];
      if (entity.entity === path) {
        return entity;
      }
    }

    return null;
  }

  getComponent(type: string): any {
    switch (type) {
      case 'list':
        return ListComponent;
      case 'form':
        return FormComponent;
      default:
        return null;
    }
  }

  getData(list: Array<any>, id: string) {
    for (const i in list) {
      const item = list[i];
      if (item.id.toString() === id) {
        return item;
      }
    }
  }
}

