import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Material {
  material_sub_title: string;
  completed: boolean;
}

interface Bab {
  id: number;
  title: string;
  materials: Material[];
}

interface CourseDetails {
  materialBabs: Bab[];
  course: {
    course_rating: number | null;
  };
}

interface Rating {
  id: number;
  course_id: string;
  user_id: string;
  rating: number;
  comment: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
}

interface RatingDistribution {
  percentage: number;
  value: number;
  stars: number;
  count: number;
}

interface Review {
  student_name: string;
  date: string;
  rating: number;
  comment: string;
  profile_picture: string;
  teacher_response?: string;
}

@Component({
  selector: 'app-detail-kursus',
  templateUrl: './detail-kursus.page.html',
  styleUrls: ['./detail-kursus.page.scss'],
})
export class DetailKursusPage implements OnInit {
  courseId: string = '';
  course_details: any;
  courseDetails: CourseDetails = {
    materialBabs: [],
    course: { course_rating: null },
  };
  reviews: Review[] = [];
  firstThreeReviews: Review[] = [];
  remainingReviews: Review[] = [];
  ratingDistribution: RatingDistribution[] = [];
  isWishlisted = false;

  constructor(private route: ActivatedRoute, private router: Router, private modalController: ModalController, private alertController: AlertController) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.courseId = params['course_id'];
      if (this.courseId) {
        this.getCourseDetails(this.courseId).then(() => {
          this.isWishlisted = this.course_details.wishlist === 1;
        });
      }
    });
  }
  async getCourseDetails(courseId: string) {
    try {
      const response = await axios.get(
        `${environment.apiUrl}/detail-course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      const courseDetails = response.data.course;
      if (
        courseDetails.course_rating !== null &&
        !isNaN(courseDetails.course_rating)
      ) {
        this.setCourseRating(parseFloat(courseDetails.course_rating));
      } else {
        this.setCourseRating(null);
      }
      this.course_details = response.data;
      this.processCourseDetails(response.data);
      this.processReviews(response.data.course.rating);
      this.processRatingDistribution(response.data.course.rating);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  }

  setCourseRating(rating: number | null) {
    this.courseDetails.course.course_rating = rating;
  }

  processCourseDetails(data: any) {
    const materials = data.course.material_bab;
    const materialBabs: Bab[] = [];

    materials.forEach((material_bab: any) => {
      let bab = materialBabs.find((b) => b.id === material_bab.id);
      if (!bab) {
        bab = {
          id: material_bab.id,
          title: material_bab.title,
          materials: [],
        };
        materialBabs.push(bab);
      }
      if (bab) {
        material_bab.course_materials.forEach((course_material: any) => {
          bab!.materials.push({
            material_sub_title: course_material.material_sub_title,
            completed: false,
          });
        });
      }
    });

    this.courseDetails.materialBabs = materialBabs;
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  processReviews(ratings: any[]) {
    this.reviews = ratings.map((rating) => {
      return {
        student_name: rating.user.data_user.user_name,
        date: new Date(rating.created_at).toLocaleDateString(),
        rating: rating.rating,
        comment: rating.comment,
        profile_picture: rating.user.data_user.user_profile_picture,
        teacher_response: undefined,
      };
    });
    this.firstThreeReviews = this.reviews.slice(0, 3);
    this.remainingReviews = this.reviews;
  }

  processRatingDistribution(ratings: Rating[]) {
    const ratingCounts = [0, 0, 0, 0, 0];
    const totalRatings = ratings.length;

    ratings.forEach((rating) => {
      if (rating.rating >= 1 && rating.rating <= 5) {
        ratingCounts[rating.rating - 1]++;
      }
    });

    this.ratingDistribution = ratingCounts
      .map((count, index) => {
        const stars = index + 1;
        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
        return {
          percentage: percentage,
          value: percentage / 100,
          stars: stars,
          count: count,
        };
      })
      .reverse();
  }

  getStarIcons(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    let starIcons: string[] = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push('star');
    }
    if (hasHalfStar) {
      starIcons.push('star-half');
    }
    while (starIcons.length < 5) {
      starIcons.push('star-outline');
    }
    return starIcons;
  }

  navigateToDetail(courseId: string) {
    axios.get(`${environment.apiUrl}/check_course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      }
    })
    .then((response) => {
      this.router.navigate(['/payment'], {
        queryParams: { course_id: courseId },
      });
    })
    .catch((error) => {
      this.errorAlert("Kursus ini sudah berada di daftar kursus kamu"); 
    });
  }

  toggleWishlist(courseId: string) {
    if (this.isWishlisted) {
      this.removeWishlist(courseId);
    } else {
      this.saveWishlist(courseId);
    }
    this.isWishlisted = !this.isWishlisted;
  }

  saveWishlist(courseId: string) {
    axios
      .post(
        `${environment.apiUrl}/save-wishlist`,
        {
          course_id: courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .then((response) => {
        // console.log('Wishlist saved successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error saving wishlist:', error);
      });
  }

  removeWishlist(courseId: string) {
    axios
      .delete(`${environment.apiUrl}/remove-wishlist/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((response) => {
        // console.log('Wishlist removed successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error removing wishlist:', error);
      });
  }

  async presentAlert(message: string) {
    const modal = await this.modalController.create({
      component: CustomAlertComponent,
      componentProps: {
        message: message
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.goToLogin) {
        this.router.navigate(['/my-course']);
      }
    });

    await modal.present();
  }

  async errorAlert(messages?: string) {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message: messages,
      buttons: ['OK'],
    });

    await alert.present();
  }

  transaction(courseId: string) {
    axios.post(
      `${environment.apiUrl}/transaction`,
      {
        course_id: courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((response) => {
        console.log('Transaction successful:', response.data);
        
        this.presentAlert("Transaksi Berhasil");
      })
      .catch((error) => {
        console.error('Transaction failed:', error);
        if (error.response.data.message === "Course already purchased") {
          this.errorAlert("Kursus ini sudah berada di daftar kursus kamu"); 
        } else {
          this.errorAlert("Terjadi kesalahan, silahkan coba lagi nanti");
        }
      });
    }

    teacherProfile() {
      this.router.navigate(['/teacher-profile'], {
        queryParams: { teacher_id: this.course_details?.course.teacher_id },
      });
    }
}
