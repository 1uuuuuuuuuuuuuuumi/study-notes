package com.lumi.study05.repository;

import com.lumi.study05.entity.Study05Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Study05Repository extends JpaRepository<Study05Entity, Long> {

}
