package com.lumidaejang.movieapi.entity;

public class Movie {
    private Long id;
    private String title;
    private String overview;

    // 기본 생성자
    public Movie(){

    }

    // 전체 생성자
    public Movie(Long id, String title, String overview){
        this.id = id;
        this.title = title;
        this.overview = overview;
    }

    // Getter & Setter
    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getOverview(){
        return overview;
    }

    public void setOverview(String overview){
        this.overview = overview;
    }

    // toString (디버깅용)
    @Override
    public String toString(){
        return "Movie{" +
                    "id=" + id +
                    ", title='" + title + '\''+
                    ", overview='" + overview +'\'' +
                    '}';
    }
}
