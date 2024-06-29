import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import {LoadingController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.page.html',
  styleUrls: ['./edit-teacher.page.scss'],
})
export class EditTeacherPage implements OnInit {
  teacherForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private loadingCtrl: LoadingController, private toastController: ToastController, private router: Router) {
    this.teacherForm = this.fb.group({
      teacherData: this.fb.array([]),
      pengalamanData: this.fb.array([]),
      keahlianData: this.fb.group({
        bidangDikuasai: ['', Validators.required],
        bidangDiajarkan: ['', Validators.required],
      }),
      personalData: this.fb.group({
        description: ['', Validators.required],
        linkGithub: [''],
        linkLinkedin: [''],
        linkYoutube: [''],
      }),
    });

    this.addPendidikan();
    this.addPengalaman();
  }

  ngOnInit() {
    this.loadTeacherData();
  }

  async loadTeacherData() {
    try {
      const response = await axios.get(`${environment.apiUrl}/detail-teacher`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log('Response:', response.data);

      const teacherData = response.data;
      this.teacherForm.patchValue({
        personalData: {
          description: teacherData.teacher_description,
          linkGithub: teacherData.teacher_link_github || '',
          linkLinkedin: teacherData.teacher_link_linkedin || '',
          linkYoutube: teacherData.teacher_link_youtube || '',
        },
        keahlianData: {
          bidangDikuasai: teacherData.teacher_expertise_field,
          bidangDiajarkan: teacherData.teacher_instructional_skill,
        },
      });

      this.teacherData.clear();
      teacherData.teacher_education_history.forEach((education: any) => {
        this.teacherData.push(this.fb.group({
          gelar: education.teacher_degree_title,
          sekolah: education.teacher_university,
          jurusan: education.teacher_major,
          tahun_masuk: education.teacher_start_year,
          tahun_lulus: education.teacher_graduation_year,
        }));
      });

      this.pengalamanData.clear();
      teacherData.teacher_experience.forEach((experience: any) => {
        this.pengalamanData.push(this.fb.group({
          judul: experience.name,
          posisi: experience.position,
          mulai: experience.start_date,
          selesai: { value: experience.is_still_working === 'yes' ? '' : experience.end_date, disabled: experience.is_still_working === 'yes' },
          masihBekerja: experience.is_still_working === 'yes',
          deskripsi: experience.description,
        }));
      });
    } catch (error) {
      console.error('Gagal memuat data guru', error);
    }
  }

  get teacherData(): FormArray {
    return this.teacherForm.get('teacherData') as FormArray;
  }

  get pengalamanData(): FormArray {
    return this.teacherForm.get('pengalamanData') as FormArray;
  }

  addPendidikan() {
    this.teacherData.push(this.fb.group({
      gelar: ['', Validators.required],
      sekolah: ['', Validators.required],
      jurusan: ['', Validators.required],
      tahun_masuk: ['', Validators.required],
      tahun_lulus: ['', Validators.required],
    }));
  }

  removePendidikan(index: number) {
    this.teacherData.removeAt(index);
  }

  addPengalaman() {
    this.pengalamanData.push(this.fb.group({
      judul: ['', Validators.required],
      posisi: ['', Validators.required],
      mulai: ['', Validators.required],
      selesai: [{ value: '', disabled: false }, Validators.required],
      masihBekerja: [false],
      deskripsi: ['', Validators.required],
    }));
  }

  removePengalaman(index: number) {
    this.pengalamanData.removeAt(index);
  }

  onCheckboxChange(index: number) {
    const pengalamanGroup = this.pengalamanData.at(index);
    const masihBekerja = pengalamanGroup.get('masihBekerja')?.value;
    const selesaiControl = pengalamanGroup.get('selesai');

    if (masihBekerja) {
      selesaiControl?.disable();
      selesaiControl?.reset();
    } else {
      selesaiControl?.enable();
    }
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
    if (this.teacherForm.invalid) {
      console.error('Form tidak valid');
      return;
    }
    const formData = this.teacherForm.value;
    console.log('Form data:', formData);
    try {
      const response = await axios.post(`${environment.apiUrl}/edit-teacher`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      this.presentToast('Informasi guru berhasil diperbarui', 'success');
      this.router.navigate(['manage-course']);
      await loading.dismiss();
      console.log('Response:', response.data);
      
    } catch (error) {
      this.presentToast('Gagal menyimpan data', 'danger');
      await loading.dismiss();
      console.error('Gagal menyimpan data', error);
    }
  }
  
  presentToast(message: string, color: string = 'success') {
    const toast = this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.then(toast => toast.present());
  }
}
