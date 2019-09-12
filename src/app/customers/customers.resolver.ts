import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Customer } from "./customer";

@Injectable({
  providedIn: "root"
})
export class CustomersResolver implements Resolve<Customer[]> {}
