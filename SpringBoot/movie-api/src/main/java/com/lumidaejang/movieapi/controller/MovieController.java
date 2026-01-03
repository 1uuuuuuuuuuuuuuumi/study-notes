package com.lumidaejang.movieapi.controller;

import com.lumidaejang.movieapi.entity.Movie;
import com.lumidaejang.movieapi.mapper.MovieMapper;
import org.springframework.web.bind.annotation.*;

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

    // 등록
    @PostMapping("/movies")
    public Movie createMovie(@RequestBody Movie movie){
        movieMapper.insert(movie);
        return movie;   // ID가 자동으로 채워져서 반환됨
    }

// 수정
    @PutMapping("/movies/{id}")
    public Movie updateMovie(@PathVariable Long id, @RequestBody Movie movie){
        movie.setId((id));  // URL의 ID 설정
        movieMapper.update(movie);
        return movieMapper.findById(id);    // 수정된 영화 반환
    }
}
