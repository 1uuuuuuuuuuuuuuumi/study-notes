package com.lumi.study04.repository;

import com.lumi.study04.entity.Study04Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface Study04Repository  extends JpaRepository<Study04Entity, Long> {

}
