package com.puzzle.springBoot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "game_records")
@Getter
@Setter
@NoArgsConstructor
public class GameRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String playerName;

    @Column(nullable = false)
    private Integer moves;                                //이동 횟수

    @Column(nullable = false)
    private Integer timeSeconds;                    // 걸린 시간 (초)

    @Column(nullable = false)
    private LocalDateTime completedAt;      // 완료 시간

    @PrePersist
    protected void onCreate() {
        completedAt = LocalDateTime.now();
    }
}
