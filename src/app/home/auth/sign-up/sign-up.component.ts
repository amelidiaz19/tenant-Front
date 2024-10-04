import { Component, inject, Input } from '@angular/core';
import { UserInfo } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignUpComponent {
  @Input('id') id!: string;
  router = inject(Router);
  FlagLoading = false;
  Registrar() {}
  toggleLoading() {
    this.FlagLoading = !this.FlagLoading;
  }
}
