import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import {
  ModalController,
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

interface Bab {
  judul: string;
  subBab: string;
  materi: File | null;
  deskripsi: string;
  subBabList: SubBab[];
}

interface SubBab {
  judul: string;
  subBabId: string;
  subBab: string;
  materi: File | null;
  deskripsi: string;
  jenis: string;
  pilihSubBab: string;
  jenisMateri: string;
  question: Pertanyaan[];
  waktuKuis: number;
}

interface Pertanyaan {
  id: number;
  question: string;
  opsiList: answers[];
  point: number;
  question_image: File | null;
  jawabanBenar: string;
  justification: string;
}

interface answers {
  id: number;
  text: string;
  isChecked: boolean;
  is_correct: number;
  justification: string;
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
      const response = await axios.get(
        `${environment.apiUrl}/detail-course/${courseId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem('authToken')}`,
            'X-API-KEY': environment.bsaApiKey,
          },
        }
      );
      const courseData = response.data.course;
      console.log(courseData.course_is_free);
      console.log(courseData.sub_category.sub_category_name);

      // Assigning course data to formData
      this.formData.judulKursus = courseData.course_title;
      this.formData.tingkatan = this.mapCourseLevelToTingkatan(
        courseData.course_level
      );
      this.formData.bidang = courseData.sub_category.category.category_name;
      this.formData.subBidang = courseData.sub_category.sub_category_name;
      this.formData.deskripsi = courseData.course_description;
      this.formData.bannerKursus = courseData.course_image;
      this.formData.jenisHarga =
        courseData.course_is_free === 'yes' ? 'free' : 'berbayar';
      this.formData.hargaKursus = courseData.course_price;
      this.formData.hargaDiskon = courseData.course_price_discount;
      this.formData.jenisLangganan = courseData.course_duration
        ? 'limited'
        : 'unlimited';
      this.formData.jumlahBulan = courseData.course_duration;

      // Handling babList and subBabList
      this.formData.babList = courseData.material_bab.map((bab: any) => ({
        judul: bab.title,
        subBabList: bab.course_materials.map((subBab: any) => ({
          judul: subBab.material_sub_title,
          subBabId: subBab.material_id,
          materi: subBab.material_file,
          deskripsi: subBab.material_description,
          jenisMateri: subBab.material_id < 0 ? 'Quiz' : 'Materi',
        })),
      }));
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  }

  fetchSubBidangOptions(selectedBidang: string) {
    const selectedBidangData: any = this.bidangOptions.find(
      (bidang: any) => bidang.category_name === selectedBidang
    );
    if (selectedBidangData) {
      this.subBidangOptions = selectedBidangData.sub_category.map(
        (sub: any) => sub.sub_category_name
      );
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
            formDataToSend.append(
              `babList[${index}][subBabList][${subIndex}][subBabId]`,
              subBab.subBabId
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

        if (bab.subBabList && bab.subBabList.length > 0) {
          bab.subBabList.forEach((subBab, subBabIndex) => {
            if (subBab.question && subBab.question.length > 0) {
              subBab.question.forEach((question, pertanyaanIndex) => {
                formDataToSend.append(
                  `babList[${index}][subBabList][${subBabIndex}][question][${pertanyaanIndex}][question]`,
                  question.question
                );

                question.opsiList.forEach((opsi, opsiIndex) => {
                  formDataToSend.append(
                    `babList[${index}][subBabList][${subBabIndex}][question][${pertanyaanIndex}][answers][${opsiIndex}][answer]`,
                    opsi.text
                  );

                  formDataToSend.append(
                    `babList[${index}][subBabList][${subBabIndex}][question][${pertanyaanIndex}][answers][${opsiIndex}][is_correct]`,
                    opsi.is_correct.toString()
                  );
                });

                formDataToSend.append(
                  `babList[${index}][subBabList][${subBabIndex}][question][${pertanyaanIndex}][justification]`,
                  question.justification
                )

                formDataToSend.append(
                  `babList[${index}][subBabList][${subBabIndex}][question][${pertanyaanIndex}][jawabanBenar]`,
                  question.jawabanBenar
                );

                if (question.point) {
                  formDataToSend.append(
                    `babList[${index}][subBabList][${subBabIndex}][question][${pertanyaanIndex}][point]`,
                    question.point.toString()
                  );
                }

                if (question.question_image) {
                  formDataToSend.append(
                    `babList[${index}][subBabList][${subBabIndex}][question][${pertanyaanIndex}][question_image]`,
                    question.question_image
                  );
                }
              });
            }
          });
        }
      });

      await axios.post(
        `${environment.apiUrl}/edit-course/${this.courseId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `${localStorage.getItem('authToken')}`,
            'X-API-KEY': environment.bsaApiKey,
          },
        }
      );

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
      jenisMateri: '',
      question: [],
      waktuKuis: 0,
    };
    this.formData.babList[babIndex].subBabList.push(newSubBab);
  }

  removeSubBab(babIndex: number, subBabIndex: number) {
    this.formData.babList[babIndex].subBabList.splice(subBabIndex, 1);
  }

  addPertanyaan(babIndex: number, subBabIndex: number) {
    const newPertanyaan: Pertanyaan = {
      id: this.pertanyaanIdCounter++,
      question: '',
      opsiList: [],
      point: 0,
      jawabanBenar: '',
      question_image: null,
      justification: '',
    };

    if (babIndex >= 0 && babIndex < this.formData.babList.length) {
      const bab = this.formData.babList[babIndex];
      if (subBabIndex >= 0 && subBabIndex < bab.subBabList.length) {
        bab.subBabList[subBabIndex].question.push(newPertanyaan);
      }
    }
  }

  removePertanyaan(babIndex: number, pertanyaanIndex: number) {
    
    if (babIndex < 0 || babIndex >= this.formData.babList.length) {
      console.log('Invalid babIndex:', babIndex);
      
      return;
    }
    const bab = this.formData.babList[babIndex];
    if (bab.subBabList.length > 0) {
      const subBab = bab.subBabList[0];
      console.log(subBab);
      
      console.log(subBab.question);
      
      if (pertanyaanIndex >= 0 && pertanyaanIndex < subBab.question.length) {
        subBab.question.splice(pertanyaanIndex, 1);
      }
    }
  }

  addOpsi(babIndex: number, subBabIndex: number, pertanyaanIndex: number) {
    const newOpsi: answers = {
      id: this.opsiIdCounter++,
      text: '',
      isChecked: false,
      is_correct: 0,
      justification: '',
    };
    const bab = this.formData.babList[babIndex];
    if (bab.subBabList.length > subBabIndex) {
      const subBab = bab.subBabList[subBabIndex];
      if (subBab.question.length > pertanyaanIndex) {
        subBab.question[pertanyaanIndex].opsiList.push(newOpsi);
      }
    }
  }

  removeOpsi(question: any, opsi: any) {
    const index = question.opsiList.indexOf(opsi);
    if (index !== -1) {
      question.opsiList.splice(index, 1);
    }
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
    return await this.loadingCtrl
      .create({
        duration: 2000,
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'));
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
        parseInt(this.formData.hargaDiskon) <=
          parseInt(this.formData.hargaKursus)
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
      const file = input.files[0];
      if (index !== undefined && field === 'materi' && subIndex === undefined) {
        this.formData.babList[index].materi = file;
      } else if (
        index !== undefined &&
        field === 'materi' &&
        subIndex !== undefined
      ) {
        this.formData.babList[index].subBabList[subIndex].materi = file;
      } else if (field === 'bannerKursus') {
        this.formData.bannerKursus = file;
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const imgElement = document.getElementById(
            'bannerImage'
          ) as HTMLImageElement;
          if (imgElement) {
            imgElement.src = result;
          }
        };
        reader.readAsDataURL(file);
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

  setCorrectAnswer(question: any, selectedOpsi: any) {
    question.opsiList.forEach((opsi: any) => {
      if (opsi.id === selectedOpsi.id) {
        opsi.is_correct = 1;
      } else {
        opsi.is_correct = 0;
      }
    });
  }
}
