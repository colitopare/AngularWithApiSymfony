import { Component, OnInit } from "@angular/core";
import { Router, ResolveStart, ResolveEnd } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // https://angular.io/guide/router#router-events
    this.router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        // on va charger ...
        this.isLoading = true;
      } else if (event instanceof ResolveEnd) {
        // On a fini de charger ...
        this.isLoading = false;
      }
    });
  }
}
