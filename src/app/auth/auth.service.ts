import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Credentials } from "./credentials";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authState = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  authenticate(credentials: Credentials) {
    return this.http
      .post("http://localhost:8000/login_check", credentials)
      .pipe(
        map((result: { token: string }) => {
          this.authState.next(true);
          window.localStorage.setItem("token", result.token);
          return result;
        })
      );
  }

  getToken(): string {
    return window.localStorage.getItem("token") || null;
  }

  logout() {
    this.authState.next(false);
    window.localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
    // ou
    return this.getToken() ? true : false;
    // ou
    return this.getToken() !== null;
  }
}
