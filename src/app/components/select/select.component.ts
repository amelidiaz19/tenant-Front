import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select.component.html',
  styles: ``,
})
export class SelectComponent {
  @Input() Name: string = '';
  @Input() Data: any[] = [];
  @Input() Selected: any;
  @Output() SelectedChange = new EventEmitter<any>();

  onValueChange(value: any) {
    this.SelectedChange.emit(value);
  }
}
