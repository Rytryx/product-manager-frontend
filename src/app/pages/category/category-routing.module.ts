import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryModifyComponent } from './category-modify/category-modify.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {authGuard} from "../../auth.guard";

const routes: Routes = [
  {
    // Route for listing categories. It uses the CategoryListComponent.
    path: 'list',
    component: CategoryListComponent
  },
  {
    // Route for creating a new category.
    // It lazily loads the CategoryModifyComponent only when the route is activated.
    // This route is protected by an authentication guard.
    path: 'create',
    loadComponent: () => import('./category-modify/category-modify.component').then(v => v.CategoryModifyComponent),
    canActivate: [authGuard]
  },
  {
    // Route for editing an existing category.
    // It uses the CategoryModifyComponent and expects an 'id' parameter in the URL.
    path: 'edit/:id',
    component: CategoryModifyComponent
  },
  {
    // Route for viewing the details of a specific category.
    // It uses the CategoryDetailComponent and expects an 'id' parameter in the URL.
    path: ':id',
    component: CategoryDetailComponent
  }
];

/**
 * NgModule for category-related routing.
 * It imports and configures routes using the RouterModule.forChild method.
 * This is a feature-routing module that contains routes specific to category management.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)], // Configures the router for this module using the defined routes.
  exports: [RouterModule] // Exports RouterModule to make it available throughout the module.
})
export class CategoryRoutingModule { }

