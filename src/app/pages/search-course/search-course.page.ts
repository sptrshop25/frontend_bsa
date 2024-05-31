import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.page.html',
  styleUrls: ['./search-course.page.scss'],
})
export class SearchCoursePage implements OnInit {
  searchHistory: string[] = ['Kursus Angular untuk pemula', 'Belajar React dengan cepat', 'Tutorial React Native'];
  searchHistoryPlaceholder: string = this.generatePlaceholder();

  generatePlaceholder(): string {
    const importantKeywords: string[] = this.extractImportantKeywords();
    return importantKeywords.length > 0 ? `Cari kursus ${importantKeywords[0]}` : 'Cari kursus';
  }

  extractImportantKeywords(): string[] {
    const angularKeywords: string[] = ['angular', 'typescript', 'frontend'];
    const reactKeywords: string[] = ['react', 'javascript', 'frontend'];

    for (let i = 0; i < this.searchHistory.length; i++) {
      const words: string[] = this.searchHistory[i].toLowerCase().split(' ');
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

  ngOnInit() {
  }

}
