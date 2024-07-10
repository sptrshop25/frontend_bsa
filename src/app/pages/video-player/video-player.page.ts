import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.page.html',
  styleUrls: ['./video-player.page.scss'],
})
export class VideoPlayerPage implements OnInit {
  materialBab: any[] = [];
  currentBabIndex: number = 0; 
  material: any = {};
  materialId: string | null = '';
  courseId: string | null = '';
  isCompleted: boolean = false;
  isPreviousDisabled: boolean = true;
  isNextDisabled: boolean = false;

  constructor(private route: ActivatedRoute, private modalController: ModalController, private alertController: AlertController) {}

  ngOnInit() {
    this.materialId = this.route.snapshot.paramMap.get('material_id');
    this.courseId = this.route.snapshot.paramMap.get('course_id');
    if (this.materialId && this.courseId) {
      this.getMaterialDetails(this.materialId);
      this.getListMateri(this.courseId);
    } else {
      console.error('Material ID or Course ID is null');
    }
  }

  async getMaterialDetails(id: string) {
    try {
      const response = await axios.get(`${environment.apiUrl}/detail-materi/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.material = response.data;
      this.isCompleted = this.material.material_success.length > 0;
    } catch (error) {
      console.error('Error fetching material details:', error);
    }
  }

  async getListMateri(id: string) {
    try {
      const response = await axios.get(`${environment.apiUrl}/list_materi/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.materialBab = response.data;
      for (let i = 0; i < this.materialBab.length; i++) {
        const bab = this.materialBab[i];
        const materialIndex = bab.course_materials.findIndex((mat: any) => mat.material_id === id);
        if (materialIndex !== -1) {
          this.currentBabIndex = i;
          this.material = bab.course_materials[materialIndex];
          break;
        }
      }
      this.updateNavigationButtons();
    } catch (error) {
      console.error('Error fetching material details:', error);
    }
  }

  markFinish(courseId: string, materialId: string | null) {
    axios.post(`${environment.apiUrl}/material-mark-finish`, {
      course_id: courseId,
      material_id: materialId
    }, {
      headers: {
        Authorization: `${localStorage.getItem('authToken')}`,
        'X-API-KEY': environment.bsaApiKey
      }
    })
    .then((response) => {
      this.Alert('Berhasil menandai materi ini selesai!');
      this.isCompleted = true;
    })
    .catch((error) => {
      console.error('Error marking course as finished:', error);
    });
  }

  async Alert(messages?: string) {
    const alert = await this.alertController.create({
      header: 'Berhasil',
      message: messages,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  goToPreviousMaterial() {
    if (this.currentBabIndex > 0) {
      this.currentBabIndex--;
      const previousMaterialId = this.materialBab[this.currentBabIndex].course_materials[0].material_id;
      this.getMaterialDetails(previousMaterialId);
    }
    this.updateNavigationButtons();
  }

  // Fungsi untuk navigasi ke bab berikutnya
  goToNextMaterial() {
    if (this.currentBabIndex < this.materialBab.length - 1) {
      this.currentBabIndex++;
      const nextMaterialId = this.materialBab[this.currentBabIndex].course_materials[0].material_id;
      this.getMaterialDetails(nextMaterialId);
    }
    this.updateNavigationButtons();
  }

  // Fungsi untuk memperbarui status tombol navigasi
  updateNavigationButtons() {
    this.isPreviousDisabled = this.currentBabIndex === 0;
    this.isNextDisabled = this.currentBabIndex === this.materialBab.length - 1;
  }
}
