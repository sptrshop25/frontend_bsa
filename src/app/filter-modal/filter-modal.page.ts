import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { FilterStateService } from './filter-state.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage {
  
  activeButton: string = this.filterStateService.activeButton;
  activeBtnRating: string = this.filterStateService.activeBtnRating;
  activeFilterBy: string = this.filterStateService.activeFilterBy;
  maxPrice: number | null = this.filterStateService.maxPrice !== null ? this.filterStateService.maxPrice : null;
  minPrice: number | null = this.filterStateService.minPrice !== null ? this.filterStateService.minPrice : null;

  constructor(
    private modalController: ModalController,
    private filterStateService: FilterStateService
  ) { }

  dismiss() {
    this.modalController.dismiss();
  }

  reset() {
    this.activeButton = 'semua';
    this.activeBtnRating = '5';
    this.activeFilterBy = 'relevan';
    this.maxPrice = null; 
    this.minPrice = null;
    this.saveFilterStates();
  }

  apply() {
    if (this.minPrice !== null && this.maxPrice !== null && this.minPrice > this.maxPrice) {
      console.log("Error: Nilai minPrice tidak boleh lebih besar dari maxPrice");
      return;
    }
    const filterData = {
      jenis: this.activeButton,
      rating: this.activeBtnRating,
      filterBy: this.activeFilterBy,
      minPrice: this.minPrice !== null ? this.minPrice : null, 
      maxPrice: this.maxPrice !== null ? this.maxPrice : null, 
    };
    console.log(filterData);
    
    axios.post(`${environment.apiUrl}/filter`, filterData)
      .then((response) => {
        console.log(response.data);
        this.dismiss();
      })
      .catch((error) => {
        console.log(error);
      });
      this.modalController.dismiss();
  }

  saveFilterStates() {
    this.filterStateService.activeButton = this.activeButton;
    this.filterStateService.activeBtnRating = this.activeBtnRating;
    this.filterStateService.activeFilterBy = this.activeFilterBy;
    this.filterStateService.maxPrice = this.maxPrice !== null ? this.maxPrice : null;
    this.filterStateService.minPrice = this.minPrice !== null ? this.minPrice : null;
  }
  

  setActiveButton(button: string) {
    this.activeButton = button;
    this.saveFilterStates();
  }

  setActiveBtnRating(rating: string) {
    this.activeBtnRating = rating;
    this.saveFilterStates();
  }

  setActiveFilterBy(filterBy: string) {
    this.activeFilterBy = filterBy;
    this.saveFilterStates();
  }
  isButtonDisabled(): boolean {
    return this.minPrice !== null && this.maxPrice !== null && this.minPrice > this.maxPrice;
  }
  
}
