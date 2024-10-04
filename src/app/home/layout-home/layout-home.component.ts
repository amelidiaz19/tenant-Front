import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-layout-home',
  standalone: true,
  imports: [FooterComponent,HeaderComponent,RouterOutlet, RouterLink],
  templateUrl: './layout-home.component.html',
  styles: ``,
})
export class LayoutHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    initFlowbite();
  }
}
