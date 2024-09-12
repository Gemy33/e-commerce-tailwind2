import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { WishlistComponent } from './components/wishlist/wishlist.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'forget',loadComponent:()=>import('./components/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent) },
  {path: 'details/:id',loadComponent:()=>import('./components/product-details/product-details.component').then((c)=>c.ProductDetailsComponent) },
  { path: 'home', component: HomeComponent ,canActivate:[authGuard]},
  { path: 'cart', loadComponent:()=>import('./components/cart/cart.component').then((c)=> c.CartComponent),canActivate:[authGuard]},
  { path: 'brands',loadComponent:()=>import('./components/brands/brands.component').then((c)=>c.BrandsComponent),canActivate:[authGuard] },
  { path: 'catagory', loadComponent:()=>import('./components/catagory/catagory.component').then((c)=>c.CatagoryComponent),canActivate:[authGuard]},
  // { path: 'product/:id_brand',  loadComponent:()=>import('./components/product/product.component').then((c)=>c.ProductComponent) ,canActivate:[authGuard] },
  { path: 'product/:id',  loadComponent:()=>import('./components/product/product.component').then((c)=>c.ProductComponent) ,canActivate:[authGuard] },
  { path: 'product',  loadComponent:()=>import('./components/product/product.component').then((c)=>c.ProductComponent) ,canActivate:[authGuard] },
  { path: 'wishlist',component:WishlistComponent  ,canActivate:[authGuard] },
  { path: 'register', loadComponent:()=>import('./components/register/register.component').then((c)=>c.RegisterComponent)  },
  { path: 'login', loadComponent:()=>import('./components/login/login.component').then((c)=>c.LoginComponent)  },
  { path: 'payment/:Id', loadComponent:()=>import('./components/payment/payment.component').then((c)=>c.PaymentComponent) },
  { path: '**',loadComponent:()=>import('./components/notfound/notfound.component').then((c)=>c.NotfoundComponent) },
];
