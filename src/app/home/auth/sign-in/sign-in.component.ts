import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { InputComponent } from '../../../components/input/input.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export class SignInComponent {
  router = inject(Router);
  authService = inject(AuthService);

  componentToShow: string = 'welcome';

  closeResult = '';
  email: string = '';
  password: string = '';
  usuario: any = {
    nombre: '',
    apellido: '',
    documento: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    tenantId: '',
    tenantName: '',
    tiponegocio: '',
    RolId: null,
  };
  login() {}
  autenticar() {}

  registrar(flag: boolean) {
    //this.authService.setIsRegistering(flag);
    this.router.navigateByUrl('autenticacion/registrar');
  }

  abrirModal(content: any) {}

  private getDismissReason(reason: any): string {
    return '';
  }
}
