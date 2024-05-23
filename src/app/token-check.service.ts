import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenCheckService {

  constructor(private http: HttpClient) { }

  checkTokenValidity(): Promise<boolean> {
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {
      return Promise.resolve(false);
    }
  
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `${authToken}`);
  
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<any>('http://127.0.0.1:8000/api/cek_token', { headers, observe: 'response' })
        .subscribe(
          (response) => {
            console.log("Response:", response);
            const status = response.status;
            resolve(status === 200 && response.body.message === 'Token is valid');
          },
          (error) => {
            console.log(error.error);
            resolve(false);
          }
        );
    });
  }
  
}  