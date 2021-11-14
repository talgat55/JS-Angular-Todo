import { Injectable } from '@angular/core';
import {IItemTodo} from "./IItemTodo";
const TODOS = [
  { title: 'Install Angular CLI', isDone: true },
  { title: 'Style app', isDone: true },
  { title: 'Finish service functionality', isDone: false },
  { title: 'Setup API', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  get(query = ''): Promise<IItemTodo[]> {
    return new Promise(resolve => {
      let data;
      if(query ==='completed'  || query ==='active'){
        const isCompleted = query === 'completed';
        data = TODOS.filter(todo => todo.isDone ===isCompleted);
      } else{
        data = TODOS
      }
      resolve(data)
    });
  }

  add(data:IItemTodo): Promise<IItemTodo>{
    return new Promise(resolve =>{
      TODOS.push(data);
      resolve(data);
    })
  }

  put(changed:IItemTodo): Promise<IItemTodo>{
    return new Promise( resolve=>{
      const index = TODOS.findIndex( todo => todo === changed);
      TODOS[index].title = changed.title;
      resolve(changed);
    })
  }

  delete(selected:IItemTodo): Promise<boolean>{
    return new Promise(resolve=>{
      const index = TODOS.findIndex( todo => todo === selected);
      TODOS.splice(index, 1);
      resolve(true);
    })
  }
}
