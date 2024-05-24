import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  salam: string = "";
  name: string = "";

  constructor() { 
    this.setSalam();
    this.setName();
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
  }

  fetchData() {
    // Ganti URL dengan URL API yang dimaksud
    const apiUrl = 'https://930b-110-138-88-26.ngrok-free.app/api/register';

    // Lakukan permintaan GET ke API menggunakan Axios
    axios.get(apiUrl)
      .then((response) => {
        console.log('Response:', response);
        // Lakukan sesuatu dengan respons API di sini
      })
      .catch((error) => {
        console.error('Error:', error);
        // Tangani kesalahan di sini
      });
  }
}
