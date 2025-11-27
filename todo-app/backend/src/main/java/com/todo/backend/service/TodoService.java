package com.todo.backend.service;

import com.todo.backend.Repository.TodoRepository;
import com.todo.backend.entity.Todo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }

    // 전체 조회
    public List<Todo> getAllTodos(){
        return todoRepository.findAllByOrderByCreatedAtDesc();
    }

    // 특정 Todo 조회
    public Todo getTodoById(Long id){
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    // Todo 생성
    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }

    // Todo 수정
    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = getTodoById(id);

        todo.setContent(todoDetails.getContent());
        todo.setCompleted(todoDetails.getCompleted());
        todo.setImportant(todoDetails.getImportant());
        todo.setCategory(todoDetails.getCategory());
        todo.setDueDate(todoDetails.getDueDate());

        return todoRepository.save(todo);
    }

    // Todo 삭제
    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }

    // 완료 상태 토글
    public Todo toggleComplete(Long id){
        Todo todo = getTodoById(id);
        todo.setCompleted((!todo.getCompleted()));
        return todoRepository.save(todo);
    }

    // 중요 표시 토글
    public Todo toggleImportant(Long id){
        Todo todo = getTodoById(id);
        todo.setImportant((!todo.getImportant()));
        return todoRepository.save(todo);
    }
}
