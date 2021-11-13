import { Component, OnInit } from '@angular/core';
import {TodoService} from "./todo.service";
import {IItemTodo} from "./IItemTodo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  public todos: IItemTodo[] | undefined;
  public activeTasks: IItemTodo[] | undefined | number = 0;
  constructor(private todoService:  TodoService) { }

  getTodos(){
    return this.todoService.get().then((todos:IItemTodo[]) =>{
      this.todos = todos;
      this.activeTasks = this.todos.filter( (item: IItemTodo) => !item.isDone).length
    })
  }

  ngOnInit(): void {
    this.getTodos();
  }
}
