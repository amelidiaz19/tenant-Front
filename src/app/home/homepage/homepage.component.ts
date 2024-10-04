import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './homepage.component.html',
  styles: ``
})
export class HomepageComponent implements OnInit {

  constructor() {}

  router = inject(Router);

  ngOnInit() {
    
  }

}
