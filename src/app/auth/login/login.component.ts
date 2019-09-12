import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UiService } from "src/app/ui/ui.service";

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
          <span *ngIf="form.get('username').hasError('required')"
            >Votre adresse email est obligatoire</span
          >
          <span *ngIf="form.get('username').hasError('email')">
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
        <div class="invalid-feedback" *ngIf="form.get('password').invalid">
          Le mot de passe est obligatoire
        </div>
      </div>

      <div *ngIf="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
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
  errorMessage: string;

  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  });
  constructor(
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {}

  handleSubmit() {
    if (this.form.invalid) return;

    // Active l'écran de chargement
    this.ui.activateLoading;

    this.auth.authenticate(this.form.value).subscribe(
      result => {
        // Déactive le temps de chargement
        this.ui.deactivateLoading;

        // console.log(result);
        this.errorMessage = "";
        this.router.navigateByUrl("/");
      },
      error => {
        // Lorsque l'erreur est affichée, on a plus besoin du charegment
        // Déactive le temps de chargement
        this.ui.deactivateLoading;

        if (error.status === 401) {
          this.errorMessage =
            "Nous n'avons pas trouvé de correspondance avec cet email ou ce mot de passe";
          return;
        }
        this.errorMessage = "Un problème est survenue, ré-essayer plus tard";

        console.log(error);
      }
    );
  }
}
