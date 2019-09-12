import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { CustomersModule } from "./customers/customers.module";
import { CustomersComponent } from "./customers/customers/customers.component";
import { CustomerFormComponent } from "./customers/customer-form/customer-form.component";
import { CustomerViewComponent } from "./customers/customer-view/customer-view.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./auth/auth.guard";
import { Error404Component } from "./error404/error404.component";

const routes: Routes = [
  {
    path: "customers/new",
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customers/:id/edit",
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customers/:id",
    component: CustomerViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customers",
    component: CustomersComponent,
    canActivate: [AuthGuard]
  },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/customers", pathMatch: "full" },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CustomersModule,
    HttpClientModule,
    AuthModule
  ],
  exports: [RouterModule],
  declarations: [Error404Component]
})
export class AppRoutingModule {}
