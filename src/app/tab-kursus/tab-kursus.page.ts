import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-kursus',
  templateUrl: './tab-kursus.page.html',
  styleUrls: ['./tab-kursus.page.scss'],
})
export class TabKursusPage implements OnInit {

  constructor(private router: Router) { }

  goBack() {
    this.router.navigate(['/previous-page']);
  }

  redirectToSearchPage() {
    this.router.navigate(['search-course']);
  }
  ngOnInit() {
  }

}
