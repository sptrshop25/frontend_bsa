import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab-profile',
  templateUrl: './tab-profile.page.html',
  styleUrls: ['./tab-profile.page.scss'],
})
export class TabProfilePage implements OnInit {

  constructor(private router: Router) { 
    this.setName();
    this.setPhone();
    this.setEmail();
    this.setNickname();
    this.setUserActive();
    this.statusTeacher();
  }

  name: string = '';
  phone: string = '';
  email: string = '';
  nickname: string = '';
  user_active: string = '';
  is_teacher: string = '';

  isLoading: boolean = false;
  
  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login']); 
  }
  
  handleRefresh(event: any) {
    setTimeout(() => {
      if (event.target) {
        event.target.complete();
      }
    }, 2000);
  }

  setName(response: any = null) {
    if (response && response.data.user_name) { 
      this.name = response.data.user_name; 
    }
  }

  setPhone(response: any = null) {
    if (response && response.data.user_phone_number) { 
      this.phone = response.data.user_phone_number; 
    }
  }

  setEmail() {
    const email = localStorage.getItem('email');
    if (email) {
      this.email = email;
    }
  }

  setNickname(response: any = null) {
    if (response && response.data.user_nickname) { 
      this.nickname = response.data.user_nickname; 
    }
  }

  setUserActive(response: any = null) {
    if (response && response.data.user_status) { 
      this.user_active = response.data.user_status; 
    }
  }

  statusTeacher(response: any = null) {
    if (response && response.data.user_teacher) { 
      this.is_teacher = response.data.user_teacher; 
    }
  }
  
  ngOnInit() {
    axios.post(`${environment.apiUrl}/info_user`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
    .then((response) => {
      console.log('Response:', response);
      this.setNickname(response); 
      this.setPhone(response);
      this.setName(response);
      this.setUserActive(response);
      this.statusTeacher(response);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      this.isLoading = false;
    });    
  }

}
