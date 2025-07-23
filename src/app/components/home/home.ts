import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";
import UserDto from "../../models/userDto";
import {AsyncPipe} from "@angular/common";
import {UserType} from "../../models/userType";
import {EmailsManagement} from "../emails-management/emails-management";
import {Register} from "../register/register";

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, EmailsManagement, Register],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  user$: BehaviorSubject<UserDto | null>;
  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  protected readonly UserType = UserType;
}
