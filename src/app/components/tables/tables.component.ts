import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [],
  templateUrl: './tables.component.html',
  styles: ``,
})
export class TablesComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
}
