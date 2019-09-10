import { Component, OnInit } from "@angular/core";

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
          <li>
            <a class="waves-effect waves-light btn" routerLink="/register"
              >Inscription</a
            >
          </li>
          <li>
            <a class="waves-effect waves-light btn" routerLink="/login"
              >Connexion</a
            >
          </li>
          <li>
            <a class="waves-effect waves-light btn" routerLink="/profile"
              ><img
                src="http://robohash.org/muriel"
                alt="Avatar Muriel"
                class="avatar"
              />Muriel IMBERT</a
            >
          </li>
          <li><button routerLink="/logout">Déconnexion</button></li>
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
  constructor() {}

  ngOnInit() {}
}
