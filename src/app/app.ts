import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Item } from '../types/Item';
import { ItemComponent } from './item/item';
import { environment } from '../environments/environment';
import { TodoService } from './services/TodoService';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
@Injectable({ providedIn: 'root' })
export class App {
  componentTitle = 'Angular Todo list attempt';
  filter: 'all' | 'inactive' | 'done' = 'all';
  todos: Item[] | undefined;
  error: boolean | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this.todoService.getTodos().subscribe((data: Item[]) => {
      this.todos = data;
    });
  }
  get items(): Item[] {
    console.log('this.todos', this.todos);
    if (this.filter === 'all') {
      return this.todos ?? [];
    }
    return (
      this.todos?.filter((x) =>
        this.filter === 'done' ? x.done === true : this.filter === 'inactive' ? x.done === false : x
      ) ?? []
    );
  }

  addItem(description: string) {
    // if no description provided or description already exists, do not add
    if (
      description.trim().length === 0 &&
      !!this.todos?.find((x) => x.description === description)
    ) {
      return;
    }
    this.todos?.push({ id: '', description, done: false });
  }

  remove(item: Item) {
    console.log('remove', item);
    //TODO check
    this.todos = this.todos?.filter((x) => item.description !== x.description);
  }

  setFilter(value: 'all' | 'inactive' | 'done') {
    this.filter = value;
  }
}
