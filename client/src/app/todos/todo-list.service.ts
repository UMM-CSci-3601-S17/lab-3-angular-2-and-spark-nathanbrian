import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Todo } from './todo';
import {Observable} from "rxjs";

@Injectable()
export class TodoListService {
    //private baseUrl: string = API_URL ;
    private todoUrl: string = API_URL + "todos";
    constructor(private http:Http) { }



    getTodos(): Observable<Todo[]> {
        //let body = this.http.request(this.baseUrl + 'todos').map(res => res.json());
        return this.http.request(this.todoUrl).map(res => res.json());
    }

    //I think this method was written to help test the components?
    getTodoById(_id: string): Observable<Todo> {
        return this.http.request(this.todoUrl + "/" + _id).map(res => res.json());
    }

}