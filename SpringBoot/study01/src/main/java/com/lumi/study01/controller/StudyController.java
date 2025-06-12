package com.lumi.study01.controller;

import com.lumi.study01.dto.MemberDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/study")
public class StudyController {

    @GetMapping("")
    public List<MemberDTO> memberList() {
        return
    }
}
