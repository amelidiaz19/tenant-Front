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
import Swal from 'sweetalert2';
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
      tiponegocio: 'electronica',
      ruc: '',
      clavesol: '',
      paleta: '',
      dominio: 'fryzan.com',
      dominiofront: 'web1',
    },
    hash: {},
    clientAnswer: {},
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
    //const publicKey = '87365204:testpublickey_TjJxMZ9Mzbgk7ga0Zd5Hh59l3AUoNbnN1zwHNUnct4QsU';

    //technet
    const publicKey =
      '80203493:testpublickey_2h74LTfgBCifM8NOXKuDkUqYUHMbb7jUegkAJqSUYYLgl';
    this.PreparaDatos();
    this.ProcederAPago();
    try {
      // Obtener los datos de pago desde el servicio
      this.paymentService.postExternalData(this.DatosPago).subscribe((data) => {
        KRGlue.loadLibrary(endpoint, publicKey) // Load the remote library
          .then(({ KR }) =>
            KR.setFormConfig({
              //set the minimal configuration
              formToken: data.formToken,
              'kr-language': 'es-ES',
              //to update initialization parameter
            })
          )
          .then(({ KR }) =>
            KR.onSubmit(async (paymentData) => {
              this.paymentService.validatePayment(paymentData).subscribe(
                (response) => {
                  if (response.Status) {
                    this.DatosCuenta.hash = paymentData.hash;
                    this.DatosCuenta.clientAnswer = paymentData.clientAnswer;
                    this.CreacionTenant();
                  } else {
                    //this.message = 'no pagado';
                  }
                  this.chRef.detectChanges();
                },
                (_error) => {
                  //this.message = 'PIPIPI';
                }
              );
              return true;
            })
          )
          .then(({ KR }) => KR.renderElements('#myPaymentForm'));
      });
    } catch (error) {
      console.error('Error en el proceso de pago: ', error);
      // Manejo de errores
    }
  }
  CreacionTenant() {
    const formData = new FormData();
    formData.append('datos', JSON.stringify(this.DatosCuenta));
    if (this.selectedFileLogo) {
      formData.append('file', this.selectedFileLogo);
    } else {
      Swal.fire('Error', 'Seleccione al menos una imagen de logo', 'error');
      return;
    }
    // this.authService.registerNewTenant(this.DatosCuenta).subscribe((res) => {
    //   if (res.status) {
    //     console.log('creacion correcta');
    //     console.log(
    //       'la ruta es: ',
    //       `http://${this.DatosCuenta.tenant.dominio}`
    //     );
    //     window.location.href = `http://${this.DatosCuenta.tenant.dominio}`;
    //     //this.router.navigate(['/dashboard']);
    //   }
    // });

    this.authService.registerNewTenantFormData(formData).subscribe((res) => {
      if (res.status) {
        console.log('creacion correcta');
        console.log(
          'la ruta es: ',
          `http://${this.DatosCuenta.tenant.dominio}`
        );
        window.location.href = `http://${this.DatosCuenta.tenant.dominio}`;
        //this.router.navigate(['/dashboard']);
      }
    });
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
