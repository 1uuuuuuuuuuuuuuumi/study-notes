package com.lumi.study02.repository;

import com.lumi.study02.entity.Study02Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Study02Repository extends JpaRepository<Study02Entity, Long> {

}
