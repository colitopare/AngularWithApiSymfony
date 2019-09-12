import { Component, OnInit } from "@angular/core";
import { Customer } from "../customer";
import { CustomersService } from "../customers.service";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { UiService } from "src/app/ui/ui.service";

@Component({
  selector: "app-customer-view",
  template: `
    <div class="row" *ngIf="customer">
      <div class="col s5">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h2 class="card-title">
              Détails de {{ customer.firstName }} {{ customer.lastName }}
            </h2>
            <hr />
            <p><strong>Email : </strong> {{ customer.email }}</p>
            <p>
              <strong>Factures : </strong>
              {{ customer.invoices ? customer.invoices.length : O }}
            </p>
            <p>
              <strong>Total facturé : </strong
              >{{ customer.totalamount | currency: "EUR":"symbol" }}
            </p>
            <p>
              <strong>Reste à payer : </strong
              >{{ customer.unpaidamount | currency: "EUR":"symbol" }}
            </p>
            <div class="card-action">
              <a routerLink="/customers" class="waves-effect waves-light btn">
                Revenir à la liste
              </a>
              <a
                routerLink="/customers/{{ customer.id }}/edit"
                class="waves-effect waves-light btn"
              >
                Modifier
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col s7">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h2 class="card-title">Factures de {{ customer.firstName }}</h2>
            <table>
              <thead>
                <tr>
                  <th>Num.</th>
                  <th>Montant</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let i of customer.invoices">
                  <td>{{ i.id }}</td>
                  <td>{{ i.amount | currency: "EUR":"symbol" }}</td>
                  <td>{{ i.sentAt | date: "dd/MM/yyyy" }}</td>
                  <td>
                    <span>{{ getStatusLabel(i.status) }}</span>
                  </td>
                  <td>
                    <a href="" class="btn btn-link">Voir</a>
                    <button class="btn btn-link">Supprimer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CustomerViewComponent implements OnInit {
  customer: Customer;
  constructor(private ui: UiService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Plus besoin car j'utilise un resolver pour récupérer les données du customer
    // this.route.paramMap
    //   .pipe(
    //     map(params => +params.get("id")),
    //     switchMap(id => this.service.find(id))
    //   )
    //   .subscribe(httpCustomer => (this.customer = httpCustomer));

    this.customer = this.route.snapshot.data.apiCustomer;
  }

  getStatusLabel(status: string) {
    return this.ui.getInvoiceStatusLabel(status);
  }

  getStatusClass(status: string) {
    return this.ui.getInvoiceStatusBadge(status);
  }
}
