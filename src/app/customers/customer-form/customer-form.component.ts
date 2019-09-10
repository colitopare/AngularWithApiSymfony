import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CustomersService } from "../customers.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Customer } from "../customer";
import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-customer-form",
  template: `
    <h2>{{ customer ? "Modifier un client" : "Créer une client" }}</h2>
    <p *ngIf="!customer">
      Utilisez ce formulaire pour ajouter un nouveau client à votre base clients
      !
    </p>
    <p *ngIf="customer">
      Utilisez ce formulaire pour ajouter modifier le client !
    </p>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div>
        <input
          formControlName="firstName"
          [class.is-invalid]="hasViolation('firstName')"
          type="text"
          placeholder="Prénom du client"
        />
        <div class="invalid-feedback" *ngIf="hasViolation('firstName')">
          {{ getViolationMessage("firstName") }}
        </div>
      </div>
      <div>
        <input
          formControlName="lastName"
          [class.is-invalid]="hasViolation('lastName')"
          type="text"
          placeholder="Nom du client"
        />
        <div class="invalid-feedback" *ngIf="hasViolation('lastName')">
          {{ getViolationMessage("lastName") }}
        </div>
      </div>
      <div>
        <input
          formControlName="email"
          [class.is-invalid]="hasViolation('email')"
          type="email"
          placeholder="Email du client"
        />
        <div class="invalid-feedback" *ngIf="hasViolation('email')">
          {{ getViolationMessage("email") }}
        </div>
      </div>

      <div class="alert" *ngIf="error">
        Nous n'avons pas pu sauvegarder votre client, veuillez rééssyer plus
        tard
      </div>

      <button type="submit" class="btn waves-effect waves-light">
        <i class="material-icons right">
          {{ customer ? "Enregistrer les modifications" : "Créer le client" }}
        </i>
      </button>

      <a routerLink="/customers" class="btn btn-link">
        Annuler et revenir à la liste
      </a>
    </form>
  `,
  styles: []
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;
  error = false;
  customer: Customer;

  constructor(
    private service: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initiliazeForm();
    // Nous observons les paramètres de la routes (/customers/id)
    // là c'est pour éditer un customer
    // this.route.paramMap.subscribe(params => {
    //   const id = +params.get("id");
    //   if (id) {
    //     // J'appelle un service
    //     this.service.find(id).subscribe(httpCustomer => {
    //       this.customer = httpCustomer;
    //       this.initiliazeForm();
    //     });
    //   }
    // });

    // Nous observons les paramètres de la route (/customers/__:id__)
    // nous réagissons si ils changent
    this.route.paramMap
      // Transformation de l'observable
      .pipe(
        // On transforme une liste de paramètres en un simple nombre (l'id)
        map(params => +params.get("id")),
        // On transforme l'id en un observable
        switchMap(id => {
          if (id) {
            // Si on a un id, on tranforme en un observable d'un customer
            return this.service.find(id);
          }
          // Sinon on transforme en un observable de undefined
          return of(undefined);
        })
      )
      // On souscrit à l'observable qui va nous donner soit un customer soit undefined
      .subscribe(httpCustomer => {
        this.customer = httpCustomer;
        this.initiliazeForm();
      });
  }

  initiliazeForm() {
    // On gère
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl("")
    });

    if (this.customer)
      this.form.setValue({
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email
      });
  }

  handleHttpError(httpError) {
    // Si ce n'est pas des violations du formulaire
    // plus un problème de connexion / serveur
    if (!httpError.error.violation) {
      this.error = true;
      return;
    }
    this.error = false;
    for (const violation of httpError.error.violations) {
      const { propertyPath, message } = violation;

      this.form.get(propertyPath).setErrors({
        violation: message
      });
    }
  }

  handleSubmit() {
    if (this.customer) {
      //update
      const customer = { ...this.customer, ...this.form.value };
      this.service.update(customer).subscribe(
        () => {
          this.router.navigateByUrl("/customers/" + customer.id);
        },
        httpError => this.handleHttpError(httpError)
      );
    }

    // sinon je create
    this.service.create(this.form.value).subscribe(
      (customer: Customer) => {
        // redirection vers la page du customer
        // /cunstomers/:id
        this.router.navigateByUrl("/customers/" + customer.id);
      },
      httpError => this.handleHttpError(httpError)
    );
  }

  hasViolation(fieldName: string) {
    return this.form.get(fieldName).hasError("violation");
  }

  getViolationMessage(fieldName: string) {
    return this.form.get(fieldName).getError("violation");
  }
}
