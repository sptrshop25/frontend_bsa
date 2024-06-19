import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourseDetails(courseId: string) {
    return this.http.get(`${environment.apiUrl}/detail-course/${courseId}`);
  }
}
