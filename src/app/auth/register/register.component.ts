import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UiService } from "src/app/ui/ui.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register",
  template: `
    <h2>Créer un compte</h2>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div>
        <input
          formControlName="email"
          type="email"
          placeholder="Adresse email"
        />
        <p *ngIf="email.hasError('violation')">
          {{ email.getError("violation") }}
        </p>
      </div>

      <div>
        <input
          formControlName="password"
          type="password"
          placeholder="Mot de passe"
        />
        <p *ngIf="password.hasError('violation')">
          {{ password.getError("violation") }}
        </p>
      </div>
      <div>
        <input
          formControlName="avatar"
          type="url"
          placeholder="Url de votre avatar"
        />
        <p *ngIf="avatar.hasError('violation')">
          {{ avatar.getError("violation") }}
        </p>
      </div>
      <button type="submit" class="btn btn-success">Inscription !</button>
    </form>
  `,
  styles: []
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("", []),
    avatar: new FormControl("", [])
  });
  constructor(
    private service: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {}

  // Ecriture simple de getter à partir de ES6
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  get avatar() {
    return this.form.get("avatar");
  }

  handleSubmit() {
    this.ui.activateLoading;
    this.service.register(this.form.value).subscribe(
      result => {
        this.ui.deactivateLoading();
        this.router.navigateByUrl("/login");
      },
      (httpError: HttpErrorResponse) => {
        this.ui.deactivateLoading();
        if (httpError.status === 400) {
          // violations
          const violations: Violation[] = httpError.error.violations;
          // identique avec des écritures différentes
          // const violations = httpError.error.violations as Violation[];

          // Permet de passer les violations au bon champ du formulaire
          for (let apoViolation of violations) {
            this.form.get(apoViolation.propertyPath).setErrors({
              violation: apoViolation.message
            });
          }
          return;
        }
        // autre soucis
      }
    );
  }
}

export interface Violation {
  propertyPath: string;
  message: string;
}
