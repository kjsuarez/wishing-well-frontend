import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router";

import { WishListComponent } from './wishes/wish_list.component'
import { WellComponent } from './wishes/well.component'

const APP_ROUTES: Routes = [
  {path: '', component: WellComponent, pathMatch: 'full'},
  {path: 'wishes', component: WishListComponent}
]

export const routing = RouterModule.forRoot(APP_ROUTES);
