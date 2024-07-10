import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Bab {
  judul: string;
  subBab: string;
  materi: File | null;
  deskripsi: string;
  subBabList: SubBab[];
  pertanyaanList: Pertanyaan[];
}

interface SubBab {
  judul: string;
  subBab: string;
  materi: File | null;
  deskripsi: string;
  jenis: string;
  pilihSubBab: string;
}

interface Pertanyaan {
  id: number;
  pertanyaan: string;
  opsiList: Opsi[];
  kenapaJawabanBenar: string;
}

interface Opsi {
  id: number;
  text: string;
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
  pilihSubBab: string;
  babList: Bab[];
}

@Component({
  selector: 'app-form-kursus',
  templateUrl: './form-kursus.page.html',
  styleUrls: ['./form-kursus.page.scss'],
})
export class FormKursusPage {
  isLoading = false;
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
    pilihSubBab: '',
    babList: [],
  };

  bidangOptions: any[] = [];
  subBidangOptions: any[] = [];
  private pertanyaanIdCounter = 1;
  private opsiIdCounter = 1;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router, private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    await this.fetchCategories();
    this.addBab();
  }

  async fetchCategories() {
    try {
      const response = await axios.get(`${environment.apiUrl}/list-category`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.bidangOptions = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  onBidangChange() {
    const selectedBidang = this.bidangOptions.find(
      (bidang) => bidang.category_name === this.formData.bidang
    );
    this.subBidangOptions = selectedBidang ? selectedBidang.sub_category : [];
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await loading.present();
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
  
        if (bab.subBabList && bab.subBabList.length > 0) {
          bab.subBabList.forEach((subBab, subIndex) => {
            formDataToSend.append(
              `babList[${index}][subBabList][${subIndex}][judul]`,
              subBab.judul
            );
            formDataToSend.append(
              `babList[${index}][subBabList][${subIndex}][subBab]`,
              subBab.subBab
            );
            if (subBab.materi) {
              formDataToSend.append(
                `babList[${index}][subBabList][${subIndex}][materi]`,
                subBab.materi
              );
            }
            formDataToSend.append(
              `babList[${index}][subBabList][${subIndex}][deskripsi]`,
              subBab.deskripsi
            );
          });
        }
  
        if (bab.pertanyaanList && bab.pertanyaanList.length > 0) {
          bab.pertanyaanList.forEach((pertanyaan, pertanyaanIndex) => {
            formDataToSend.append(
              `babList[${index}][pertanyaanList][${pertanyaanIndex}][pertanyaan]`,
              pertanyaan.pertanyaan
            );
            pertanyaan.opsiList.forEach((opsi, opsiIndex) => {
              formDataToSend.append(
                `babList[${index}][pertanyaanList][${pertanyaanIndex}][opsiList][${opsiIndex}]`,
                opsi.text
              );
            });
          });
        }
      });
  
      const response = await axios.post(
        `${environment.apiUrl}/create_course`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${localStorage.getItem('authToken')}`,
            'X-API-KEY': environment.bsaApiKey,
          },
        }
      );
      loading.dismiss();
      this.presentAlert('Akun anda berhasil terdaftar sebagai pengajar');
    } catch (error: any | undefined) {
      loading.dismiss();
      if (error.response.data.message !== '') { 
        this.errorAlert("Terjadi kesalahan, silahkan coba lagi nanti");
      } else {
        this.errorAlert("Maksimal size video 128 MB");
      }
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
      subBabList: [],
      pertanyaanList: [],
    };
    this.formData.babList.push(newBab);
  }

  addSubBab(parentIndex: number) {
    const newSubBab: SubBab = {
      judul: '',
      subBab: '',
      materi: null,
      deskripsi: '',
      jenis: '',
      pilihSubBab: '',
    };
    if (!this.formData.babList[parentIndex].subBabList) {
      this.formData.babList[parentIndex].subBabList = [];
    }
    this.formData.babList[parentIndex].subBabList.push(newSubBab);
  }  

  addPertanyaan(babIndex: number) {
    const newPertanyaan: Pertanyaan = {
      id: this.pertanyaanIdCounter++,
      pertanyaan: '',
      opsiList: [],
      kenapaJawabanBenar: '',
    };
    this.formData.babList[babIndex].pertanyaanList.push(newPertanyaan);
  }

  addOpsi(babIndex: number, pertanyaanIndex: number) {
    const newOpsi: Opsi = {
      id: this.opsiIdCounter++,
      text: '',
    };
    this.formData.babList[babIndex].pertanyaanList[
      pertanyaanIndex
    ].opsiList.push(newOpsi);
  }

  removeBab(index: number) {
    this.formData.babList.splice(index, 1);
  }

  removeSubBab(parentIndex: number, childIndex: number) {
    this.formData.babList[parentIndex].subBabList.splice(childIndex, 1);
  }

  removePertanyaan(babIndex: number, pertanyaanIndex: number) {
    this.formData.babList[babIndex].pertanyaanList.splice(pertanyaanIndex, 1);
  }

  removeOpsi(babIndex: number, pertanyaanIndex: number, opsiIndex: number) {
    this.formData.babList[babIndex].pertanyaanList[
      pertanyaanIndex
    ].opsiList.splice(opsiIndex, 1);
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

  isCheckmarkDisabled(): boolean {
    const isBabListValid = this.formData.babList.every((bab) => {
  
      if (!bab.judul) {
        return false;
      }
  
      if (bab.subBabList && bab.subBabList.length > 0) {
        const isSubBabListValid = bab.subBabList.every((subBab) => {
          if (!subBab.judul || !subBab.deskripsi) {
            return false;
          }
          return true;
        });
        if (!isSubBabListValid) {
          return false;
        }
      }
  
      return true;
    });
  
    let isDisabled = !isBabListValid;
  
    if (!this.formData.judulKursus) {
      isDisabled = true;
    }
    if (this.formData.jenisHarga === 'berbayar') {
      if (!this.formData.hargaKursus) {
        return true;
      }
      if (
        this.formData.hargaDiskon &&
        parseInt(this.formData.hargaDiskon) <= parseInt(this.formData.hargaKursus)
      ) {
        return true;
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
    if (
      this.formData.jenisLangganan === 'limited' &&
      !this.formData.jumlahBulan
    ) {
      isDisabled = true;
    }
    if (!this.formData.bannerKursus) {
      isDisabled = true;
    }
  
    return isDisabled;
  }
  
  
  handleFileInput(
    event: Event,
    field: string,
    index?: number,
    subIndex?: number
  ) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (index !== undefined && field === 'materi' && subIndex === undefined) {
        this.formData.babList[index].materi = input.files[0];
      } else if (
        index !== undefined &&
        field === 'materi' &&
        subIndex !== undefined
      ) {
        this.formData.babList[index].subBabList[subIndex].materi =
          input.files[0];
      } else if (field === 'bannerKursus') {
        this.formData.bannerKursus = input.files[0];
      }
    }
  }
  onCheckmarkClick() {
    this.isLoading = true;
    this.onSubmit();
    this.isLoading = false;  
  }
}
