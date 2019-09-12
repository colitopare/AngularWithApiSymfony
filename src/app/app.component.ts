import { Component, OnInit } from "@angular/core";
import { Router, ResolveStart, ResolveEnd } from "@angular/router";
import { UiService } from "./ui/ui.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private router: Router, private ui: UiService) {}

  ngOnInit() {
    // J'ai envie découter le loadingState de uiService
    this.ui.loadingState.subscribe(state => {
      this.isLoading = state;
    });

    // n'apparaît que s'il y a un event sur une route précise
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
