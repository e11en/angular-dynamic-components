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
    const component = this.componentService.getComponent(entity.componentType);

    // Add the component to the container
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);

    // Set the @Input data of the component
    // this.componentRef.instance.data = entity.data;

    // // Handle the @Output of the component
    // this.componentRef.instance.output.subscribe(event => {
    //   this.router.navigate(['/' + entity.entity, { id: event.id }]);
    // });

    // Add a detail component
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
    const component = this.componentService.getComponent(entity.componentType);
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.detailComponentRef = this.detailContainer.createComponent(factory);
    this.detailComponentRef.instance.currentUrl = urlSegment;
    this.detailComponentRef.instance.output.subscribe(event => console.log(event));
  }

}
