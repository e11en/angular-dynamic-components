/* tslint:disable:component-class-suffix forin */
import { Component, NgModule, ComponentFactory, ComponentRef, ComponentFactoryResolver,
         ViewContainerRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ListComponent } from '../components/list/list.component';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'app-root',
  template: `
  <style>
    .wrapper { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto 1fr 1fr }
    h1 { text-align: center }
  </style>

  <div class="wrapper">
    <h1>Main component</h1>
    <h1>Detail component</h1>
    <template #list></template>
    <template #detail></template>
  </div>
  `,
  styles: ['.wrapper { background-color: #a1e0c0; }']
})
export class ComponentBuilder implements OnDestroy, OnInit {
  @ViewChild('list', { read: ViewContainerRef }) container;
  @ViewChild('detail', { read: ViewContainerRef }) detailContainer;
  componentRef: ComponentRef<any>;
  detailComponentRef: ComponentRef<any>;
  jsonData = [
    { entity: 'users', componentType: 'form', data: {id: 1, text: 'Some user'} },
    { entity: 'projects', componentType: 'list', detail: { componentType: 'form' }, data: [
      {id: 1, text: 'some text', userId: 1},
      {id: 2, text: 'some more text', userId: 1},
      {id: 3, text: 'even more text'}
    ]}
  ];

  constructor(private resolver: ComponentFactoryResolver,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlSegments) => {
      const inputData = [];

      urlSegments.forEach(segment => {
        inputData.push({path: segment.path, parameters: this.formatParameters(segment.parameters)});
      });

      this.createComponent(urlSegments.pop());
    });
  }

  ngOnDestroy() {
    this.destroyComponents();
  }

  destroyComponents() {
    if (this.componentRef || this.detailComponentRef) { console.log('destroy components'); }
    if (this.componentRef) { this.componentRef.destroy(); }
    if (this.detailComponentRef) { this.detailComponentRef.destroy(); }
  }

  formatParameters(parameters: any) {
    const list = [];
    Object.keys(parameters).forEach(key => {
      list.push({key: key, value: parameters[key]});
    });
    return list;
  }

  createComponent(urlSegment: any) {
    this.destroyComponents();
    this.container.clear();
    const entity = this.getEntity(urlSegment.path);
    if (!entity) { return; }
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.getComponent(entity.componentType));

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = entity.data;
    this.componentRef.instance.output.subscribe(event => {
      this.router.navigate(['/projects', { id: event.id }]);
    });

    if (entity.detail) {
      this.createDetailComponent(entity.detail, urlSegment);

      if (urlSegment.parameters.id) {
        this.detailComponentRef.instance.data = this.getData(entity.data, urlSegment.parameters.id);
      }
    }
  }

  createDetailComponent(entity: any, urlSegment: any) {
    this.detailContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.getComponent(entity.componentType));
    this.detailComponentRef = this.detailContainer.createComponent(factory);
    this.detailComponentRef.instance.currentUrl = urlSegment;
    this.detailComponentRef.instance.output.subscribe(event => console.log(event));
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

class Entity {
  constructor(public entity: string, public componentType: string, public data: any, public detail?: {}) { }
}
