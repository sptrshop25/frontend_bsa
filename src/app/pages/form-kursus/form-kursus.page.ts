import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Bab {
  judul: string;
  subBab: string;
  materi: File | null;
  deskripsi: string;
  subBabList: SubBab[]; // Pastikan subBabList diinisialisasi di sini
}

interface SubBab {
  judul: string;
  subBab: string;
  materi: File | null;
  deskripsi: string;
}

interface FormData {
  judulKursus: string;
  hargaKursus: string;
  hargaDiskon: string;
  tingkatan: string;
  bidang: string;
  subBidang: string;
  bannerKursus: File | null;
  deskripsi: string;
  jenisLangganan: string;
  jenisHarga: string;
  jumlahBulan: string;
  babList: Bab[];
}

@Component({
  selector: 'app-form-kursus',
  templateUrl: './form-kursus.page.html',
  styleUrls: ['./form-kursus.page.scss'],
})
export class FormKursusPage {
  formData: FormData = {
    judulKursus: '',
    hargaKursus: '',
    hargaDiskon: '',
    tingkatan: '',
    bidang: '',
    subBidang: '',
    bannerKursus: null,
    deskripsi: '',
    jenisLangganan: '',
    jenisHarga: '',
    jumlahBulan: '',
    babList: []
  };

  bidangOptions: any[] = [];
  subBidangOptions: any[] = [];

  constructor(private modalController: ModalController, private alertController: AlertController, private router: Router) { }

  async ngOnInit() {
    await this.fetchCategories();
    this.addBab();
  }

  async fetchCategories() {
    try {
      const response = await axios.get(`${environment.apiUrl}/list-category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      this.bidangOptions = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  onBidangChange() {
    const selectedBidang = this.bidangOptions.find(bidang => bidang.category_name === this.formData.bidang);
    this.subBidangOptions = selectedBidang ? selectedBidang.sub_category : [];
  }

  async onSubmit() {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('judulKursus', this.formData.judulKursus);
      formDataToSend.append('hargaKursus', this.formData.hargaKursus);
      formDataToSend.append('hargaDiskon', this.formData.hargaDiskon);
      formDataToSend.append('tingkatan', this.formData.tingkatan);
      formDataToSend.append('bidang', this.formData.bidang);
      formDataToSend.append('subBidang', this.formData.subBidang);
      if (this.formData.bannerKursus) {
        formDataToSend.append('bannerKursus', this.formData.bannerKursus);
      }
      formDataToSend.append('deskripsi', this.formData.deskripsi);
      formDataToSend.append('jenisLangganan', this.formData.jenisLangganan);
      formDataToSend.append('jenisHarga', this.formData.jenisHarga);
      formDataToSend.append('jumlahBulan', this.formData.jumlahBulan);

      this.formData.babList.forEach((bab, index) => {
        formDataToSend.append(`babList[${index}][judul]`, bab.judul);
        formDataToSend.append(`babList[${index}][subBab]`, bab.subBab);
        if (bab.materi) {
          formDataToSend.append(`babList[${index}][materi]`, bab.materi);
        }
        formDataToSend.append(`babList[${index}][deskripsi]`, bab.deskripsi);
        
        // Kirim juga subBabList di sini
        if (bab.subBabList && bab.subBabList.length > 0) {
          bab.subBabList.forEach((subBab, subIndex) => {
            formDataToSend.append(`babList[${index}][subBabList][${subIndex}][judul]`, subBab.judul);
            formDataToSend.append(`babList[${index}][subBabList][${subIndex}][subBab]`, subBab.subBab);
            if (subBab.materi) {
              formDataToSend.append(`babList[${index}][subBabList][${subIndex}][materi]`, subBab.materi);
            }
            formDataToSend.append(`babList[${index}][subBabList][${subIndex}][deskripsi]`, subBab.deskripsi);
          });
        }
      });

      const response = await axios.post(`${environment.apiUrl}/create_course`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      this.presentAlert('Akun anda berhasil terdaftar sebagai pengajar');
      if (response.status === 200) {
        // console.log(response);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      this.errorAlert('Terjadi kesalahan, coba beberapa saat kedepan');
      console.error('Error submitting form:', error);
    }
  }

  async errorAlert(messages?: string) {
    const alert = await this.alertController.create({
      header: 'Gagal',
      message: messages,
      buttons: ['Coba Lagi'],
    });

    await alert.present();
  }

  addBab() {
    const newBab: Bab = {
      judul: '',
      subBab: '',
      materi: null,
      deskripsi: '',
      subBabList: [] // Inisialisasi subBabList di sini
    };
    this.formData.babList.push(newBab);
  }

  addSubBab(parentIndex: number) {
    // Check if subBabList is defined
    if (!this.formData.babList[parentIndex].subBabList) {
      this.formData.babList[parentIndex].subBabList = [];
    }
  
    const newSubBab: SubBab = {
      judul: '',
      subBab: '', // Pastikan properti subBab ditambahkan di sini
      materi: null,
      deskripsi: ''
    };
  
    // Tambahkan newSubBab ke dalam subBabList
    this.formData.babList[parentIndex].subBabList.push(newSubBab);
  }

  removeBab(index: number) {
    this.formData.babList.splice(index, 1);
  }

  removeSubBab(parentIndex: number, childIndex: number) {
    this.formData.babList[parentIndex].subBabList.splice(childIndex, 1);
  }

  handleFileInput(event: Event, field: string, index?: number, subIndex?: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (index !== undefined && field === 'materi' && subIndex === undefined) {
        this.formData.babList[index].materi = input.files[0];
      } else if (index !== undefined && field === 'materi' && subIndex !== undefined) {
        this.formData.babList[index].subBabList[subIndex].materi = input.files[0];
      } else if (field === 'bannerKursus') {
        this.formData.bannerKursus = input.files[0];
      }
    }
  }

  isCheckmarkDisabled(): boolean {
    const isBabListValid = this.formData.babList.every(bab => {
      if (!bab.judul || !bab.subBab || !bab.deskripsi) return false;
      if (bab.subBabList && bab.subBabList.length > 0) {
        return bab.subBabList.every(subBab => subBab.judul && subBab.subBab && subBab.deskripsi);
      }
      return true;
    });

    let isDisabled = false;

    if (!this.formData.judulKursus) {
      isDisabled = true;
    }
    if (this.formData.jenisHarga === 'berbayar') {
      if (!this.formData.hargaKursus) {
        isDisabled = true;
      }
      if (!this.formData.hargaDiskon) {
        isDisabled = true;
      }
      if (this.formData.hargaDiskon && parseInt(this.formData.hargaDiskon) >= parseInt(this.formData.hargaKursus)) {
        isDisabled = true;
      }
    }
    if (!this.formData.tingkatan) {
      isDisabled = true;
    }
    if (!this.formData.bidang) {
      isDisabled = true;
    }
    if (!this.formData.subBidang) {
      isDisabled = true;
    }
    if (!this.formData.deskripsi) {
      isDisabled = true;
    }
    if (!this.formData.jenisLangganan) {
      isDisabled = true;
    }
    if (this.formData.jenisLangganan === 'limited' && !this.formData.jumlahBulan) {
      isDisabled = true;
    }
    // if (!isBabListValid) {
    //   isDisabled = true;
    // }
    if (!this.formData.bannerKursus) {
      isDisabled = true;
    }

    return isDisabled;
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
        this.router.navigate(['/management-course']);
      }
    });

    await modal.present();
  }

  onCheckmarkClick() {
    this.onSubmit();
  }
}
