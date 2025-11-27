package com.todo.backend.controller;

import com.todo.backend.entity.Todo;
import com.todo.backend.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    // 전체 조회
    @GetMapping
    public List<Todo> getAllTodos(){
        return todoService.getAllTodos();
    }

    // 특정 Todo 조회
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id){
        return ResponseEntity.ok(todoService.getTodoById(id));
    }

    // Todo 생성
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo){
        return todoService.createTodo(todo);
    }

    // Todo 수정
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todoDetails){
        return ResponseEntity.ok(todoService.updateTodo(id, todoDetails));
    }

    // Todo 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    // 완료 상태 토글
    @PatchMapping("{id}/complete")
    public ResponseEntity<Todo> toggleComplete(@PathVariable Long id){
        return ResponseEntity.ok(todoService.toggleComplete(id));
    }

    // 중요 표시 토글
    @PatchMapping("/{id}/important")
    public ResponseEntity<Todo> toggleImportant(@PathVariable Long id){
        return ResponseEntity.ok(todoService.toggleImportant(id));
    }
}
