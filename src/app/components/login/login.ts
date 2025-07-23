import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    AsyncPipe,
    MatProgressSpinner,
    MatError
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  submitted = false;

  isLoading$ = new BehaviorSubject(false);

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
        {
          username: ['', Validators.required],
          password: ['', Validators.required],
        }
    );
  }

  submit(){
    this.submitted = true;
    this.isLoading$.next(true);
    this.form.get('username')?.setErrors(null);
    this.form.get('password')?.setErrors(null);
    if (this.form.invalid) {
      this.isLoading$.next(false);
      return;
    }

    this.authService.login$(this.form.get('username')?.value, this.form.get('password')?.value).subscribe({
      next: value => {
        this.submitted = false;
        this.router.navigateByUrl('/');
        this.isLoading$.next(false);
      },
      error: err => {
        console.log(err)
        this.form.get('username')?.setErrors({'incorrect': true});
        this.form.get('password')?.setErrors({'incorrect': true});
        this.authService.logout();
        this.isLoading$.next(false);
      }
    });
  }
}
