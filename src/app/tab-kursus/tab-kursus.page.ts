import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
import axios from 'axios';
import { environment }
 from '../../environments/environment';

interface Course {
  course_id: string;
  user_name: string;
  course_title: string;
  course_category_id: number;
  course_description: string;
  course_price: number;
  course_rating: number | null;
  course_level: string;
  course_is_free: string;
  course_duration: number;
  course_image: string;
  created_at: string;
  updated_at: string | null;
  course_price_discount: number | null;
  id: number;
  category_name: string;
  teacher: {
    user_name: string;
  }
}

@Component({
  selector: 'app-tab-kursus',
  templateUrl: './tab-kursus.page.html',
  styleUrls: ['./tab-kursus.page.scss'],
})
export class TabKursusPage implements OnInit {
  groupedCourses: { category_name: string; courses: Course[] }[] = [];
  isLoading = true;
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
    axios.get(`${environment.apiUrl}/get_courses`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
      // console.log('Response:', response);
      this.groupedCourses = this.groupCoursesByCategory(response.data);
    })
    .catch((error) => {
      console.log('Error:', error);
    })
    .finally(() => {
      this.isLoading = false;
    });
  }

  groupCoursesByCategory(courses: any[]): any[] {
    const groupedCourses: { [key: string]: any[] } = {};
    const recommendedCourses: any[] = [];
    const courseFree : any[] = [];

    courses.forEach(course => {
      
      if (course.course_rating >= 4) {
        recommendedCourses.push(course);
      }
      if (course.course_is_free === 'yes') {
        courseFree.push(course);
      }
      if (!groupedCourses[course.sub_category.category.category_name]) {
        groupedCourses[course.sub_category.category.category_name] = [];
      }
      groupedCourses[course.sub_category.category.category_name].push(course);
    });

    const groupedCoursesArray = Object.keys(groupedCourses).map(category => {
      return { category_name: category, courses: groupedCourses[category] };
    });

    if (recommendedCourses.length > 0) {
      groupedCoursesArray.unshift({ category_name: 'Rekomendasi Kursus', courses: recommendedCourses });
    }

    if (courseFree.length > 0) {
      groupedCoursesArray.unshift({ category_name: 'Kursus Gratis', courses: courseFree });
    }

    return groupedCoursesArray;
  }

  navigateToDetail(courseId: string) {
    this.router.navigate(['/detail-course'], { queryParams: { course_id: courseId } });
  }
}
