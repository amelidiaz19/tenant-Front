import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout-dashboard.component.html',
  styles: ``
})
export class LayoutDashboardComponent implements OnInit {
  isSidebarOpen = true;

  ngOnInit() {
    initFlowbite();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
