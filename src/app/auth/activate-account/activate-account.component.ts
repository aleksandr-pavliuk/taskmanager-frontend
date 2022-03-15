import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  uuid: string;
  isLoading = true;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
              break;
            }
          }
        }
      );
    });
  }
}
