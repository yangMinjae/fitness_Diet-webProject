package com.serofit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.openai.models.beta.assistants.AssistantUpdateParams.Model;
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
	public String processDietResult(SubmitDietDTO dDto, RedirectAttributes redirectAttributes) {
		boolean result = sService.updateMateTbl(dDto);
		System.out.println("메이트 테이블 수정 결과 : "+result);
		redirectAttributes.addFlashAttribute(dDto);
		return "redirect:/goToSurveyResult";
	}
	@GetMapping("/goToSurveyResult")
	public String gotoSurveyResultPage(@ModelAttribute("dDto") SubmitDietDTO dDto, Model model) {
		//sService.
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
	
}
