import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: '',redirectTo: '/categories/create',pathMatch: 'full'},
  {path: 'home',loadComponent: () => import('./pages/home/home.component').then(v => v.HomeComponent)},
  {path: 'auth/login',loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)},
  {path: 'auth/register',loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)},
  {path: 'categories',loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),canActivate: [authGuard]},
  {path: 'products',loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),canActivate: [authGuard]},
  {path: '**',pathMatch:'full',loadComponent: () => import('./pages/page-not-found/page-not-found.component').then(v => v.PageNotFoundComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
