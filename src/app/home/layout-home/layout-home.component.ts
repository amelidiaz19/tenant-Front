import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-layout-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout-home.component.html',
  styles: ``
})
export class LayoutHomeComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    initFlowbite();
  }

}
