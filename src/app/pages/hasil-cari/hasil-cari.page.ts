import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hasil-cari',
  templateUrl: './hasil-cari.page.html',
  styleUrls: ['./hasil-cari.page.scss'],
})
export class HasilCariPage implements OnInit {
  searchResults: any[] = [];
  query: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.searchCourses(query);
        this.query = query;
      }
    });
  }

  async searchCourses(query: string) {
    try {
      const response = await axios.post(`${environment.apiUrl}/search_course`, {
        search_query: query
      }, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
        },
      });
      
      this.searchResults = response.data;
      
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  }

  search() {
    this.router.navigate(['/search-course'], { queryParams: { q: this.query } });
  }

  navigateToDetail(courseId: string) {
    this.router.navigate(['/detail-course'], { queryParams: { course_id: courseId } });
  }

  goBack() {
    history.back();
  }
}
