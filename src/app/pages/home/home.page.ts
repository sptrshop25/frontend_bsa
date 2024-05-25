import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  salam: string = "";
  name: string = "";
  private autoScrollTimeout: any;
  private userScrolling = false;

  constructor(
    private router: Router
  ) { 
    this.setSalam();
    this.setName();
  }

  ngAfterViewInit() {
    this.setupAutoScroll();
  }

  setupAutoScroll() {
    const scrollContainer = document.getElementById('scroll');

    if (scrollContainer) {
      let scrollIndex = 0;
      const images = scrollContainer.querySelectorAll('img');
      const totalImages = images.length;
      const interval = 3000; 
      const autoScroll = () => {
        if (!this.userScrolling) {
          scrollIndex = (scrollIndex + 1) % totalImages;
          const nextImage = images[scrollIndex];
          scrollContainer.scrollLeft = nextImage.offsetLeft;
        }
        this.autoScrollTimeout = setTimeout(autoScroll, interval);
      };

      autoScroll();
    }
  }

  @HostListener('mousedown')
  @HostListener('touchstart')
  onUserScrollStart() {
    this.userScrolling = true;
    clearTimeout(this.autoScrollTimeout);
  }

  @HostListener('mouseup')
  @HostListener('touchend')
  onUserScrollEnd() {
    this.userScrolling = false;
    this.setupAutoScroll();
  }

  setSalam() {
    const waktu = new Date();
    const jam = waktu.getHours();

    if (jam >= 0 && jam < 12) {
      this.salam = "Selamat Pagi";
    } else if (jam >= 12 && jam < 18) {
      this.salam = "Selamat Siang";
    } else {
      this.salam = "Selamat Malam";
    }
  }

  setName() {
    const name = localStorage.getItem('name');
    if (name) {
      this.name = name;
    }
  }

  ngOnInit() {
    this.fetchData();
    // if (localStorage.getItem('authToken')) {
    //   this.router.navigate(['/login']);
    // } 
  }

  fetchData() {
    const apiUrl = `${environment.apiUrl}/register`;
    axios.get(apiUrl)
      .then((response) => {
        console.log('Response:', response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
