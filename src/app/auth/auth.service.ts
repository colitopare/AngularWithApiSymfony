import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Credentials } from "./credentials";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authState = new Subject<boolean>();

  constructor(private http: HttpClient, private storage: Storage) {}

  register(account: { email: string; password: string; avatar: string }) {
    return this.http.post("http://localhost:8000/users", account);
  }

  authenticate(credentials: Credentials) {
    return this.http
      .post("http://localhost:8000/login_check", credentials)
      .pipe(
        map((result: { token: string }) => {
          window.localStorage.setItem("token", result.token);
          this.authState.next(true);
          return result;
        })
      );
  }

  getToken(): string {
    return this.storage.getItem("token") || null;
  }

  logout() {
    this.authState.next(false);
    this.storage.removeItem("token");
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

  getUserData() {
    if (!this.getToken()) return null;
    // token décoder
    return jwtDecode(this.getToken());
  }
}
