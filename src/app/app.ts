import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { Item } from '../types/Item';
import { ItemComponent } from './item/item';
import { TodoService } from './services/TodoService';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
@Injectable({ providedIn: 'root' })
export class App implements OnInit {
  componentTitle = 'Angular Todo list attempt';
  todos: Item[] | undefined;
  error: boolean | undefined;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.todoService.loadData().subscribe();
  }

  addItem(description: string) {
    // if no description provided or description already exists, do not add
    if (
      description.trim().length === 0 &&
      !!this.todos?.find((x) => x.description === description)
    ) {
      return;
    }
    this.todoService.addTodo({ id: '', description, done: false }).subscribe();
  }

  remove(item: Item) {
    console.log('remove', item);
    this.todoService.deleteTodo(item.id).subscribe();
  }
}
