package umm3601.todo;

/**
 * Created by benek020 on 2/1/17.
 */
public class Todo {

    String _id;
    String owner;
    boolean status;
    String body;
    String category;

    public int compareTo(Todo otherTodo){
        if (status == otherTodo.status){
            return 0;
        } else if (status){
            return 1;
        } else {
            return 0;
        }
    }
}