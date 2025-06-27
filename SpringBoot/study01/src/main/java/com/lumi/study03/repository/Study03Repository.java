package com.lumi.study03.repository;

import com.lumi.study03.entity.Study03Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Study03Repository extends JpaRepository<Study03Entity, Long> {

}
