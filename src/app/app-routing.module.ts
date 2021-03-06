import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';


const routes: Routes = [
  { path: 'home', component: ProductDashboardComponent},
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'cart', component: ProductCartComponent},
  { path: 'order', component: ProductOrderComponent},
  { path: '', component: ProductDashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orderHistory', component: OrderHistoryComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
