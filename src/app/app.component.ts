import { Component } from '@angular/core';
import { } from 'swiper/element/bundle';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}
  isActive(tab: string): boolean {
    return this.router.url === tab;
  }
  isLoginPage(): boolean {
    return this.router.url === '/home' || this.router.url === '/tab-kursus' || this.router.url === '/tab-history' || this.router.url === '/tab-profile'; 
  }
}
