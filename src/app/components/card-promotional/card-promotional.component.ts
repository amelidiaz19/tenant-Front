import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-promotional',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-promotional.component.html',
  styles: ``,
})
export class CardPromotionalComponent {
  @Input() Tipo: string = 'standar';
}
