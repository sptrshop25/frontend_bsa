import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { IonSearchbar } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.page.html',
  styleUrls: ['./search-course.page.scss'],
})
export class SearchCoursePage implements OnInit {
  searchHistory: any[] = [];
  searchResults: any[] = [];
  searchHistoryPlaceholder: string = '';
  @ViewChild('searchbar') searchbar!: IonSearchbar;

  constructor(private router: Router) {}

  ngOnInit() {
    this.fetchSearchHistory();
  }

  async fetchSearchHistory() {
    try {
      const response = await axios.get(`${environment.apiUrl}/search_history`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.searchHistory = response.data;
      this.searchHistoryPlaceholder = this.generatePlaceholder();
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  }

  async deleteSearchHistoryItem(id: number) {
    try {
      await axios.delete(`${environment.apiUrl}/search_history/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.searchHistory = this.searchHistory.filter(item => item.id !== id);
      this.searchHistoryPlaceholder = this.generatePlaceholder();
    } catch (error) {
      console.error('Error deleting search history item:', error);
    }
  }

  async deleteAllSearchHistory() {
    try {
      await axios.delete(`${environment.apiUrl}/search_history`, {
        headers: {
          Authorization: `${localStorage.getItem('authToken')}`,
          'X-API-KEY': environment.bsaApiKey,
        },
      });
      this.searchHistory = [];
      this.searchHistoryPlaceholder = 'Cari kursus';
    } catch (error) {
      console.error('Error deleting all search history:', error);
    }
  }

  setSearchQuery(query: string) {
    this.searchbar.value = query;
    this.searchCourses(query);
  }


  async searchCourses(query: string) {
    this.router.navigate(['/hasil-cari'], { queryParams: { q: query } });
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      this.searchCourses(inputElement.value);
    }
  }

  generatePlaceholder(): string {
    const importantKeywords: string[] = this.extractImportantKeywords();
    return importantKeywords.length > 0 ? `Cari kursus ${importantKeywords[0]}` : 'Cari kursus';
  }

  extractImportantKeywords(): string[] {
    const angularKeywords: string[] = ['angular', 'typescript', 'frontend'];
    const reactKeywords: string[] = ['react', 'javascript', 'frontend'];

    for (let i = 0; i < this.searchHistory.length; i++) {
      const words: string[] = this.searchHistory[i].search_query.toLowerCase().split(' ');
      for (let j = 0; j < words.length; j++) {
        if (angularKeywords.includes(words[j])) {
          return ['Angular'];
        } else if (reactKeywords.includes(words[j])) {
          return ['React'];
        }
      }
    }

    return [];
  }
}
