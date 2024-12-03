import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TenantService } from './services/tenant.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private tenantService: TenantService) {}
  ngOnInit(): void {
    this.tenantService.loadTenant().subscribe((tenantInfo) => {
      console.log('Tenant Loaded: ', tenantInfo);
    });
  }
  title = 'tenant-Front';
}
