import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: 'Logging in... Please wait...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
          (res) => {
            console.log('AUTH PAGE: ', res);
            this.isLoading = false;
            this.loadingCtrl.dismiss();
            this.router.navigateByUrl('/home/tabs/lessons');
          },
          (errorRes) => {
            console.log(errorRes);
            loadingEl.dismiss();
            const code = errorRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'This email address was not found!';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'This password is not correct!';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authenticate(email, password);
    form.reset();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onLogout() {
    this.authService.logout();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        // tslint:disable-next-line: object-literal-shorthand
        message: message,
        buttons: ['Okay'],
      })
      .then((alertEl) => alertEl.present());
  }
}
