import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "./todo";
import { TodoListComponent } from "./todo-list.component";
import { TodoListService } from "./todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    _id: "chris_id",
                    status: true,
                    owner: "Chris",
                    body: "this is chris's body",
                    category: "coloring"
                },
                {
                    _id: "pat_id",
                    status: false,
                    owner: "Pat",
                    body: "this is pat's body",
                    category: "texting"
                },
                {
                    _id: "jamie_id",
                    status: true,
                    owner: "Jamie",
                    body: "this is jamie's body",
                    category: "coloring"
                },
                {
                    _id: "brady_id",
                    status: true,
                    owner: "Brady",
                    body: "this is brady's body",
                    category: "fixing"
                }
                ])
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ TodoListComponent ],
            // providers:    [ UserListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers:    [ { provide: TodoListService, useValue: todoListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(4);
    });

    it("contains an owner of todo named 'Chris'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Chris" )).toBe(true);
    });

    it("contain an owner of todo named 'Jamie'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Jamie" )).toBe(true);
    });

    it("doesn't contain a user named 'Santa'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Santa" )).toBe(false);
    });

    it("has two todos with a coloring category", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.category === "coloring").length).toBe(2);
    });

    // it("contains 'is' in the second spot of the fake todos body", () => {
    //     expect(todoList.todos.some((todo: Todo) => todo.body[1]==="is")).toBe(true);
    // });

    it("has three todos with a complete or true status ", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(3);
    });



});
