import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-error404",
  template: `
    <div class="alert alert-warning">
      <h2>Oups, la page n'existe pas !!!!!!</h2>
      <p>
        <span
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          excepturi sapiente at? Eos ad maxime numquam veniam consequatur id,
          voluptatem, sed perspiciatis dolorum ullam rem delectus maiores esse
          laborum voluptatibus?</span
        >
      </p>
    </div>
  `,
  styles: []
})
export class Error404Component implements OnInit {
  constructor() {}

  ngOnInit() {}
}
