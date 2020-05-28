import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../_interface/todo';
import { EventPing } from 'src/app/_interface/EventPing';
@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.scss'],
})
export class TemplateTodoFormComponent implements OnInit {
  @Output() ping: EventEmitter<ToDo> = new EventEmitter<ToDo>();

  public toDo$: ToDo;
  constructor() {
    this.toDo$ = {
      id: undefined,
      label: undefined,
      status: false,
      position: undefined,
    };
  }

  ngOnInit(): void {}

  public createToDo(event?: any): void {
    this.ping.emit(this.toDo$);
    console.log(this.toDo$);
    this.toDo$ = {
      id: undefined,
      label: undefined,
      status: false,
      position: undefined,
    };
  }
}
