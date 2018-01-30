/* tslint:disable:component-class-suffix */
import { Component, NgModule, ComponentFactory, ComponentRef, ComponentFactoryResolver,
         ViewContainerRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ComponentService } from '@app/services/component.service';
import { Entity } from '@app/models/entity.model';

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
export class ComponentBuilder implements OnInit {
  @ViewChild('main', { read: ViewContainerRef }) container;
  @ViewChild('detail', { read: ViewContainerRef }) detailContainer;
  componentRef: ComponentRef<any>;
  detailComponentRef: ComponentRef<any>;

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

      this.createComponent(urlSegments.pop());
    });
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
    const entity = this.componentService.getEntity(urlSegment.path);
    const component = this.componentService.getComponent(entity.componentType);
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = entity.data;
    this.componentRef.instance.output.subscribe(event => {
      this.router.navigate(['/' + entity.entity, { id: event.id }]);
    });

    if (entity.detail) {
      this.createDetailComponent(entity.detail, urlSegment);

      if (urlSegment.parameters.id) {
        this.componentService.getData(entity, urlSegment.parameters.id).then(data => {
          this.detailComponentRef.instance.data = data;
        });
      }
    }
  }

  createDetailComponent(entity: any, urlSegment: any) {
    this.detailContainer.clear();
    const component = this.componentService.getComponent(entity.componentType);
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.detailComponentRef = this.detailContainer.createComponent(factory);
    this.detailComponentRef.instance.currentUrl = urlSegment;
    this.detailComponentRef.instance.output.subscribe(event => console.log(event));
  }

}
