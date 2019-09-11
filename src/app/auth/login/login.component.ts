import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  template: `
    <h2>Connecter vous à l'application</h2>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div>
        <input
          formControlName="username"
          type="text"
          placeholder="username"
          [class.is-invalid]="
            form.get('username').invalid && form.get('username').touched
          "
        />
        <div class="invalid-feedback" *ngIf="form.get('username').invalid">
          <span *ngIf="form.get('username').hasError(required)"
            >Votre adresse email est obligatoire</span
          >
          <span *ngIf="form.get('username').hasError(email)">
            Le format de l'adresse email n'est pas vailde</span
          >
        </div>
      </div>
      <div>
        <input
          formControlName="password"
          type="text"
          placeholder="password"
          [class.is-invalid]="
            form.get('password').invalid && form.get('password').touched
          "
        />
        <div class="invalid-feedback" *ngIf="form.get('email').invalid">
          Le mot de passe est obligatoire
        </div>
      </div>
      <button type="submit" class="btn btn-success">Connexion !</button>
      <a routerLink="/register" class="btn btn-link">
        Ou créez un nouveau compte
      </a>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  handleSubmit() {
    if (this.form.invalid) return;

    this.auth.authenticate(this.form.value).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }
}
