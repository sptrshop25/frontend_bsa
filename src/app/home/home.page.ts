import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
}

interface Teacher {
  teacher_id: string;
  name: string;
  profile_picture: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  groupedCourses: { category_name: string; courses: Course[] }[] = [];
  isLoading = true;
  salam: string = '';
  name: string = '';
  profile_picture: string = '';
  topTeachers: Teacher[] = [];
  private autoScrollTimeout: any;
  private userScrolling = false;

  constructor(private router: Router) {
    this.setSalam();
    this.setName();
    this.setProfilePicture();
  }

  ngAfterViewInit() {
    this.setupAutoScroll();
  }

  setupAutoScroll() {
    const scrollContainer = document.getElementById('scroll');

    if (scrollContainer) {
      let scrollIndex = 0;
      const images = scrollContainer.querySelectorAll('img');
      const totalImages = images.length;
      const interval = 3000;
      const autoScroll = () => {
        if (!this.userScrolling) {
          scrollIndex = (scrollIndex + 1) % totalImages;
          const nextImage = images[scrollIndex];
          scrollContainer.scrollLeft = nextImage.offsetLeft;
        }
        this.autoScrollTimeout = setTimeout(autoScroll, interval);
      };

      autoScroll();
    }
  }

  @HostListener('mousedown')
  @HostListener('touchstart')
  onUserScrollStart() {
    this.userScrolling = true;
    clearTimeout(this.autoScrollTimeout);
  }

  @HostListener('mouseup')
  @HostListener('touchend')
  onUserScrollEnd() {
    this.userScrolling = false;
    this.setupAutoScroll();
  }

  setSalam() {
    const waktu = new Date();
    const jam = waktu.getHours();

    if (jam >= 5 && jam < 10) {
      this.salam = 'Selamat Pagi';
    } else if (jam >= 10 && jam < 15) {
      this.salam = 'Selamat Siang';
    } else if (jam >= 15 && jam < 18) {
      this.salam = 'Selamat Sore';
    } else {
      this.salam = 'Selamat Malam';
    }
  }

  setName(response: any = null) {
    if (response && response.data.data_user.user_name) { 
      this.name = response.data.data_user.user_name; 
    }
    console.log(this.name);
    
  }

  setProfilePicture(response: any = null) {
    if (response && response.data.data_user.user_profile_picture) { 
      this.profile_picture = response.data.data_user.user_profile_picture; 
    }
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      event.target.complete();
      location.reload();
    }, 2000);
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

    axios.get(`${environment.apiUrl}/info_user`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
      // console.log('Response:', response);
      this.setName(response);
      this.setProfilePicture(response);
    })
    .catch((error) => {
      console.log('Error:', error);
    })
    .finally(() => {
      this.isLoading = false;
    });
    axios.get(`${environment.apiUrl}/list-teacher-top`, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`
      }
    }) 
    .then((response) => {
      this.topTeachers = response.data;
      // console.log('Top Teachers:', this.topTeachers);
      
    })
    .catch((error) => {
      console.log('Error fetching top teachers:', error);
    });
  }

  groupCoursesByCategory(courses: any[]): any[] {
    const groupedCourses: { [key: string]: any[] } = {};
    const recommendedCourses: any[] = [];

    courses.forEach(course => {
      // console.log(course);
      
      if (course.course_rating >= 4) {
        recommendedCourses.push(course);
      }
    });
    const groupedCoursesArray = Object.keys(groupedCourses).map(category => {
      return { category_name: category, courses: groupedCourses[category] };
    });

    if (recommendedCourses.length > 0) {
      groupedCoursesArray.unshift({ category_name: 'Rekomendasi Kursus', courses: recommendedCourses });
    }
    // console.log(recommendedCourses);
    

    return groupedCoursesArray;
  }

  myCourses() {
    this.router.navigate(['my-course']);
  }

  teacherProfile(teacher_id = '') {
    this.router.navigate(['teacher-profile'], { queryParams: { teacher_id } });
  }

  courseDetail(course_id = '') {
    this.router.navigate(['detail-course'], { queryParams: { course_id } });
  }
}
