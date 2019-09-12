import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  template: `
    <nav>
      <div class="nav-wrapper">
        <a routerLink="/" class="brand-logo">Gestion Client</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><a routerLink="/customers">Mes clients</a></li>
          <li><a routerLink="/invoices">Mes factures</a></li>
        </ul>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li *ngIf="!isAuthentification">
            <a class="waves-effect waves-light btn" routerLink="/register"
              >Inscription</a
            >
          </li>
          <li *ngIf="!isAuthentification">
            <a class="waves-effect waves-light btn" routerLink="/login"
              >Connexion</a
            >
          </li>
          <li *ngIf="isAuthentification">
            <a class="waves-effect waves-light btn" routerLink="/profile"
              ><img
                [src]="userData.avatar"
                alt="Avatar Muriel"
                class="avatar"
              />{{ userData.username }}</a
            >
          </li>
          <li *ngIf="isAuthentification">
            <button (click)="handleLogout()">Déconnexion</button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      img.avatar {
        max-height: 24px;
        max-width: 24px;
        border-radius: 50%;
        margin-right: 10px;
        border: 1px solid grey;
      }
    `
  ]
})
export class NavbarComponent implements OnInit {
  isAuthentification = false;
  userData: any;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthentification = this.service.isAuthenticated();

    if (this.isAuthentification) {
      this.userData = this.service.getUserData();
      console.log(this.userData);
    }

    this.service.authState.subscribe(state => {
      this.isAuthentification = state;
      if (this.isAuthentification) {
        this.userData = this.service.getUserData();
        console.log(this.userData);
      }
    });
  }

  handleLogout() {
    this.service.logout();
    this.isAuthentification = false;
    this.router.navigateByUrl("/login");
  }
}
