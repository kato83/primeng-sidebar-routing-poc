import { Routes } from '@angular/router';
import { TodosComponent } from './pages/todos/todos.component';

export const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
    children: [
      {
        path: ':id',
        component: TodosComponent,
      }
    ]
  }
];
