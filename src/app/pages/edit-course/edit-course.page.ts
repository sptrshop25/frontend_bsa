import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { ModalController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

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
  subBabId: string;
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
  babList: Bab[];
}

interface Module {
  module_title: string;
  sub_modules: SubModule[];
  questions: Question[];
}

interface SubModule {
  sub_module_title: string;
  sub_module_type: string;
}

interface Question {
  question_text: string;
  options: Option[];
  explanation: string;
}

interface Option {
  option_text: string;
}

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.page.html',
  styleUrls: ['./edit-course.page.scss'],
})
export class EditCoursePage implements OnInit {
  isLoading = false;
  courseId: string | null = null;
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
    babList: [],
  };

  bidangOptions: any[] = [];
  subBidangOptions: any[] = [];
  private pertanyaanIdCounter = 1;
  private opsiIdCounter = 1;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.fetchCategories();
    this.addBab();
    this.courseId = this.route.snapshot.paramMap.get('course_id');
    if (this.courseId) {
      await this.loadCourseData(this.courseId);
    }
  }

  async loadCourseData(courseId: string) {
    try {
      const response = await axios.get(`${environment.apiUrl}/detail-course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const courseData = response.data.course;
      console.log(courseData.course_is_free);
      console.log(courseData.sub_category.sub_category_name);
  
      // Assigning course data to formData
      this.formData.judulKursus = courseData.course_title;
      this.formData.tingkatan = this.mapCourseLevelToTingkatan(courseData.course_level);
      this.formData.bidang = courseData.sub_category.category.category_name;
      this.formData.subBidang = courseData.sub_category.sub_category_name;
      this.formData.deskripsi = courseData.course_description;
      this.formData.bannerKursus = courseData.course_image;
      this.formData.jenisHarga = courseData.course_is_free === 'yes' ? 'free' : 'berbayar';
      this.formData.hargaKursus = courseData.course_price;
      this.formData.hargaDiskon = courseData.course_price_discount;
      this.formData.jenisLangganan = courseData.course_duration ? 'limited' : 'unlimited';
      this.formData.jumlahBulan = courseData.course_duration;
  
      // Handling babList and subBabList
      this.formData.babList = courseData.material_bab.map((bab: any) => ({
        judul: bab.title,
        subBabList: bab.course_materials.map((subBab: any) => ({
          judul: subBab.material_sub_title,
          subBabId: subBab.material_id,
          materi: subBab.material_file,
          deskripsi: subBab.material_description,
          pilihSubBab: 'Materi',
        })),
        pertanyaanList: [], // Initialize if needed
      }));
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  }
  

  fetchSubBidangOptions(selectedBidang: string) {
    const selectedBidangData: any = this.bidangOptions.find((bidang: any) => bidang.category_name === selectedBidang);
    if (selectedBidangData) {
      this.subBidangOptions = selectedBidangData.sub_category.map((sub: any) => sub.sub_category_name);
    }
  }
  
  mapCourseLevelToTingkatan(courseLevel: string): string {
    switch (courseLevel) {
      case 'beginner':
        return 'Pemula';
      case 'intermediate':
        return 'Menengah';
      case 'advanced':
        return 'Ahli';
      default:
        return 'Pemula'; // Default value
    }
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
    const selectedBidang = this.bidangOptions.find(
      bidang => bidang.category_name === this.formData.bidang
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
            formDataToSend.append(
              `babList[${index}][subBabList][${subIndex}][subBabId]`,
              subBab.subBabId
            )
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
            formDataToSend.append(
              `babList[${index}][subBabList][${subIndex}][jenis]`,
              subBab.jenis
            );
            formDataToSend.append(
              `babList[${index}][subBabList][${subIndex}][pilihSubBab]`,
              subBab.pilihSubBab
            );
          });
        }

        if (bab.pertanyaanList && bab.pertanyaanList.length > 0) {
          bab.pertanyaanList.forEach((pertanyaan, pertanyaanIndex) => {
            formDataToSend.append(
              `babList[${index}][pertanyaanList][${pertanyaanIndex}][pertanyaan]`,
              pertanyaan.pertanyaan
            );
            formDataToSend.append(
              `babList[${index}][pertanyaanList][${pertanyaanIndex}][kenapaJawabanBenar]`,
              pertanyaan.kenapaJawabanBenar
            );
            pertanyaan.opsiList.forEach((opsi, opsiIndex) => {
              formDataToSend.append(
                `babList[${index}][pertanyaanList][${pertanyaanIndex}][opsiList][${opsiIndex}][text]`,
                opsi.text
              );
            });
          });
        }
      });

      await axios.post(`${environment.apiUrl}/edit-course/${this.courseId}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      await loading.dismiss();
      this.router.navigate(['/management-course']);

      this.presentToast('Kursus berhasil diperbarui', 'success');
      
    } catch (error) {
      await loading.dismiss();
      this.presentToast('Terjadi kesalahan', 'danger');
      console.error('Error updating course:', error);
    }
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

  removeBab(index: number) {
    this.formData.babList.splice(index, 1);
  }

  addSubBab(babIndex: number) {
    const newSubBab: SubBab = {
      judul: '',
      subBab: '',
      subBabId: '',
      materi: null,
      deskripsi: '',
      jenis: '',
      pilihSubBab: '',
    };
    this.formData.babList[babIndex].subBabList.push(newSubBab);
  }

  removeSubBab(babIndex: number, subBabIndex: number) {
    this.formData.babList[babIndex].subBabList.splice(subBabIndex, 1);
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

  removePertanyaan(babIndex: number, pertanyaanIndex: number) {
    this.formData.babList[babIndex].pertanyaanList.splice(pertanyaanIndex, 1);
  }

  addOpsi(babIndex: number, pertanyaanIndex: number) {
    const newOpsi: Opsi = {
      id: this.opsiIdCounter++,
      text: '',
    };
    this.formData.babList[babIndex].pertanyaanList[pertanyaanIndex].opsiList.push(newOpsi);
  }

  removeOpsi(babIndex: number, pertanyaanIndex: number, opsiIndex: number) {
    this.formData.babList[babIndex].pertanyaanList[pertanyaanIndex].opsiList.splice(opsiIndex, 1);
  }

  async showCustomAlert(header: string, message: string, buttons: any[]) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
    });

    await alert.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      duration: 2000,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  isCheckmarkDisabled(): boolean {
    const isBabListValid = this.formData.babList.every((bab) => {
      if (!bab.judul || !bab.subBab || !bab.deskripsi) return false;
      if (bab.subBabList && bab.subBabList.length > 0) {
        return bab.subBabList.every(
          (subBab) => subBab.judul && subBab.subBab && subBab.deskripsi
        );
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
      if (
        this.formData.hargaDiskon &&
        parseInt(this.formData.hargaDiskon) <= parseInt(this.formData.hargaKursus)
      ) {
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
    if (!isBabListValid) {
      isDisabled = true;
    }
    if (!this.formData.bannerKursus) {
      isDisabled = true;
    }

    return isDisabled;
  }

  handleFileInput(event: Event, field: string, index?: number, subIndex?: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      // Set nilai formData sesuai dengan kondisi field yang diberikan
      if (index !== undefined && field === 'materi' && subIndex === undefined) {
        this.formData.babList[index].materi = file;
      } else if (index !== undefined && field === 'materi' && subIndex !== undefined) {
        this.formData.babList[index].subBabList[subIndex].materi = file;
      } else if (field === 'bannerKursus') {
        this.formData.bannerKursus = file;
  
        // Jika Anda ingin langsung memperbarui tampilan img saat banner diubah
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const imgElement = document.getElementById('bannerImage') as HTMLImageElement;
          if (imgElement) {
            imgElement.src = result; // Memperbarui src img dengan data URL
          }
        };
        reader.readAsDataURL(file); // Membaca file sebagai data URL
      }
    }
  }
  
  

  async onCheckmarkClick() {
    this.isLoading = true;
    await this.onSubmit();
    this.isLoading = false;
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
}
