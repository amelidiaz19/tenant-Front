import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { CardPromotionalComponent } from '../../components/card-promotional/card-promotional.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, CardPromotionalComponent],
  templateUrl: './homepage.component.html',
  styles: ``,
})
export class HomepageComponent implements OnInit {
  constructor() {}

  router = inject(Router);

  ngOnInit() {}
}
