import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Beneficio {
  descripcion: string;
  incluido: boolean;
}

@Component({
  selector: 'app-card-promotional',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card-promotional.component.html',
  styles: ``,
})
export class CardPromotionalComponent implements OnInit {
  @Input() tipo: 'Standard' | 'Pro' | 'Custom' = 'Standard';
  @Input() precio: number = 0;

  beneficios: Beneficio[] = [];

  ngOnInit(): void {
    this.setBeneficios();
  }

  private setBeneficios() {
    const beneficiosComunes = [
      { descripcion: 'Acceso a funciones básicas', incluido: true },
      { descripcion: 'Soporte por correo electrónico', incluido: true },
    ];

    switch (this.tipo) {
      case 'Standard':
        this.beneficios = [
          ...beneficiosComunes,
          { descripcion: 'Hasta 5 usuarios', incluido: true },
          { descripcion: 'Almacenamiento 10GB', incluido: true },
          { descripcion: 'Integraciones avanzadas', incluido: false },
          { descripcion: 'Soporte prioritario', incluido: false},
        ];
        break;
      case 'Pro':
        this.beneficios = [
          ...beneficiosComunes,
          { descripcion: 'Hasta 20 usuarios', incluido: true },
          { descripcion: 'Almacenamiento 50GB', incluido: true },
          { descripcion: 'Integraciones avanzadas', incluido: true },
          { descripcion: 'Soporte prioritario', incluido: true },
        ];
        break;
      case 'Custom':
        this.beneficios = [
          ...beneficiosComunes,
          { descripcion: 'Usuarios ilimitados', incluido: true },
          { descripcion: 'Almacenamiento personalizado', incluido: true },
          { descripcion: 'Integraciones personalizadas', incluido: true },
          { descripcion: 'Soporte 24/7', incluido: true },
          { descripcion: 'Gestor de cuenta dedicado', incluido: true },
        ];
        break;
    }
  }
}
