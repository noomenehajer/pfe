import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/admin';
  private authUrl="http://localhost:3000";

  constructor(private http: HttpClient) { }

  signupStudent(nom: string, prenom: string, email: string, motDePasse: string): Observable<any> {
    const body = { nom, prenom, email, motDePasse, estValide: false };
    return this.http.post(`${this.authUrl}/signup`, body);
  }

  loginStudent(email: string, motDePasse: string): Observable<any> {
    const body = { email, motDePasse };
    return this.http.post(`${this.authUrl}/loginstudent`, body);
  }



  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  // getCurrentUser(): any {
  //   const currentUser = localStorage.getItem('currentUser');
  //   if (currentUser) {
  //     return JSON.parse(currentUser);
  //   }
  //   return null;
  // }

}

