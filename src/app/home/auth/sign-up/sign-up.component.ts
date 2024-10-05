import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../components/input/input.component';
import { SelectComponent } from '../../../components/select/select.component';
import { v4 as uuidv4 } from 'uuid';

import KRGlue from '@lyracom/embedded-form-glue';
import { PaymentService } from '../../../services/payment.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, InputComponent, SelectComponent],
  templateUrl: './sign-up.component.html',
  styles: ``,
})
export class SignUpComponent implements OnInit {
  @Input('id') id!: string;
  router = inject(Router);
  paymentService = inject(PaymentService);
  chRef = inject(ChangeDetectorRef);
  authService = inject(AuthService);
  FlagLoading = false;
  activeIndex = 0;
  selectedFileLogo: File | null = null;
  Logo: any;

  ProgressStyle = {
    width: '0%',
  };
  tiposdeNegocio = [
    {
      id: 1,
      nombre: 'electronica',
    },
    {
      id: 1,
      nombre: 'minimarket',
    },
    {
      id: 1,
      nombre: 'ferreteria',
    },
  ];
  Precios = {
    standar: 5000,
    pro: 15000,
    custom: 20000,
  };
  DatosCuenta: any = {
    usuario: {
      nombre: '',
      apellido: '',
      documento: '',
      direccion: '',
      telefono: '',
      email: '',
      password: '',
      RolId: 1,
    },
    tenant: {
      id: '',
      nombre: '',
      tiponegocio: '',
      ruc: '',
      clavesol: '',
      paleta: '',
    },
    hash: {},
  };
  DatosPago = {
    amount: 0,
    currency: 'PEN',
    orderId: ('ORDER-' + uuidv4()).slice(0, 24),
    customer: {
      email: '',
      billingDetails: {
        firstName: '',
        lastName: '',
        cellPhoneNumber: '',
        address: '',
        district: 'Ficus',
        city: 'Santa Anita',
        state: 'Lima',
        country: 'PE',
        identityCode: '',
        identityType: 'DNI',
      },
    },
  };
  ngOnInit(): void {
    if (this.id == 'standar') {
      this.DatosPago.amount = this.Precios.standar;
    } else if (this.id == 'pro') {
      this.DatosPago.amount = this.Precios.pro;
    } else {
      this.DatosPago.amount = this.Precios.custom;
    }
  }
  async ProcesoPagoTarjeta() {
    const endpoint = 'https://api.micuentaweb.pe';
    //const publicKey =
    //  '80203493:publickey_1nPGb868QNn3uq7hs8Q71A2wT0y5WEk9zhm3eKdVczupQ';
    const publicKey =
      '87365204:testpublickey_TjJxMZ9Mzbgk7ga0Zd5Hh59l3AUoNbnN1zwHNUnct4QsU';
    this.PreparaDatos();
    this.ProcederAPago();
    try {
      // Obtener los datos de pago desde el servicio
      const data = await this.paymentService
        .postExternalData(this.DatosPago)
        .toPromise();

      // Cargar la librería de KRGlue y obtener el objeto KR
      const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);

      // Configurar el formulario de pago con el token obtenido
      await KR.setFormConfig({
        formToken: data.formToken,
        'kr-language': 'es-ES',
      });

      // Definir el comportamiento de la validación del pago
      KR.onSubmit(async (paymentData) => {
        try {
          const response = await this.paymentService
            .validatePayment(paymentData)
            .toPromise();

          if (response.Status) {
            // Lógica si el pago fue exitoso
            //this.DatosCuenta.hash = paymentData.hash;
            //this.CreacionTenant();
          } else {
            // Lógica si el pago no fue exitoso
            // this.message = 'no pagado';
          }
        } catch (_error) {
          // Manejo de error en la validación del pago
          // this.message = 'PIPIPI';
        } finally {
          this.chRef.detectChanges();
        }

        return true;
      });

      // Renderizar el formulario en el contenedor especificado
      KR.renderElements('#myPaymentForm');
    } catch (error) {
      console.error('Error en el proceso de pago: ', error);
      // Manejo de errores
    }
  }
  CreacionTenant() {
    this.authService.registerNewTenant(this.DatosCuenta);
  }
  PreparaDatos() {
    this.DatosPago.customer.billingDetails.firstName =
      this.DatosCuenta.usuario.nombre;
    this.DatosPago.customer.billingDetails.lastName =
      this.DatosCuenta.usuario.apellido;
    this.DatosPago.customer.billingDetails.identityCode =
      this.DatosCuenta.usuario.documento;
    this.DatosPago.customer.email = this.DatosCuenta.usuario.email;
    this.DatosPago.customer.billingDetails.cellPhoneNumber =
      this.DatosCuenta.usuario.telefono;
    this.DatosPago.customer.billingDetails.address =
      this.DatosCuenta.usuario.direccion;
  }
  onFileChangePrincipal(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFileLogo = event.target.files[0];
      //cargar imagencarga []
      if (this.selectedFileLogo) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.Logo = e.target.result;
        };
        reader.readAsDataURL(this.selectedFileLogo);
      }
    }
  }
  MoveCarts(div: number, percentaje: number) {
    this.activeIndex = div;
    this.ProgressStyle.width = `${percentaje}%`;
  }

  toggleLoading() {
    this.FlagLoading = !this.FlagLoading;
  }

  EstiloContenedorDatos = {
    display: 'block',
  };
  EstiloPasarella = {
    display: 'none',
  };
  ProcederAPago() {
    this.EstiloContenedorDatos.display = 'none';
    this.EstiloPasarella.display = 'block';
  }
}
