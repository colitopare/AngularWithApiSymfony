import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Customer } from "./customer";
import { Observable } from "rxjs";
import { CustomersService } from "./customers.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CustomerResolver implements Resolve<Customer> {
  constructor(private service: CustomersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Customer | Observable<Customer> | Promise<Customer> {
    const id = +route.paramMap.get("id");
    return this.service.find(id);
  }
}
