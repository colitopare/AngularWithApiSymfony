import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomersComponent } from "./customers/customers.component";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerViewComponent } from "./customer-view/customer-view.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerFormComponent,
    CustomerViewComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class CustomersModule {}
