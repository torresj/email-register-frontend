import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "./services/auth.service";
import {BehaviorSubject} from "rxjs";
import UserDto from "./models/userDto";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIcon, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  user$: BehaviorSubject<UserDto | null>;
  constructor(
      private authService: AuthService,
      private router: Router,
  ) {
    this.user$ = authService.user$;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
