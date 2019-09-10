import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UiService {
  constructor() {}

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
