package com.todo.backend.Repository;

import com.todo.backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // 완료 여부로 조회
    List<Todo> findByCompleted(Boolean completed);

    // 카테고리로 조회
    List<Todo> findByCategory(String category);

    // 중요 표시로 조회
    List<Todo> findByImportant(Boolean important);

    // 생성일 기준 정렬
    List<Todo> findAllByOrderByCreatedAtDesc();
}
