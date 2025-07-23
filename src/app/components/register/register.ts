import {Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {EmailsService} from "../../services/emails.service";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    AsyncPipe,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatProgressSpinner,
    MatError
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });

  submitted = false;

  isLoading$ = new BehaviorSubject(false);
  success$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject(false);

  constructor(
      private emailService: EmailsService,
      private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit(){
    this.submitted = true;
    this.isLoading$.next(true);
    if (this.form.invalid) {
      this.isLoading$.next(false);
      return;
    }

    this.emailService.register$(this.form.get('email')?.value).subscribe({
    next: value => {
      console.log("success")
      this.submitted = false;
      this.isLoading$.next(false);
      this.error$.next(false);
      this.success$.next(true);
    },
    error: error => {
        console.error(error);
        this.success$.next(false);
        this.error$.next(true);
        this.isLoading$.next(false);
      }
    });
  }

}
