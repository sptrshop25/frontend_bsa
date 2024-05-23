import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async loginWithGoogle() {
    await Browser.open({ url: 'http://127.0.0.1:8000/api/oauth/google/redirect' });
  }

  async handleCallback(url: string) {
    // Handle callback from Google login, if necessary.
  }
}
