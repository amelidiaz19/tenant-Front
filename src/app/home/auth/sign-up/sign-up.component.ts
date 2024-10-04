import { Component } from '@angular/core';
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
  styles: ``
})
export class SignUpComponent {


  isLoading = false;
  codigo: string = "" ;
  tipoNegocio: string = "";
  email: string = "";
  password: string = "";
  tenantname: string = "";
  registrado:boolean = false;

  constructor(
    private authService: AuthService,
    //private AccountService: AccountService,
    //private cookieService: CookieService,
    private router: Router) {}

  ngOnInit() {
    /*
    this.authService.isRegistering$.subscribe(registro => {
      this.registrado = registro;
    });*/
  }


  Registrar(){
    const nuevoUser: UserInfo = {
      id: '',
      sub: '',
      name: '',
      given_name: '',
      family_name: '',
      picture: '',
      email: this.email,
      email_verified: this.registrado,
      locale: '',
      password: this.password,
      tenantId: this.codigo,
      tenantName: this.tenantname,
      regist: this.registrado,
      tiponegocio: this.tipoNegocio,
      rol: null
    };
    this.isLoading = true;
    //this.AccountService.getUserInfo("/user/regist", nuevoUser).subscribe(
      (data: UserInfo) =>{
        this.isLoading = false;
        if(data.regist && data.rol?.nombre != null){
          //this.cookieService.set('tenantId', data.tenantId);
          const userString = JSON.stringify(data);
          //this.cookieService.set('user', userString);
          this.router.navigateByUrl('/dashboard/usuario/inicio');
        }else{
          console.log("tu usuario esta creado pero no cuenta con un rol asignado");
          this.router.navigateByUrl('/');
        }
      }
  }

  almacenarDatosUsuarioCookies(usuario: UserInfo){
    
  }
}