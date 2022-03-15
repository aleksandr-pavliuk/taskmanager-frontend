import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService, User} from "../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  error: string;
  firstSubmitted = false;

  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get usernameField(): AbstractControl {
    return this.form.get('username');
  }

  get emailField(): AbstractControl {
    return this.form.get('email');
  }

  get passwordField(): AbstractControl {
    return this.form.get('password');
  }

  get confirmPasswordField(): AbstractControl {
    return this.form.get('confirmPassword');
  }


  public submitForm(): void {

    this.firstSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const user = new User();
    user.username = this.usernameField.value;
    user.email = this.emailField.value;
    user.password = this.passwordField.value;

    this.authService.register(user).subscribe(
      () => {

        this.isLoading = false;

        this.error = null;

        this.router.navigate(['/info-page', {msg: 'An email has been sent to you to verify your account. Check your mail in 1-2 minutes.'}]);

      },
      err => {
        this.isLoading = false;

        switch (err.error.exception) {

          case 'DataIntegrityViolationException': {
            this.error = `User or email already exists`;
            break;
          }


          case 'ConstraintViolationException': {
            this.error = `User or email already exists`;
            break;
          }

          case 'UserOrEmailAlreadyExistException': {
            this.error = `User or email already exists`; // будет показана ошибка на странице
            break;
          }

          default: {
            this.error = `Error, contact admin.`;
            break;
          }

        }

      });
  }

}
