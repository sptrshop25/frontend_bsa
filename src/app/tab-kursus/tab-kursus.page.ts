import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';

@Component({
  selector: 'app-tab-kursus',
  templateUrl: './tab-kursus.page.html',
  styleUrls: ['./tab-kursus.page.scss'],
})
export class TabKursusPage implements OnInit {

  constructor(private router: Router, private modalController: ModalController) { }

  goBack() {
    this.router.navigate(['/previous-page']);
  }

  redirectToSearchPage() {
    this.router.navigate(['search-course']);
  }

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      cssClass: 'filter-modal',
    });
    modal.present();
  }
  ngOnInit() {
  }

}
