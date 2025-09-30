import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../types/Item';

@Component({
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class ItemComponent {
  editable = false; // default state

  @Input() item!: Item; // ! means always have value
  @Output() remove = new EventEmitter<Item>();

  saveItem(description: string) {
    if (!description) return;
    this.editable = false;
    this.item.description = description;
  }
}
