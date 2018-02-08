import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { ComponentService } from '@app/services/component.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentBuilder } from '@app/components/component-builder';
import { MenuComponent } from '@app/components/menu/menu.component';
import { ListComponent } from '@app/components/list/list.component';
import { FormComponent } from '@app/components/form/form.component';
import { BigComponent } from '@app/components/big/big.component';

import { listReducer } from '@app/components/list/list.reducer';
import { formReducer } from '@app/components/form/form.reducer';
import { metaDataReducer } from '@app/state/route.reducer';

@NgModule({
  declarations: [
    AppComponent,
    ComponentBuilder,
    MenuComponent,
    ListComponent,
    FormComponent,
    BigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      formItem: formReducer,
      listItems: listReducer,
      metaData: metaDataReducer
    })
  ],
  providers: [ComponentService],
  bootstrap: [AppComponent],
  entryComponents: [ListComponent, FormComponent]
})
export class AppModule { }
