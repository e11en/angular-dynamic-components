import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentBuilder } from '@app/component-builder/component-builder.component';
import { MenuComponent } from '@app/components/menu/menu.component';
import { ListComponent } from '@app/components/list/list.component';
import { FormComponent } from '@app/components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentBuilder,
    MenuComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ListComponent, FormComponent]
})
export class AppModule { }
