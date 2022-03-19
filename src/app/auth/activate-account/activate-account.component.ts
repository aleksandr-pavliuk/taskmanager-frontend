import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  showResendLink = false;
  uuid: string;
  isLoading = true;
  error: string;
  firstSubmitted = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
      this.authService['activateAccount'](this.uuid).subscribe(
        result => {

          this.isLoading = false;

          if (result) {
            this.router.navigate(['/info-page', {msg: 'Your account has been successfully activated.'}]);
          } else {
            this.router.navigate(['/info-page', {msg: 'Your account has not been activated. Try Again'}]);
          }
        }
        ,
        err => {
          this.isLoading = false;
          switch (err.error.exception) {
            case 'UserAlreadyActivatedException': {
              this.router.navigate(['/info-page', {msg: 'Your account has already been activated.'}]);
              break;
            }
            default: {
              this.error = 'Activation error. Try sending yourself an email again.';
              this.showResendLink = true;
              break;
            }
          }
        }
      );
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

    this.authService.resendActivateEmail(this.emailField.value).subscribe(
      () => {

        this.isLoading = false;
        this.router.navigate(['/info-page', {msg: 'An activation email has been sent to you.'}]);

      },
      err => {
        this.isLoading = false;

        switch (err.error.exception) {
          case 'UserAlreadyActivatedException': {
            this.router.navigate(['/info-page', {msg: 'Your account has already been activated.'}]);
            break;
          }
          case 'UsernameNotFoundException': {
            this.error = 'User with this email was not found';
            break;
          }
          default: {
            this.error = `Error - contact an admin.`;
            break;
          }
        }
      }
    );
  }

}
