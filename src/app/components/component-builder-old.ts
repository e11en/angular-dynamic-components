/* tslint:disable:component-class-suffix */
import { Component, NgModule, ComponentFactory, ComponentRef, ComponentFactoryResolver,
         ViewContainerRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ComponentService } from '@app/services/component.service';
import { Entity } from '@app/models/entity.model';
import { ListComponent } from '../components/list/list.component';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'app-root',
  styles: [`
    .wrapper {
      background-color: #a1e0c0;
      display: grid; grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto 1fr 1fr;
    }

    h1 { text-align: center }
  `],
  template: `
  <div class="wrapper">
    <h1>Main component</h1>
    <h1>Detail component</h1>
    <template #main></template>
    <template #detail></template>
  </div>
  `
})
export class ComponentBuilderOLD implements OnInit {
  @ViewChild('main', { read: ViewContainerRef }) container;
  @ViewChild('detail', { read: ViewContainerRef }) detailContainer;
  componentRef: ComponentRef<any>;
  detailComponentRef: ComponentRef<any>;
  components: Array<any> = [];

  constructor(private resolver: ComponentFactoryResolver,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private componentService: ComponentService) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlSegments) => {
      const inputData = [];

      urlSegments.forEach(segment => {
        inputData.push({path: segment.path, parameters: this.formatParameters(segment.parameters)});
      });

      // Create the component from the last url segment
      this.createComponent(urlSegments.pop());
    });
  }

  formatParameters(parameters: any) {
    const list = [];
    Object.keys(parameters).forEach(key => {
      list.push({key: key, value: parameters[key]});
    });
    return list;
  }

  createComponent(urlSegment: any) {
    // Start with a clean slate
    this.container.clear();
    this.detailContainer.clear();

    // Get the component based on the url path
    const entity = this.componentService.getEntity(urlSegment.path);
    const component = this.getComponent(entity.componentType);

    // Create a new component or re-use another one
    this.createOrReuseComponent(component);

    this.componentService.getData(entity);

    // Add a detail component
    if (entity.detail) {
      this.createDetailComponent(entity.detail, urlSegment);
    }
  }

  createDetailComponent(entity: any, urlSegment: any) {
    const component = this.getComponent(entity.componentType);
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.detailComponentRef = this.detailContainer.createComponent(factory);
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

  createOrReuseComponent(component: any) {
    let compRef = null;
    for (let i = 0; i < this.components.length; i++) {
      const comp = this.components[i];
      if (comp.name === component.name) {
        console.log('re-use component');
        compRef = comp;
      }
    }

    if (!compRef) {
      // Add the component to the container
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
      this.componentRef = this.container.createComponent(factory);
      this.components.push(this.componentRef.componentType);
    } else {
      this.componentRef = compRef;
    }
  }

}
