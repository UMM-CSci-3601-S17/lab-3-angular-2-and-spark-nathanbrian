import { Component, OnInit } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { Todo } from "./todo";

@Component({
    selector: 'todo-component',
    templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
    public todo: Todo = null;
    private id: string;

    constructor(private toodListService: TodoListService) {
        // this.users = this.userListService.getUsers();
    }

    private subscribeToServiceForId() {
        if (this.id) {
            this.todoListService.getTodoById(this.id).subscribe(
                todo => this.todo = todo,
                error => {
                    console.log(error);
                }
            );
        }
    }

    setId(id: string) {
        this.id = id;
        this.subscribeToServiceForId();
    }

    ngOnInit(): void {
        this.subscribeToServiceForId();
    }
}
