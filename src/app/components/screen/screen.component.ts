import {Component, NgModule, Input, ComponentFactory, ComponentRef, ComponentFactoryResolver,
        ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter, OnDestroy} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {InfoComponent} from '../info/info.component';

@Component({
  selector: 'app-screen',
  template: `
    <div class="list">
      <ul>
        <li (click)="createComponent('InfoComponent', 'doei')">Create info component</li>
      </ul>
    </div>

    <div class="wrapper">
      <template #alertContainer></template>
    </div>
  `,
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnDestroy {
  @ViewChild('alertContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {}

  createComponent(component, data) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(this.getComponent(component));

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.data = data;
    this.componentRef.instance.output.subscribe(event => console.log(event));
  }

  getComponent(name) {
    switch (name) {
      case 'InfoComponent':
        return InfoComponent;
    }
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
