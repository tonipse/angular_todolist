import { Component, OnInit } from '@angular/core';
import { ToDo } from '../../_interface/todo';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.scss'],
})
export class TemplateTodoComponent implements OnInit {
  public toDo$: ToDo;

  constructor() {
    this.toDo$ = {
      id: 1,
      label: 'Wie gehts',
      status: false,
      position: 1,
    };
  }
  ngOnInit(): void {}

  public changeCheck(event?: any): void {
    this.toDo$.status = !this.toDo$.status;
  }
  public changeLabel(event?: any): void {
    console.log(this.toDo$.label);
  }
  public deleteToDo(event?: any): void {
    console.log(this.toDo$.id);
  }
}
