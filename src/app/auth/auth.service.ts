import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Credentials } from "./credentials";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(credentials: Credentials) {
    return this.http
      .post("http://localhost:8000/login_check", credentials)
      .pipe(
        map((result: { token: string }) => {
          window.localStorage.setItem("token", result.token);
          return result;
        })
      );
  }

  getToken(): string {
    return window.localStorage.getItem("token") || null;
  }
}
