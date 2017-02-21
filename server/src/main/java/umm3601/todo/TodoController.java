package umm3601.todo;

import com.google.gson.Gson;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Map;

/**
 * Created by benek020 on 2/1/17.
 */
public class TodoController {
    private Todo[] allTodos;

    public TodoController() throws IOException {
        Gson gson = new Gson();
        FileReader reader = new FileReader("src/main/data/todos.json");
        allTodos = gson.fromJson(reader, Todo[].class);
    }

    // List allTodos
    public Todo[] listTodos(Map<String, String[]> queryParams) {
        Todo[] todos = allTodos;

        // Filters allTodos by status
        if (queryParams.containsKey("status")) {
            todos = filterStatus(queryParams.get("status")[0], todos);
        }

        // Filters allTodos that don't contain a keyword out
        if (queryParams.containsKey("contains")){
            todos = filterContains(queryParams.get("contains")[0], todos);
        }

        if (queryParams.containsKey("owner")){
            todos = filterOwner(queryParams.get("owner")[0], todos);
        }

        if (queryParams.containsKey("category")){
            todos = filterCategory(queryParams.get("category")[0], todos);
        }

        if (queryParams.containsKey("orderBy")){
            todos = sortTodos(queryParams.get("orderBy")[0], todos);
        }

        // Retrieves a maximum, max, number of allTodos
        if(queryParams.containsKey("limit")) {
            int max = Integer.parseInt(queryParams.get("limit")[0]);

            // Allow maximum number of entries
            if(max > todos.length)
                max = todos.length;

            Todo[] limitTodos = new Todo[max];

            for (int i = 0; i < max; i++){
                limitTodos[i] = todos[i];
            }

            todos = limitTodos;
        }

        return todos;
    }

    //Sorts a Todo[] alphabetically by a given category
    //Takes a string to be the category to sort by, and a Todo[] to sort
    //returns a Todo[]
    public Todo[] sortTodos(String field, Todo[] todos){
        ArrayList<Todo> todoList = new ArrayList<Todo>();
        for (Todo todo : todos)
            todoList.add(todo);

        Comparator<Todo> sortTodos = new Comparator<Todo>() {
            public int compare(Todo todo1, Todo todo2) {
                if (field.equals("owner")) return todo1.owner.compareTo(todo2.owner);
                else if (field.equals("body")) return todo1.body.compareTo(todo2.body);
                else if (field.equals("category")) return todo1.category.compareTo(todo2.category);
                else if (field.equals("status")) return todo1.compareTo(todo2);
                else return 0;
            }
        };

        todoList.sort(sortTodos);
        return todoList.toArray(todos);
    }

    //filters a Todo[] by what category it's in
    //Takes a String to be the category, and a Todo[] to filter
    //Returns a Todo[]
    public Todo[] filterCategory(String category, Todo[] todos){
        ArrayList<Todo> filteredTodos = new ArrayList<>();

        for (Todo t : todos)
            if (t.category.equals(category))
                filteredTodos.add(t);

        return filteredTodos.toArray(new Todo[filteredTodos.size()]);
    }

    //filters a Todo[] by who the owner is
    //Takes a String to be the owner, and a Todo[] to filter
    //Returns a Todo[]
    public Todo[] filterOwner(String owner, Todo[] todos) {
        ArrayList<Todo> filteredTodos = new ArrayList<>();

        for (Todo t : todos)
            if (t.owner.equals(owner))
                filteredTodos.add(t);

        return filteredTodos.toArray(new Todo[filteredTodos.size()]);
    }

    // Filters a given array of Todos by their status.
    // Takes a String Status, either "complete" or "incomplete" and a Todo[].
    // Returns a Todo[]
    public Todo[] filterStatus(String statusFilter, Todo[] todos){
        boolean filter = statusFilter.equals("complete");

        ArrayList<Todo> myTodos = new ArrayList<>();

        for(Todo t : todos)
            if(t.status == filter)
                myTodos.add(t);

        return myTodos.toArray(new Todo[myTodos.size()]);
    }

    //Filters a Todo[] to contain only a given word
    //Takes a string to filter for, and a Todo[] to filter in
    //Returns a Todo[]
    public Todo[] filterContains(String filter, Todo[] todos){
        ArrayList<Todo> filteredTodos = new ArrayList<>();

        for(Todo t : todos)
            if(t.body.contains(filter))
                filteredTodos.add(t);

        return filteredTodos.toArray(new Todo[filteredTodos.size()]);
    }
    //
//    // Filter allTodos by age
//    public Todo[] filterTodosByAge(Todo[] todos, int age) {
//        return Arrays.stream(todos).filter(x -> x.age == age).toArray(Todo[]::new);
//    }
//
    // Get a single todo
    public Todo getTodo(String id) {
        return Arrays.stream(allTodos).filter(x -> x._id.equals(id)).findFirst().orElse(null);
    }
}