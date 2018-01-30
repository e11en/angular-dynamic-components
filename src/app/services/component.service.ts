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

  getData(entity: Entity, id: string) {
    return new Promise((resolve, reject) => {
      entity.data.forEach(item => {
        if (item.id.toString() === id) {
          resolve(item);
        }
      });
    });
  }
}

