import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nombreUsuario = '';
  pass = '';
  loading = false;
  errorMessage = '';
  hide = signal(true);

  constructor(private authService: LoginService, private router: Router) { }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onLogin() {
    this.loading = true;
    this.errorMessage = '';
    this.authService.login(this.nombreUsuario, this.pass).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/personas']);
        location.reload();
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
      },
    });
  }
}
