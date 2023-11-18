import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

/**
 * Defines the routes for the Angular application.
 */
const routes: Routes = [
  // Redirects the empty path to '/categories/create' (default route).
  { path: '', redirectTo: '/categories/create', pathMatch: 'full' },

  // Lazy loads the HomeComponent when the '/home' path is navigated to.
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(v => v.HomeComponent) },

  // Lazy loads the LoginComponent for the '/auth/login' path.
  { path: 'auth/login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },

  // Lazy loads the RegisterComponent for the '/auth/register' path.
  { path: 'auth/register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },

  // Lazy loads the CategoryModule for any '/categories' path, protected by the authGuard.
  { path: 'categories', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule), canActivate: [authGuard] },

  // Lazy loads the ProductModule for any '/products' path, also protected by the authGuard.
  { path: 'products', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule), canActivate: [authGuard] },

  // Wildcard route for a 404 page, redirects any unknown paths to the PageNotFoundComponent.
  { path: '**', pathMatch: 'full', loadComponent: () => import('./pages/page-not-found/page-not-found.component').then(v => v.PageNotFoundComponent) },
];

/**
 * NgModule that imports and exports RouterModule to handle routing in the application.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configure the router at the application's root level.
  exports: [RouterModule] // Re-exports RouterModule for use in components.
})
export class AppRoutingModule { }
