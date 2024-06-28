import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

interface Rating {
  id: number;
  course_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

interface Enrollment {
  id: number;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  status: string;
  completed_count: number;
  active_period: any; 
  created_at: any; 
  updated_at: any; 
}

interface Course {
  course_id: string;
  teacher_id: string;
  course_title: string;
  course_category_id: number;
  course_description: string;
  course_price: number;
  course_price_discount: number | null;
  course_rating: string | null;
  course_level: string;
  course_is_free: string;
  course_duration: any; 
  course_image: string; 
  created_at: string;
  updated_at: string | null; 
  rating: Rating[];
  enrollment: Enrollment[];
}

interface TeacherExperience {
  id: number;
  teacher_id: string;
  name: string;
  start_date: string;
  end_date: string;
  position: string;
  description: string;
  is_still_working: string;
}

interface TeacherEducationHistory {
  id: number;
  teacher_id: string;
  teacher_degree_title: string;
  teacher_university: string;
  teacher_major: string;
  teacher_start_year: string;
  teacher_graduation_year: string;
}

interface TeacherData {
  teacher_id: string;
  teacher_description: string;
  teacher_expertise_field: string;
  teacher_instructional_skill: string;
  teacher_link_portfolio: string | null;
  teacher_term_and_condition: string | null;
  teacher_since: string;
  teacher_link_github: string | null;
  teacher_link_linkedin: string | null;
  teacher_link_youtube: string | null;
  teacher_status: string;
  created_at: string;
  updated_at: string | null;
  data_user: {
    user_id: string;
    user_name: string;
    user_nickname: string;
    user_date_of_birth: string | null;
    user_address: string | null;
    user_phone_number: string;
    user_profile_picture: string | null;
    user_gender: string;
    user_focus_area: string | null;
    user_interest_field: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
  teacher_experience: TeacherExperience[];
  course: Course[];
  teacher_education_history: TeacherEducationHistory[];
}

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.page.html',
  styleUrls: ['./teacher-profile.page.scss'],
})
export class TeacherProfilePage implements OnInit {
  teacherData: TeacherData = {
    teacher_id: '',
    teacher_description: '',
    teacher_expertise_field: '',
    teacher_instructional_skill: '',
    teacher_link_portfolio: null,
    teacher_term_and_condition: null,
    teacher_since: '',
    teacher_link_github: null,
    teacher_link_linkedin: null,
    teacher_link_youtube: null,
    teacher_status: '',
    created_at: '',
    updated_at: null,
    data_user: {
      user_id: '',
      user_name: '',
      user_nickname: '',
      user_date_of_birth: null,
      user_address: null,
      user_phone_number: '',
      user_profile_picture: null,
      user_gender: '',
      user_focus_area: null,
      user_interest_field: null,
      created_at: '',
      updated_at: '',
      deleted_at: null,
    },
    course: [],
    teacher_experience: [],
    teacher_education_history: [],
  };

  averageRating: number = 0;
  totalReviews: number = 0;
  totalParticipants: number = 0;
  totalCourses: number = 0;
  showFullDescription: boolean[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const teacherId = this.route.snapshot.queryParamMap.get('teacher_id'); 
    console.log(teacherId);
    
    axios.get<TeacherData>(`${environment.apiUrl}/teacher-profile/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
      .then(response => {
        this.teacherData = response.data;

        // Hitung rata-rata peringkat
        if (this.teacherData.course.length > 0) {
          let totalRating = 0;
          let ratedCoursesCount = 0;
        
          this.teacherData.course.forEach(course => {
            if (course.course_rating) {
              totalRating += parseFloat(course.course_rating);
              ratedCoursesCount++;
            }
          });
          if (ratedCoursesCount > 0) {
            this.averageRating = totalRating / ratedCoursesCount;
          } else {
            this.averageRating = 0; 
          }
        }
        
        this.showFullDescription.push(false);
        // Hitung jumlah ulasan
        this.totalReviews = this.teacherData.course.reduce((total, course) => total + course.rating.length, 0);

        // Hitung jumlah peserta
        this.totalParticipants = this.teacherData.course.reduce((total, course) => total + course.enrollment.length, 0);

        // Hitung jumlah kursus
        this.totalCourses = this.teacherData.course.length;
      })
      .catch(error => {
        console.error('Error fetching teacher profile:', error);
      });
  }

  toggleDescription(index: number): void {
    this.showFullDescription[index] = !this.showFullDescription[index];
  }

  navigateToCourseDetails(courseId: string) {
    this.router.navigate(['/detail-course'], { queryParams: { course_id: courseId } });
  }

  formatDate(dateStr: string): string {
    return moment(dateStr).format('MMM YYYY');
  }

  calculateDuration(startDate: string, endDate: string | null): string {
    const start = moment(startDate);
    const end = endDate ? moment(endDate) : moment();
    const years = end.diff(start, 'years');
    const months = end.diff(start, 'months') % 12;
    return `${years} thn ${months} bln`;
  }

}
