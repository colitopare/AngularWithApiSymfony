import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.service.isAuthenticated()) {
      return next.handle(req);
    }

    const token = this.service.getToken();

    const cloneReq = req.clone({
      headers: req.headers.append("Authorization", "Bearer " + token)
    });
    // console.log("j'ai été appelé");
    return next.handle(cloneReq);
  }
}

// Interceptor, à chaque requête avant d'être envoyer faits des modifs puis l'envoie et idem pour les retour si besoin
