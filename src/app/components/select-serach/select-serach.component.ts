import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-select-serach',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './select-serach.component.html',
  styleUrl: './select-serach.component.css',
})
export class SelectSerachComponent implements OnChanges {
  @Input() Name: string = '';
  @Input() Data: any[] = [];
  @Input() Selected: any;
  @Input() RutaCreacion: string = '';
  @Output() SelectedChange = new EventEmitter<any>();
  Filtro: any[] = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes['Data']) {
      // Cada vez que `Data` cambie, se actualiza `Filtro`
      this.Filtro = [...this.Data];
    }
  }
  search(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchText = inputElement.value.toLowerCase();
    if (searchText) {
      this.Filtro = this.Data.filter((pro) =>
        pro.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.Filtro = [...this.Data];
    }
  }
  onValueChange(value: any) {
    this.SelectedChange.emit(value);
  }
}
