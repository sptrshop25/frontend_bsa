import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  wishlists: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    axios.get(`${environment.apiUrl}/my-wishlist`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey,
      }
    })
    .then((response) => {
      this.wishlists = response.data.map((wishlist: any) => ({
        ...wishlist,
        isWishlisted: true
      }));
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }

  navigateToDetail(courseId: string) {
    this.router.navigate(['/detail-course'], { queryParams: { course_id: courseId } });
  }

  toggleWishlist(wishlist: any, event: Event) {
    event.stopPropagation();
    if (wishlist.isWishlisted) {
      this.removeWishlist(wishlist.course.course_id, wishlist);
    } else {
      this.saveWishlist(wishlist.course.course_id, wishlist);
    }
  }

  saveWishlist(courseId: string, wishlist: any) {
    axios
      .post(
        `${environment.apiUrl}/save-wishlist`,
        { course_id: courseId },
        {
          headers: {
            Authorization: `${localStorage.getItem('authToken')}`,
            'X-API-KEY': environment.bsaApiKey,
          },
        }
      )
      .then((response) => {
        wishlist.isWishlisted = true;
      })
      .catch((error) => {
        console.error('Error saving wishlist:', error);
      });
  }

  removeWishlist(courseId: string, wishlist: any) {
    axios
      .delete(`${environment.apiUrl}/remove-wishlist/${courseId}`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      })
      .then((response) => {
        wishlist.isWishlisted = false;
      })
      .catch((error) => {
        console.error('Error removing wishlist:', error);
      });
  }
}
