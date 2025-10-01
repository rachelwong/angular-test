import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Item } from '../types/Item';
import { ItemComponent } from './item/item';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  componentTitle = 'Angular Todo list attempt';
  filter: 'all' | 'inactive' | 'done' = 'all';

  allItems = [
    { description: 'do something', done: true },
    { description: 'item two', done: false },
  ];

  get items(): Item[] {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((x) =>
      this.filter === 'done' ? x.done === true : this.filter === 'inactive' ? x.done === false : x
    );
  }

  addItem(description: string) {
    // if no description provided or description already exists, do not add
    if (
      description.trim().length === 0 &&
      !!this.items.find((x) => x.description === description)
    ) {
      return;
    }
    this.allItems.push({ description, done: false });
  }

  remove(item: Item) {
    console.log('remove', item);
    //TODO check
    this.allItems = this.allItems.filter((x) => item.description !== x.description);
  }

  setFilter(value: 'all' | 'inactive' | 'done') {
    this.filter = value;
  }
}
