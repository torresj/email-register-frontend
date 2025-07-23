import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  constructor(
      private http: HttpClient,
      private authService: AuthService
  ) {
  }

  register$(email: string){
    const headers = new HttpHeaders({
      'Authorization': this.authService.authorization,
      'Content-Type': 'application/json',
    });

    const url = "https://api.email.register.torresj.es/v1/emails";

    return this.http.post(url, { email : email}, { headers: headers });
  }
}
