import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenCheckService } from '../../token-check.service';
// import { AuthService } from './auth.services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(private router: Router, private tokenCheckService: TokenCheckService) {}

  goToSignUpEmail() {
    this.router.navigateByUrl('sign-up');
  }

  goToSigninEmail() {
    this.router.navigateByUrl('login');
  }

  ngOnInit() {
    // this.tokenCheckService.checkTokenValidity()
    //   .then((isValid) => {
    //     console.log('Token validity:', isValid);
    //     if (isValid) {
    //       this.router.navigate(['/home']);
    //     } 
    //   })
    //   .catch((error) => {
    //     console.error('Error checking token validity:', error);
    //   });
    console.log(localStorage.getItem('authToken'));
    
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/tab/tabs/home']);
    } 
  }

}
