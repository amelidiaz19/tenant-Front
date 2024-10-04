import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styles: ``,
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Modal Title';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
