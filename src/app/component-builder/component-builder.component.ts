/* tslint:disable:component-class-suffix forin */
import {Component, NgModule, Input, ComponentFactory, ComponentRef, ComponentFactoryResolver,
        ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {ListComponent} from '../components/list/list.component';
import {FormComponent} from '../components/form/form.component';

@Component({
  selector: 'app-root',
  template: `
  <style>
    .wrapper { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto auto 1fr 1fr }
  </style>

  <div class="wrapper">
    <h1>Main component</h1>
    <h1>Detail component</h1>
    <template #screen></template>
    <template #detail></template>
  </div>
  `,
  styles: ['.wrapper { background-color: #a1e0c0; }']
})
export class ComponentBuilder implements OnDestroy, OnInit {
  @ViewChild('screen', { read: ViewContainerRef }) container;
  @ViewChild('detail', { read: ViewContainerRef }) detailContainer;
  componentRef: ComponentRef<any>;
  detailComponentRef: ComponentRef<any>;
  jsonData = [
    { entity: 'users', componentType: 'form', data: {id: 1, text: 'Some user'} },
    { entity: 'projects', componentType: 'list', detail: { componentType: 'form' }, data: [
      {id: 1, text: 'some text'},
      {id: 2, text: 'some more text'},
      {id: 3, text: 'even more text'}
    ]}
  ];

  constructor(private resolver: ComponentFactoryResolver,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlSegments) => {
      const inputData = [];

      urlSegments.forEach(segment => {
        inputData.push({path: segment.path, parameters: this.formatParameters(segment.parameters)});
      });

      this.createComponent(urlSegments.pop().path);
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

  formatParameters(parameters) {
    const list = [];
    Object.keys(parameters).forEach(key => {
      list.push({key: key, value: parameters[key]});
    });
    return list;
  }

  createComponent(path) {
    this.destroyComponents();
    this.container.clear();
    const entity = this.getEntity(path);
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.getComponent(entity.componentType));

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = entity.data;
    this.componentRef.instance.output.subscribe(event => {
      console.log(event);
      if (this.detailComponentRef) {
        this.detailComponentRef.instance.data = event;
      }
    });

    if (entity.detail) {
      this.createDetailComponent(entity.detail);
    }
  }

  createDetailComponent(entity) {
    this.detailContainer.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.getComponent(entity.componentType));

    this.detailComponentRef = this.detailContainer.createComponent(factory);
    this.detailComponentRef.instance.output.subscribe(event => console.log(event));
  }

  getEntity(path) {
    for (const i in this.jsonData) {
      const entity = this.jsonData[i];
      if (entity.entity === path) {
        return entity;
      }
    }

    return null;
  }

  getComponent(type) {
    switch (type) {
      case 'list':
        return ListComponent;
      case 'form':
        return FormComponent;
      default:
        return null;
    }
  }

}
