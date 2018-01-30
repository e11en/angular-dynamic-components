/* tslint:disable:forin */
import { Injectable } from '@angular/core';

import { Entity } from '@app/models/entity.model';
import { ListComponent } from '../components/list/list.component';
import { FormComponent } from '../components/form/form.component';

@Injectable()
export class ComponentService {

  jsonData = [
    { entity: 'users', componentType: 'form', data: {id: 1, text: 'Some user'} },
    { entity: 'projects', componentType: 'list', detail: { componentType: 'form' }, data: [
      {id: 1, text: 'some text', userId: 1},
      {id: 2, text: 'some more text', userId: 1},
      {id: 3, text: 'even more text'}
    ]}
  ];

  constructor() { }

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

