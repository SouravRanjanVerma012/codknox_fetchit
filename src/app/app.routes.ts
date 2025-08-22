import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginGuard } from './guards/login.guard';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent , canActivate: [LoginGuard]},
  {
    path: 'main',
    component: FullComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./main/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'merchant-service',
        loadComponent: () =>
          import('./main/merchant-service/merchant-service.component').then(
            (m) => m.MerchantServiceComponent
          ),
      },
      // Aliases for merchant management
      {
        path: 'merchant',
        loadComponent: () =>
          import('./main/merchant-service/merchant-service.component').then(
            (m) => m.MerchantServiceComponent
          ),
      },
      {
        path: 'merchant-management',
        loadComponent: () =>
          import('./main/merchant-service/merchant-service.component').then(
            (m) => m.MerchantServiceComponent
          ),
      },
      {
        path: 'user-management',
        loadComponent: () =>
          import('./main/user-management/user-management.component').then(
            (m) => m.UserManagementComponent
          ),
      },
      {
        path: 'order-management',
        loadComponent: () =>
          import('./main/order-management/order-management.component').then(
            (m) => m.OrderManagementComponent
          ),
      },
      {
        path: 'promo-management',
        loadComponent: () =>
          import('./main/promo-management/promo-management.component').then(
            (m) => m.PromoManagementComponent
          ),
      },
      {
        path: 'category-management',
        loadComponent: () =>
          import('./main/categor-management/categor-management.component').then(
            (m) => m.CategorManagementComponent
          ),
      },
      {
        path: 'banner-management',
        loadComponent: () =>
          import('./main/banner-management/banner-management.component').then(
            (m) => m.BannerManagementComponent
          ),
      },
      {
        path: 'setting-management',
        loadComponent: () =>
          import('./main/setting-management/setting-management.component').then(
            (m) => m.SettingManagementComponent
          ),
      },
      {
        path: 'transaction-history',
        loadComponent: () =>
          import(
            './main/transaction-history/transaction-history.component'
          ).then((m) => m.TransactionHistoryComponent),
      },
      {
        path: 'product-category-management',
        loadComponent: () =>
          import(
            './main/product-category-management/product-category-management.component'
          ).then((m) => m.ProductCategoryManagementComponent),
      },
      {
        path: 'Charts',
        loadComponent: () =>
          import(
            './main/charts/charts.component'
          ).then((m) => m.ChartsComponent),
      },
    ],
  },

  { path: 'unauthorized', component: LoginComponent },
  { path: '**', redirectTo: '/login' },
];
