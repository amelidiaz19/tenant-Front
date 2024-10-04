import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent, ModalComponent],
  templateUrl: './sign-in.component.html',
  styles: ``,
})
export class SignInComponent {
  router = inject(Router);
  authService = inject(AuthService);
  FlagModal = false;
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
    RolId: 4,
  };

  login() {
    this.authService
      .Logged(this.usuario.email, this.usuario.password)
      .subscribe(
        (response) => {
          console.log(response.usuario.Rol.nombre);
          if (response.usuario.Rol.nombre == 'alumno') {
            console.log('entra');
            this.router.navigate(['/panel']);
          } else {
            console.log('entra dashboard');
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
          });
        }
      );
  }

  validateDatos() {
    return (
      this.usuario.nombre !== '' &&
      this.usuario.apellido !== '' &&
      this.usuario.documento !== '' &&
      this.usuario.direccion !== '' &&
      this.usuario.telefono !== '' &&
      this.usuario.email !== '' &&
      this.usuario.password !== '' &&
      this.usuario.tenantId !== '' &&
      this.usuario.RolId !== null
    );
  }

  register() {
    this.authService.register(this.usuario).subscribe(
      (response) => {
        this.FlagModal = false;
        Swal.fire({
          icon: 'success',
          title: 'Entidad Registrada',
          text: response.message,
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
        });
      }
    );
  }
  toggleModal() {
    this.FlagModal = !this.FlagModal;
  }

  private getDismissReason(reason: any): string {
    return '';
  }
}
