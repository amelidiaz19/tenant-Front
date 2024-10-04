import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-dashboard.component.html',
  styles: ``
})
export class LayoutDashboardComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    initFlowbite();
  }

}
