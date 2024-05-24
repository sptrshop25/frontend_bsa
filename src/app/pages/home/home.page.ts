import { Component, OnInit } from '@angular/core';
// import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
    // localStorage.removeItem('authToken');
  }

}
