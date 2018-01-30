import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentBuilder } from '@app/components/component-builder';
import { MenuComponent } from '@app/components/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    outlet: 'menu'
  },
  {
    path: '**',
    component: ComponentBuilder
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
