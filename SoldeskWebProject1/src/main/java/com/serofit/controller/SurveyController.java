package com.serofit.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.serofit.domain.submitSurvey.AbstractSubmitDTO;
import com.serofit.domain.submitSurvey.SubmitDietDTO;
import com.serofit.service.SurveyService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/survey/*")
public class SurveyController {

	@Autowired
	SurveyService sService;
	
	@PostMapping("/submitDiet")
	public String processDietResult(SubmitDietDTO dDTO, RedirectAttributes redirectAttributes) {
		boolean result = sService.updateMateTbl(dDTO);
		System.out.println("메이트 테이블 수정 결과 : "+result);
		redirectAttributes.addFlashAttribute("DTO",dDTO);
		return "redirect:/survey/resultPage";
	}
	@GetMapping("/resultPage")
	public String gotoSurveyResultPage(@ModelAttribute("DTO") AbstractSubmitDTO DTO, Model model) {
		model.addAttribute("goal", DTO.getCDTO().getGoal());
		Map<String,String> result = sService.makeAiGeneratedData(DTO);
		model.addAttribute("result", result);
	    return "/survey/surveyResult";
	}

	@PostMapping("/submitGain")
	public String processGainResult(Model model) {
		return "";
	}

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
	@GetMapping("/surveyResultTest")
	public void surveyResultTest() {
		
	}
	
}
