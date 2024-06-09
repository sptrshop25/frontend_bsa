import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenCheckService } from '../../token-check.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

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

  async ngOnInit() {
    // Initialize Google Auth plugin

    // Check if user is already authenticated
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/tab/tabs/home']);
    } 
  }

  async signInWithGoogle() {
    try {
      const googleUser = await GoogleAuth.signIn();
      console.log('User:', googleUser);
      // Lanjutkan dengan proses autentikasi di sini
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async sendTokenToBackend(token: string) {
    // Kirim token ke backend untuk verifikasi dan login
    // Implementasi sesuai dengan kebutuhan backend Anda
  }

}
