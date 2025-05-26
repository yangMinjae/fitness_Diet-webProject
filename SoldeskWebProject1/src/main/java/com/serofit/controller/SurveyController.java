package com.serofit.controller;


import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.serofit.domain.DietVO;
import com.serofit.domain.ValTagEnum;
import com.serofit.domain.submitSurvey.SubmitDietDTO;
import com.serofit.domain.submitSurvey.SubmitGainDTO;
import com.serofit.domain.submitSurvey.SubmitHealthDTO;
import com.serofit.domain.submitSurvey.SubmitMaintainDTO;
import com.serofit.domain.submitSurvey.SubmitMuscleDTO;
import com.serofit.domain.submitSurvey.SubmitStrengthDTO;
import com.serofit.service.SurveyService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/survey/*")
public class SurveyController {

	@Autowired
	SurveyService sService;
	
	@PostMapping(value = "/submitDiet", consumes = "application/json;charset=UTF-8", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String processDietResult(@RequestBody SubmitDietDTO dDTO, HttpSession session) {
		boolean result = sService.updateTbl(dDTO);
		Map<String,String> aiResult = sService.makeAiGeneratedData(dDTO);
		session.setAttribute("result", aiResult);
		session.setAttribute("goal", ValTagEnum.toLabel(dDTO.getcDTO().getGoal()));
		return "ok";
	}
	
	@GetMapping("/surveyResultPage")
	public String gotoSurveyResultPage(HttpSession session, Model model) {
		model.addAttribute("result",session.getAttribute("result"));
		model.addAttribute("goal",session.getAttribute("goal"));
	    return "/survey/surveyResultPage";
	}

	@PostMapping(value = "/submitGain", consumes = "application/json", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String processGainResult(@RequestBody SubmitGainDTO gDTO, HttpSession session) {
		boolean result = sService.updateTbl(gDTO);
		
		Map<String,String> aiResult = sService.makeAiGeneratedData(gDTO);
		session.setAttribute("result", aiResult);
		session.setAttribute("goal", ValTagEnum.toLabel(gDTO.getcDTO().getGoal()));
		return "ok";
	}

	@PostMapping(value = "/submitHealth", consumes = "application/json", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String processHealthResult(@RequestBody SubmitHealthDTO hDTO, HttpSession session) {
		boolean result = sService.updateTbl(hDTO);
		
		Map<String,String> aiResult = sService.makeAiGeneratedData(hDTO);
		session.setAttribute("result", aiResult);
		session.setAttribute("goal", ValTagEnum.toLabel(hDTO.getcDTO().getGoal()));
		return "ok";
	}

	@PostMapping(value = "/submitMaintain", consumes = "application/json",produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String processMaintainResult(@RequestBody SubmitMaintainDTO mDTO, HttpSession session) {
		boolean result = sService.updateTbl(mDTO);
		
		Map<String,String> aiResult = sService.makeAiGeneratedData(mDTO);
		session.setAttribute("result", aiResult);
		session.setAttribute("goal", ValTagEnum.toLabel(mDTO.getcDTO().getGoal()));
		return "ok";
	}
	
	@PostMapping(value = "/submitStrength", consumes = "application/json", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String processStrengthResult(@RequestBody SubmitStrengthDTO sDTO, HttpSession session) {
		boolean result = sService.updateTbl(sDTO);
		
		Map<String,String> aiResult = sService.makeAiGeneratedData(sDTO);
		session.setAttribute("result", aiResult);
		session.setAttribute("goal", ValTagEnum.toLabel(sDTO.getcDTO().getGoal()));
		return "ok";
	}
	
	@PostMapping(value = "/submitMuscle", consumes = "application/json", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String processMuscleResult(@RequestBody SubmitMuscleDTO mDTO, HttpSession session) {
		boolean result = sService.updateTbl(mDTO);
		
		Map<String,String> aiResult = sService.makeAiGeneratedData(mDTO);
		session.setAttribute("result", aiResult);
		session.setAttribute("goal", ValTagEnum.toLabel(mDTO.getcDTO().getGoal()));
		return "ok";
	}
	@PutMapping(value = "/insertDiet", consumes = "application/json", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String insertDiet(@RequestBody DietVO dvo) {
		sService.insertDiet(dvo);
	    return "저장 완료";
	}
	
}
