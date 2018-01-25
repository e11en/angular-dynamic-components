import {Component, NgModule, Input, ComponentFactory, ComponentRef, ComponentFactoryResolver,
        ViewContainerRef, ChangeDetectorRef, TemplateRef, ViewChild, Output, EventEmitter, OnDestroy} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {InfoComponent} from './components/info/info.component';
import {FormComponent} from './components/form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  @ViewChild('screenContainer', { read: ViewContainerRef }) container;
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
      case 'FormComponent':
        return FormComponent;
    }
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
