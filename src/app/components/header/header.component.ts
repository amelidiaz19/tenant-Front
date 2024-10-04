import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CartStateService } from '../../services/cart-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  quantity = 0;
  cartStateService = inject(CartStateService);

  queryParams: any = {
    page: 0,
    size: 10,
    search: '',
    sort: '',
    marca: '', // Ajusta esto según tus necesidades
    categoria: '',
    subcategoria: '',
  };
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
    this.cartStateService.quantity$.subscribe((qty) => {
      this.quantity = qty;
    });
  }
}
