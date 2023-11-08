import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(v => v.HomeComponent) },
  { path: 'auth/login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'categories', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  { path: 'products', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule) },
  { path: '**', pathMatch:'full',  loadComponent: () => import('./pages/page-not-found/page-not-found.component').then(v => v.PageNotFoundComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
