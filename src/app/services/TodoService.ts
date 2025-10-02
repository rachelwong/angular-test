import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Item } from '../../types/Item';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private dataSource = new BehaviorSubject<Item[]>([]);
  data$ = this.dataSource.asObservable();

  constructor(private http: HttpClient) {}

  loadData() {
    return this.http
      .get(environment.apiBasePath)
      .pipe(tap((res: any) => this.dataSource.next(res)));
  }

  getTodos(): Observable<Item[]> {
    return this.data$ as Observable<Item[]>;
  }

  addTodo(item: Item) {
    return this.http.post<Item>(environment.apiBasePath, item).pipe(
      tap((newItem) => {
        const current = this.dataSource.value ?? [];
        this.dataSource.next([...current, newItem]);
      })
    );
  }

  // DELETE
  deleteTodo(id: string) {
    return this.http.delete(`${environment.apiBasePath}/${id}`).pipe(
      tap(() => {
        const updated = (this.dataSource.value ?? []).filter((i: Item) => i.id !== id);
        this.dataSource.next(updated);
      })
    );
  }
}
