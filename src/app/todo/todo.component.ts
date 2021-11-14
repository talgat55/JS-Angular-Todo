import { Component, OnInit } from '@angular/core';
import {TodoService} from "./todo.service";
import {IItemTodo} from "./IItemTodo";
import {  ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  public todos: IItemTodo[] | undefined;
  public newTodo: string = '';
  public path: any;
  public activeTasks: IItemTodo[] | undefined | number = 0;
  constructor(private todoService:  TodoService, private route: ActivatedRoute) { }

  getTodos(query=''){
    return this.todoService.get(query).then((todos:IItemTodo[]) =>{
      this.todos = todos;
      this.activeTasks = this.todos.filter( (item: IItemTodo) => !item.isDone).length
    })
  }

  addTodo():void{
    this.todoService.add({title: this.newTodo, isDone: false}).then(()=>{
      return this.getTodos()
    }).then(()=>{
      this.newTodo = '';
    })
  }

  updateTodo(todo: IItemTodo, inputTitle: string):void{
    todo.title = inputTitle;
    this.todoService.put(todo).then(()=>{
      todo.editing = false;
      return this.getTodos();
    })
  }

  destroyTodo(todo: IItemTodo):void{
    this.todoService.delete(todo).then(()=>{
      return this.getTodos();
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe((params: any) =>{
      this.path = params['name'];
      this.getTodos(this.path);
    });
  }
}
