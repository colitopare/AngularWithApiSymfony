import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Credentials } from "./credentials";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(credentials: Credentials) {
    return this.http.post("http://localhost:8000/login_check", credentials);
  }
}
