import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; // Menggunakan AngularFireAuth dari '@angular/fire/auth'
import firebase from 'firebase/app'; // Menggunakan firebase dari 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      // Autentikasi berhasil, akses informasi pengguna di sini
      const user = result.user;
      console.log(user);
      return user;
    } catch (error) {
      // Autentikasi gagal, tangani kesalahan di sini
      console.error(error);
      throw error;
    }
  }

  async signOut() {
    await this.afAuth.signOut();
  }
}
