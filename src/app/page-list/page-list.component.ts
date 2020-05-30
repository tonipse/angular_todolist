import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToDo } from '../_interface/todo';
import { EventPing } from '../_interface/EventPing';
import { DataService } from '../_service/data.service';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit, OnDestroy {
  public toDoShow: boolean;
  public toDoDoneShow: boolean;
  public $todos: ToDo[];
  public $todosdone: ToDo[];
  public subs = new Subscription();

  constructor(
    public _dataService: DataService,
    public _dragulaService: DragulaService
  ) {
    this.toDoShow = true;
    this.toDoDoneShow = false;
    this.$todos = [];
    this.$todosdone = [];
    this.loadData();

    this._dragulaService.createGroup('todos', {
      removeOnSpill: false,
    });

    this.subs.add(
      _dragulaService.drop('todos').subscribe(({ el }) => {
        this.position();
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public position(): void {
    let position = 0;
    this.$todos.forEach((todo: ToDo) => {
      position += 1;
      todo.position = position;

      this._dataService.putToDo(todo).subscribe(
        (data: ToDo) => {
          console.log(data.label);
        },
        (error) => {
          console.log(error.message);
        }
      );
    });
  }
  public loadData(): void {
    this.$todos = [];
    this.$todosdone = [];
    this._dataService.getToDo().subscribe(
      (data: ToDo[]) => {
        data.forEach((toDo: ToDo) => {
          if (toDo.status === true) {
            this.$todosdone.push(toDo);
          } else {
            this.$todos.push(toDo);
          }
        });
        this.$todos.sort((obj1, obj2) => {
          return obj1.position - obj2.position;
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  public create(event: ToDo): void {
    event.position = this.$todos.length + 1;
    this._dataService.postToDo(event).subscribe(
      (data: ToDo) => {
        this.$todos.push(data);
        this.position();
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  public update(event: EventPing): void {
    if ('check' === event.label) {
      console.log('check');
      if (!event.object.status) {
        this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1);
        this.$todos.push(event.object);
      } else {
        this.$todos.splice(this.$todos.indexOf(event.object), 1);
        this.$todosdone.push(event.object);
      }
      event.label = '';
    }
    if ('delete' === event.label) {
      console.log('delete');
      if (event.object.status) {
        this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1);
      } else {
        this.$todos.splice(this.$todos.indexOf(event.object), 1);
      }
      event.label = '';
    }
    if ('label' === event.label) {
      if (event.object.status) {
        this.$todosdone.forEach((toDo: ToDo) => {
          if (toDo.id === event.object.id) {
            toDo.label = event.object.label;
          }
        });
      } else {
        this.$todos.forEach((toDo: ToDo) => {
          if (toDo.id === event.object.id) {
            toDo.label = event.object.label;
          }
        });
      }
      event.label = '';
    }

    console.log(this.$todos);
  }
}
