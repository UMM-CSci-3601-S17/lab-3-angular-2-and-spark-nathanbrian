import { Component } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { FormsModule } from '@angular/forms';
import { FilterBy } from "./filter.pipe";
import { Todo } from "./todo";

@Component({
    selector: 'todo-list-component',
    providers: [ FilterBy ],
    //providers: [ TodoListService ]
    templateUrl: 'todo-list.component.html',
})

export class TodoListComponent {
    //private todos: any;
    public todos: Todo[];

    constructor(private _todoListService: TodoListService) {
        // this.todos = _todoListService.getTodos();
    }


    ngOnInit(): void {
        this.userListService.getUsers().subscribe(
            users => this.users = users,
            err => {
                console.log(err);
            }
        );
    }

}


