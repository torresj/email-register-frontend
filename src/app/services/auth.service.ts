import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import LoginResponseDto from "../models/loginResponseDto";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import UserDto from "../models/userDto";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authorization = '';
  user$ = new BehaviorSubject<UserDto | null>(null);
  constructor(private http: HttpClient) {
  }

  login$(username: string, password: string) {
    this.authorization = 'Basic ' + btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Authorization': this.authorization,
      'Content-Type': 'application/json'
    });

    const url = "https://api.email.register.torresj.es/v1/login";

    return this.http.post<LoginResponseDto>(url, null, { headers: headers })
        .pipe(
            tap(response => this.user$.next(response.user)),
        );
  }

  logout() {
    this.authorization = '';
    this.user$.next(null);
  }

  isAuthenticated() {
    return this.authorization !== '' && this.user$.value !== null;
  }
}
