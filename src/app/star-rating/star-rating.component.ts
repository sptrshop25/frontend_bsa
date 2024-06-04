import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;  
  stars: number[] = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    // Tidak ada perubahan yang diperlukan di sini
  }

  getStarClass(star: number): string {
    if (this.rating === 5) {
      return 'star full';
    } else if (this.rating >= star) {
      return 'star full';
    } else if (this.rating + 0.5 === star) {
      return 'star half';
    } else {
      return 'star empty';
    }
  }
  
}
