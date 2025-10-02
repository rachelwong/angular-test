import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Item } from '../../types/Item';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Item[]> {
    const response = this.http.get<Item[]>(environment.apiBasePath);
    return response;
  }

  removeTodo(id: string) {}

  addTodo(item: Item) {
    const response = this.http.post(environment.apiBasePath, item);
  }
}
