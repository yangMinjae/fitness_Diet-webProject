package com.serofit.controller;


import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.serofit.domain.submitSurvey.SubmitDietDTO;
import com.serofit.domain.submitSurvey.SubmitGainDTO;
import com.serofit.service.SurveyService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/survey/*")
public class SurveyController {

	@Autowired
	SurveyService sService;
	
	@PostMapping(value = "/submitDiet", consumes = "application/json;charset=UTF-8",produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String processDietResult(@RequestBody SubmitDietDTO dDTO, HttpSession session) {
		log.warn(dDTO);
		boolean result = sService.updateTbl(dDTO);
		System.out.println("테이블 수정 결과 : "+result);
		Map<String,String> aiResult = sService.makeAiGeneratedData(dDTO);
		session.setAttribute("result", aiResult);
		session.setAttribute("goal", dDTO.getcDTO().getGoal());
		return "ok";
	}
	@GetMapping("/surveyResultPage")
	public String gotoSurveyResultPage(HttpSession session, Model model) {
		model.addAttribute("result",session.getAttribute("result"));
		model.addAttribute("goal",session.getAttribute("goal"));
	    return "/survey/surveyResultPage";
	}

//	@PostMapping(value = "/submitDiet", consumes = "application/json;charset=UTF-8",produces = "text/plain;charset=UTF-8")
//	@ResponseBody
//	public String processGainResult(@RequestBody SubmitGainDTO gDTO, HttpSession session) {
//		log.warn(gDTO);
//		boolean result = sService.updateTbl(gDTO);
//		System.out.println("테이블 수정 결과 : "+result);
//		Map<String,String> aiResult = sService.makeAiGeneratedData(gDTO);
//		session.setAttribute("result", aiResult);
//		session.setAttribute("goal", gDTO.getcDTO().getGoal());
//		return "ok";
//	}

	@PostMapping("/submitPro")
	public String processProResult(Model model) {
		return "";
	}

	@PostMapping("/submitHealth")
	public String processHealthResult(Model model) {
		return "";
	}

	@PostMapping("/submitMaintain")
	public String processMaintainResult(Model model) {
		return "";
	}
	@GetMapping("/resultTest")
	public void surveyResultTest() {
		
	}
	
}
