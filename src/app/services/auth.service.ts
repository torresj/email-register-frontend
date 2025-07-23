import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import LoginResponseDto from "../models/loginResponseDto";
import {BehaviorSubject, tap} from "rxjs";
import UserDto from "../models/userDto";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authorization = '';
  user$ = new BehaviorSubject<UserDto | null>(null);
  constructor(private http: HttpClient) {
  }

  public get authorization(): string {
    return this._authorization;
  }

  login$(username: string, password: string) {
    this._authorization = 'Basic ' + btoa(`${username}:${password}`);
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
    this._authorization = '';
    this.user$.next(null);
  }

  isAuthenticated() {
    return this.authorization !== '' && this.user$.value !== null;
  }
}
