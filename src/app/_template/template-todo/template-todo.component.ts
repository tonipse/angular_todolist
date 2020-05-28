import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../_interface/todo';
import { EventPing } from "src/app/_interface/EventPing";

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.scss'],
})
export class TemplateTodoComponent implements OnInit {
  @Input() toDo$: ToDo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  ngOnInit(): void {}

  public changeCheck(event?: any): void {
    this.toDo$.status = !this.toDo$.status;

    const eventObject: EventPing = {
      label: 'check',
      object: this.toDo$,
    };
    this.ping.emit(eventObject);
  }
  public changeLabel(event?: any): void {
    console.log(this.toDo$.label);
  }
  public deleteToDo(event?: any): void {
    console.log(this.toDo$.id);
  }
}
