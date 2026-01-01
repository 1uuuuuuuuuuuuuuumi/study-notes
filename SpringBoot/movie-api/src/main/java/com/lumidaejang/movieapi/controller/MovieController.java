package com.lumidaejang.movieapi.controller;

import com.lumidaejang.movieapi.entity.Movie;
import com.lumidaejang.movieapi.mapper.MovieMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MovieController {

    private final MovieMapper movieMapper;

    // 생성자 주입
    public MovieController(MovieMapper movieMapper){
        this.movieMapper = movieMapper;
    }

    // GET /api/movies - 전체 영화 목록
    @GetMapping("/movies")
    public List<Movie> getAllMovis(){
        return movieMapper.findAll();
    }

    // GET /api/movies/1 - 특정 영화 조회
    @GetMapping("/movies/{id}")
    public Movie getMovieById(@PathVariable Long id){
        return movieMapper.findById(id);
    }
}
