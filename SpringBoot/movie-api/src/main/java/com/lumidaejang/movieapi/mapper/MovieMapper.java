package com.lumidaejang.movieapi.mapper;

import com.lumidaejang.movieapi.entity.Movie;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MovieMapper {

    // 전체 영화 목록 조회
    List<Movie> findAll();

    // ID로 영화 조회
    Movie findById(Long id);

    // 등록
    void insert(Movie movie);

    // 수정
    void update(Movie movie);

    // 삭제
    void delete(Long id);
}
