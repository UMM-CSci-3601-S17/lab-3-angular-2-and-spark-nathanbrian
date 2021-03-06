import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "./todo";
import { TodoComponent } from "./todo.component";
import { TodoListService } from "./todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

describe("Todo component", () => {

    let todoComponent: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    let todoListServiceStub: {
        getTodoById: (todoId: string) => Observable<Todo>
    };

    beforeEach(() => {
        // stub TodoService for test purposes
        todoListServiceStub = {
            getTodoById: (todoId: string) => Observable.of([
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
            ].find(todo => todo._id === todoId))
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ TodoComponent ],
            providers:    [ { provide: TodoListService, useValue: todoListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            todoComponent = fixture.componentInstance;
        });
    }));

    it("can retrieve Pat by ID", () => {
        todoComponent.setId("pat_id");
        expect(todoComponent.todo).toBeDefined();
        expect(todoComponent.todo.owner).toBe("Pat");
        expect(todoComponent.todo.category).toBe("texting");
        expect(todoComponent.todo.status).toBe(false);
    });

    it("can retrieve Brady by ID", () => {
        todoComponent.setId("brady_id");
        expect(todoComponent.todo).toBeDefined();
        expect(todoComponent.todo.owner).toBe("Brady");
        expect(todoComponent.todo.category).toBe("fixing");
        expect(todoComponent.todo.status).toBe(true);
    });

    it("returns undefined for Santa", () => {
        todoComponent.setId("Santa");
        expect(todoComponent.todo).not.toBeDefined();
    });

});
