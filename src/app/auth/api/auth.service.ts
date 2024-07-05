import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthInterface } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://core.nekta.cloud/api/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password, personal_data_access: true };
    return this.http.post<AuthInterface>(this.apiUrl, body);
  }
}
