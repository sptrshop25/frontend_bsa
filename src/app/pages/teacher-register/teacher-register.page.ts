import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.page.html',
  styleUrls: ['./teacher-register.page.scss'],
})
export class TeacherRegisterPage implements OnInit {
  teacherForm: FormGroup;

  constructor(private fb: FormBuilder, private navCtrl: NavController, private modalController: ModalController, private alertController: AlertController, private router: Router) {
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

    this.addPendidikan(); // Add at least one set of education inputs by default
    this.addPengalaman(); // Add at least one experience input by default
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
        this.router.navigate(['/manage-course']);
      }
    });

    await modal.present();
  }

  ngOnInit() {}

  // Convenience getters for easy access to form arrays
  get teacherData(): FormArray {
    return this.teacherForm.get('teacherData') as FormArray;
  }

  get pengalamanData(): FormArray {
    return this.teacherForm.get('pengalamanData') as FormArray;
  }

  // Method to add education form group
  addPendidikan() {
    this.teacherData.push(this.fb.group({
      gelar: ['', Validators.required],
      sekolah: ['', Validators.required],
      jurusan: ['', Validators.required],
      tahun: ['', Validators.required],
    }));
  }

  // Method to remove education form group
  removePendidikan(index: number) {
    this.teacherData.removeAt(index);
  }

  // Method to add experience form group
  addPengalaman() {
    this.pengalamanData.push(this.fb.group({
      judul: ['', Validators.required],
      posisi: ['', Validators.required],
      mulai: ['', Validators.required],
      selesai: [{value: '', disabled: false}, Validators.required],
      masihBekerja: [false],
      deskripsi: ['', Validators.required],
    }));
  }

  // Method to remove experience form group
  removePengalaman(index: number) {
    this.pengalamanData.removeAt(index);
  }

  // Method to handle change in "Masih Bekerja" checkbox
  onCheckboxChange(index: number) {
    const pengalaman = this.pengalamanData.at(index);
    const masihBekerjaControl = pengalaman.get('masihBekerja') as AbstractControl;
    const selesaiControl = pengalaman.get('selesai') as AbstractControl;

    if (masihBekerjaControl.value) {
      selesaiControl.disable();
    } else {
      selesaiControl.enable();
    }
  }

  // Method called on form submission
  onSubmit() {
    if (this.teacherForm.valid) {
      const formData = this.teacherForm.value;
      console.log('Form data:', formData);
      
      axios.post(`${environment.apiUrl}/register/teacher`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
        .then((response) => {
          this.presentAlert('Akun anda berhasil terdaftar sebagai pengajar');
          this.navCtrl.navigateRoot('/manage-course');
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    } else {
      this.teacherForm.markAllAsTouched();
      console.log('Form is not valid');
    }
  }
}
