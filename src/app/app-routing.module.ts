import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from '@app/components/form/form.component';
import { InfoComponent } from '@app/components/info/info.component';
import { MenuComponent } from '@app/components/menu/menu.component';
import { ScreenComponent } from '@app/components/screen/screen.component';

const routes: Routes = [
  {
    path: '',
    component: ScreenComponent
  },
  {
    path: '',
    component: MenuComponent,
    outlet: 'menu'
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
