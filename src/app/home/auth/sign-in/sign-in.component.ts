import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../../../models/user';
import { AccountService } from '../../../services/account.service';
import { RedirectGoogleComponent } from '../redirect-google/redirect-google.component';
import { AccountGoogleComponent } from '../account-google/account-google.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, CommonModule, RedirectGoogleComponent, AccountGoogleComponent],
  templateUrl: './sign-in.component.html',
  styles: ``
})
export class SignInComponent {

  constructor(private router: Router, 
    //private authService: AuthService, 
    private accountService: AccountService, )
    //private cookieService: CookieService)
    {}

  componentToShow: string = "welcome";

  email: string = '';
  password: string = '';
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
    password: '',
    tenantId : '',
    tenantName:'',
    regist: false,
    tiponegocio: '',
    rol: null
  };
  login(){
    this.accountService.getLogin(this.email,this.password).subscribe(
      (data: UserInfo) =>
        {
          this.user = data;
          if(this.user.tenantId !== ''){
            //this.cookieService.set('tenantId', this.user.tenantId);
            const userString = JSON.stringify(this.user);
            //this.cookieService.set('user', userString);
            this.router.navigateByUrl('/dashboard');
          }
        }
    )
  }
  autenticar(){

    console.log("carga autenticacion")
  }

  ngOnInit(): void {
    console.log("inicia");
    /*
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        this.componentToShow = "protected";
      }
    });*/
  }

  registrar(flag: boolean){
    //this.authService.setIsRegistering(flag);
    this.router.navigateByUrl('autenticacion/registrar');
  }

  closeResult = '';

  abrirModal(content: any) {
    /*
    this.modalService.open(content, { ariaLabelledBy: 'modal-header modal-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/
  }

  private getDismissReason(reason: any): string {
    /*
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }*/

      return '';
  } 

}
