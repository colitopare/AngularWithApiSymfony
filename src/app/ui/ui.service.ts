import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UiService {
  loadingState = new Subject<boolean>();

  constructor() {}

  public activateLoading() {
    this.loadingState.next(true);
  }
  public deactivateLoading() {
    this.loadingState.next(false);
  }

  public getInvoiceStatusLabel(status: string) {
    const labels = {
      PAID: "Payée",
      SENT: "Envoyée",
      CANCELLED: "Annulée"
    };

    return labels[status];
  }

  public getInvoiceStatusBadge(status: string) {
    const classes = {
      PAID: "success",
      SENT: "primary",
      CANCELLED: "warning"
    };

    return classes[status];
  }
}
