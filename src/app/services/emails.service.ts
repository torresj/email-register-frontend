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

  get$(){
    const headers = new HttpHeaders({
      'Authorization': this.authService.authorization,
      'Content-Type': 'application/json',
    });

    const url = "https://api.email.register.torresj.es/v1/emails";

    return this.http.get<string[]>(url, { headers: headers });
  }

  delete$(email: string){
    const headers = new HttpHeaders({
      'Authorization': this.authService.authorization,
      'Content-Type': 'application/json',
    });

    const url = "https://api.email.register.torresj.es/v1/emails";

    return this.http.delete(url, { headers: headers, body: { email : email} });
  }

  getEmailsInFile() {
    const headers = new HttpHeaders({
      'Authorization': this.authService.authorization,
      'Content-Type': 'application/json',
      responseType: 'blob',
    });

    const url = "https://api.email.register.torresj.es/v1/emails/export";
    return this.http.get<Blob>(url,
        {
          headers: headers,
          responseType: 'blob' as 'json',
        }
    );
  }

}
