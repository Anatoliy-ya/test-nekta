import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { AuthResponseInterface } from '../api/auth.interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('login', this.email, this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (response: AuthResponseInterface) => {
        console.log('Login successful', response);
        const access_token = response.data.access_token;
        if (!access_token) {
          return;
        }
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/devices']);
      },
      error: (error) => {
        console.log('Login failed', error);
      },
    });
  }
}
