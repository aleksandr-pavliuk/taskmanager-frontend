import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


/*

Страница для отправки письма сброса пароля.

 */

@Component({
  selector: 'app-send-email-reset-password',
  templateUrl: './send-email-reset-password.component.html',
  styleUrls: ['./send-email-reset-password.component.css']
})
export class SendEmailResetPasswordComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  error: string;
  firstSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService

  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get emailField(): AbstractControl {
    return this.form.get('email');
  }

  public submitForm(): void {

    this.firstSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.sendResetPasswordEmail(this.emailField.value).subscribe(
      () => {

        this.isLoading = false;

        this.router.navigate(['/info-page', {msg: 'An email has been sent to you to reset your password, please check your email in 1-2 minutes.'}]);
      },

      err => {
        this.isLoading = false;

        switch (err.error.exception) {

          case 'UsernameNotFoundException': {
            this.error = `User with this email does not exist`;
            break;
          }

          default: {
            this.error = `Error - contact an admin.`;
            break;
          }

        }

      });

  }


}
