import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.page.html',
  styleUrls: ['./change-profile.page.scss'],
})
export class ChangeProfilePage implements OnInit {
  user: any = { data_user: {} };
  selectedFile: File | null = null;

  constructor(private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    axios
      .get(`${environment.apiUrl}/info_user`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      })
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  openGallery() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      this.selectedFile = file; 
      this.previewImage(file); 
    };

    input.click();
  }

  // Fungsi untuk menampilkan pratinjau gambar
  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.user.data_user.user_profile_picture = reader.result as string; // Pratinjau gambar
    };
    reader.readAsDataURL(file);
  }

  saveProfile() {
    const formData = new FormData();
    formData.append('user_name', this.user.data_user.user_name);
    formData.append('user_phone_number', this.user.data_user.user_phone_number);
    formData.append('user_nickname', this.user.data_user.user_nickname);
    formData.append('user_address', this.user.data_user.user_address || '');
    formData.append('user_gender', this.user.data_user.user_gender);

    if (this.selectedFile) {
      formData.append('user_profile_picture', this.selectedFile); 
    }

    axios
      .post(`${environment.apiUrl}/update_user`, formData, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
          'X-API-KEY': environment.bsaApiKey,
        },
      })
      .then((response) => {
        this.presentToast('Informasi profil berhasil diperbarui', 'success');
        this.router.navigate(['/tab/tabs/profile']);
      })
      .catch((error) => {
        if (error.response.data.message === "Nickname already exists") {
          this.presentToast('Nickname sudah digunakan', 'danger');
        } else if (error.response.data.message === "Phone number already exists") {
          this.presentToast('Nomor telepon sudah digunakan', 'danger');
        } else {
          this.presentToast('Terjadi kesalahan, silahkan coba lagi nanti', 'danger');
        }
        console.error('Error updating profile:', error);
      });
  }

  isFormValid(): boolean {
    const { user_name, user_phone_number, user_nickname, user_gender } = this.user.data_user;
    return user_name && user_phone_number && user_nickname && user_gender;
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    toast.present();
  }
}
