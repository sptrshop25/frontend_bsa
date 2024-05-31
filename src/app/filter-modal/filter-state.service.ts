import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  activeButton: string = 'semua';
  activeBtnRating: string = '5';
  activeFilterBy: string = 'relevan';
  maxPrice: number | null = null;
  minPrice: number | null = null;

  constructor() { }
}
