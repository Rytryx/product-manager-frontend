import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryModifyComponent } from './category-modify/category-modify.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {authGuard} from "../../auth.guard";

const routes: Routes = [
  {
    path: 'list',
    component: CategoryListComponent
  },
  {
    path: 'create',
    loadComponent: () => import('./category-modify/category-modify.component').then(v => v.CategoryModifyComponent),
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: CategoryModifyComponent
  },
  {
    path: ':id',
    component: CategoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
