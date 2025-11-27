package com.todo.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String content;          // 할 일 내용

    @Column(nullable = false)
    private Boolean completed = false;  // 완료 여부

    @Column
    private Boolean important = false;  // 중요 표시

    @Column
    private String category;         // 카테고리 (개인/업무/학습)

    @Column
    private LocalDateTime dueDate;   // 마감일

    @Column(nullable = false)
    private LocalDateTime createdAt; // 생성일

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // 기본 생성자
    public Todo() {
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Boolean getImportant() {
        return important;
    }

    public void setImportant(Boolean important) {
        this.important = important;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
