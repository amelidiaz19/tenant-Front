import { Component } from '@angular/core';
import { UserInfo } from '../../../models/user';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-account-google',
  standalone: true,
  imports: [],
  templateUrl: './account-google.component.html',
  styles: ``
})
export class AccountGoogleComponent {

  content: string = "";
  user: UserInfo = {
    id: '',
    sub: '',
    name: '',
    given_name: '',
    family_name: '',
    picture: '',
    email: '',
    email_verified: false,
    locale: '',
    password:'',
    tenantId : '',
    tenantName:'',
    regist: false,
    tiponegocio: '',
    rol: null
  };
  constructor(
    private accountService: AccountService,
    private router: Router,
    //private cookieService: CookieService,
    private authService: AuthService) {}
  ngOnInit(): void {

    this.accountService.getUserInfo("/user/regist",this.user).subscribe(
      (data: UserInfo) =>{
        this.user = data;
        if(data.regist){
          //this.cookieService.set('tenantId', this.user.tenantId);
          console.log(data);
          if(data.rol?.nombre != null){
            this.almacenarDatosUsuarioCookies(this.user);
            this.router.navigateByUrl('/dashboard/usuario/inicio');
          }else{
            console.log("tu usuario esta creado pero no cuenta con un rol asignado")
            this.router.navigateByUrl('/');
          }
        }else{
          if(this.user.email == ""){
            this.registrar(true);
          }else{
            this.registrar(false);
          }
          
        }

      }
    );
  }
  registrar(flag: boolean){
    this.authService.isLoggedIn();
    this.router.navigateByUrl('autenticacion/registrar');
  }
  almacenarDatosUsuarioCookies(usuario: UserInfo){
    const userString = JSON.stringify(usuario);
    //this.cookieService.set('user', userString);
  }

}
