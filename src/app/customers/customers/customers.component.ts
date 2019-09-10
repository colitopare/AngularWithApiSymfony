import { Component, OnInit } from "@angular/core";

import { Customer } from "../customer";
import { CustomersService } from "../customers.service";

@Component({
  selector: "app-custumers",
  template: `
    <h2>Liste des clients</h2>

    <a
      routerLink="/customers/new"
      class="btn-floating btn-large waves-effect waves-light red"
      ><i class="material-icons">+</i></a
    >

    <table class="striped">
      <tr class="b-head">
        <th>Id</th>
        <th>Client</th>
        <th>Email</th>
        <th>Factures</th>
        <th></th>
      </tr>

      <tr class="b-body" *ngFor="let customer of customers">
        <td>{{ customer.id }}</td>
        <td>
          {{ customer.firstName }} {{ customer.lastName | uppercase }} <br />
        </td>
        <td>
          {{ customer.email }}
        </td>
        <td>
          {{ customer.invoices.length }}
        </td>

        <td>
          <button class="btn btn-danger btn-sm">Supprimer</button>
        </td>
      </tr>
    </table>
  `,
  styles: []
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private service: CustomersService) {}

  ngOnInit() {
    this.service.findAll().subscribe(customers => (this.customers = customers));
  }
}
