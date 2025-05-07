package com.serofit.other;

import com.serofit.domain.submitSurvey.SubmitDietDTO;

public class DietScriptGenerator {
	
	private SubmitDietDTO sDTO = null;
	
	public DietScriptGenerator() {
	
	}

	public void setsDTO(SubmitDietDTO sDTO) {
		this.sDTO = sDTO;
	}

	private final String instruction =
			"You are a backend HTML API that receives JSON instructions and only responds with raw HTML <div> tags — no comments, no preambles, no code fences, no explanations, no summaries. You must output only the requested HTML in raw format and nothing else. You are not a chatbot or a helper.\r\n";
	
	private String dietScript =
			instruction+ 
			
			"[요청사항]\r\n" + 
			"-식단 이름은 <div id = \"dietName\"> 태그 안에 넣을 것.\r\n" + 
			"-식단 이름은 재밌고 독특하며 식단의 특성을 반영하는 이름으로 작성할 것.\r\n" + 
			"-각 끼니는 <div id=\"diet1\">, <div id=\"diet2\">, ... 형태로 출력할 것.\r\n" + 
			"-각 끼니의 영양성분은 <div id=\"diet1Nutrition\">, <div id=\"diet2Nutrition\">, ... 형태로 출력할 것.\r\n" + 
			"-각 끼니의 레시피는 <div id=\"diet1Recipe\">, <div id=\"diet2Recipe\">, ... 형태로 출력할 것.\r\n" + 
			"-각 끼니의 재료는 g 단위로 <div id=\"diet1Ingredient\">, <div id=\"diet2Ingredient\">, ... 형태로 출력할 것.\r\n" + 
			"-이용자에게 출력할것을 고려해 div 내부에 줄바꿈태그 br을이용해 자연스럽게 할것\r\n" + 
			"-모든 메인 요리뿐만 아니라 소스나 드레싱(예: 타히니 소스, 발사믹 드레싱 등)도 직접 만들 수 있도록 레시피를 상세히 작성할 것.\r\n" + 
			"-소스나 드레싱에 들어가는 재료와 그 중량(g), 만드는 방법을 함께 명시할 것. (단, 시판 제품 사용하는 경우 생략 가능)\r\n" + 
			"-끼니 이름, 레시피, 재료 외에 다른 문장은 작성하지 말 것.\r\n" + 
			"-요청을 여러 번 할 예정이므로 식단 이름과 구성은 다양하게 바뀌도록 할 것.\r\n" + 
			"-재료별 중량(g)을 반드시 명시할 것.\r\n" + 
			"-식단의 총 칼로리와 탄단지(g)는 100g당 재료의 영양정보를 참고하고, 중량을 고려하여 정확히 계산할 것. \r\n" + 
			"-탄단지 정확성 확보를 최우선으로 할 것.\r\n" + 
			"-필요한 경우 탄단지 값 충족을 위해 소량의 재료 추가 또는 중량(g)을 조정할것\r\n" + 
			"-너무 비싸거나 한국 마트에서 구하기 어려운 재료는 사용하지 말 것.\r\n" + 
			"-닭가슴살뿐만 아니라 소고기(안심, 우둔살 등), 돼지고기(목살, 앞다리살 등), 오리, 콩, 두부 등 다양한 저지방 고단백질 식품을 활용할 것.\r\n" + 
			"{isGoodCook}"+
			
			"[식단 요청사항] \r\n" + 
			"-대상: {goal}를 원하는 {age} {gender}성.\r\n" + 
			"-식단 수: {NofDiets} 끼니.\r\n" + 
			"-하루 섭취 탄단지 총량: 탄수화물 {carbo}g, 단백질 {protein}g, 지방 {fat}g\r\n" + 
			"-비건식 여부: {isVegan}\r\n" + 
			"-다이어트 중 부족할 수 있는 탄단지 이외의 영양소를 고려해 식단을 짜되, 현재 {supplements}영양제를 이미 복용하므로 굳이 고려하려 하지 않아도됨.\r\n" + 
			"-선호하는 음식 {favFoods}을 참고해 취향을 추측하고 이를 반영한 메뉴를 선정할 것.(메뉴를 굳이 그대로 식단에 넣을 필요는 없음)\r\n" + 
			"\r\n" + 
			
			"[출력 예시]\r\n" + 
			"<div id = \"dietName\">식단이름</div>\r\n" + 
			"<div id=\"diet1\">아침</div>\r\n" + 
			"<div id=\"diet1Nutrition\">(탄수화물 71g, 단백질 65g, 지방 32g)</div>\r\n" + 
			"<div id=\"diet1Ingredient\">\r\n" + 
			"재료 :\r\n" + 
			"-연어 80g\r\n" + 
			"-아보카도 30g\r\n" + 
			"-...\r\n" + 
			"</div>\r\n" + 
			"<div id=\"diet1Recipe\">1. 재료를 준비한다. 2. 조리한다.</div>\r\n" + 
			"\r\n" + 
			"<div id=\"diet2\">점심</div>\r\n" + 
			"<div id=\"diet2Nutrition\">(탄수화물 41g, 단백질 60g, 지방 30g)</div>\r\n" + 
			"<div id=\"diet1Ingredient\">\r\n" + 
			"재료 :\r\n" + 
			"-연어 80g\r\n" + 
			"-아보카도 30g\r\n" + 
			"-...\r\n" + 
			"<div id=\"diet2Recipe\">1. 재료를 준비한다. 2. 조리한다.</div>";
	
	private String healthRoutineScript;
	
	private String etcRoutineScript;
	
	private String cheatingMealScript;
	
	private String adviceScript;
	
	public String getDietScript() {
		/*
		String result = dietScript
				.replace("{goal}", sDTO.getDietGoal())
		        .replace("{age}", sDTO.getCDTO().getAge())
		        .replace("{gender}", sDTO.getCDTO().isGender()?"남":"여")
		        .replace("{NofDiets}", sDTO.getCDTO().getHit()+"");
		
		        .replace("{carbo}", String.valueOf(sDTO.getCarbohydrate()))
		        .replace("{protein}", String.valueOf(sDTO.getProtein()))
		        .replace("{fat}", String.valueOf(sDTO.getFat()))
		        .replace("{isVegan}", sDTO.isVegan() ? "비건" : "비비건")
		        .replace("{supplements}", sDTO.getSupplements())
		        .replace("{favFoods}", sDTO.getFavFoods())
		        */
		return null;
	}
			
}
