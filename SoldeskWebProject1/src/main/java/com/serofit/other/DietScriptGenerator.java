package com.serofit.other;

import java.util.Arrays;

import com.serofit.domain.submitSurvey.SubmitDietDTO;

import lombok.extern.log4j.Log4j;

@Log4j
public class DietScriptGenerator {
	
	private SubmitDietDTO dDTO = null;
	
	public DietScriptGenerator() {
	
	}
	
	public DietScriptGenerator(SubmitDietDTO dDTO) {
		this.dDTO=dDTO;
	}
	
	public void setdDTO(SubmitDietDTO dDTO) {
		this.dDTO = dDTO;
	}

	private final String instruction =
			"You are a backend HTML API that receives JSON instructions and only responds with raw HTML <div> tags — no comments, no preambles, no code fences, no explanations, no summaries. You must output only the requested HTML in raw format and nothing else. You are not a chatbot or a helper.\r\n";
	
	private final String complex = 
			"-요리에 자신있는 사람이기 때문에 요리 난이도와 레시피 복잡도가 높아도 괜찮음\r\n";
	
	private final String notComplex = 
			"-요리를 안하는 사람이기 때문에 요리시간 15분이내, 재료는 5개 이내, 소스는 가능하면 시판 사용\r\n" + 
			"-조리가 간편해 졌지만, 여전히 탄단지 그램수, 칼로리수는 정확히 지키도록 재료 조정할것\r\n";
	
	private String dietScript =
			instruction+ 
			
			"[요청사항]\r\n" + 
			"-식단 이름은 <div id = \"dietTitle\"> 태그 안에 넣을 것.\r\n" + 
			"-식단 이름은 재밌고 독특하며 식단의 특성을 반영하는 이름으로 작성할 것.\r\n" + 
			"-각 끼니는(아침,점심,저녁등) <div id=\"diet1\">, <div id=\"diet2\">, ... 형태로 출력할 것 class는 dietName로 통일.\r\n" + 
			"-각 끼니의 탄단지는 <div id=\"diet1Nutrition\">, <div id=\"diet2Nutrition\">, ... 형태로 출력할 것. class는 dietNutrition으로 통일\r\n" + 
			"-각 끼니의 재료는 g 단위로 id가 dietNIngredient(N은 끼니의 넘버와 일치 시키기)인 ul 형태로 출력할 것. 각 세부 항목은 li에 넣을것. class는 dietIngredient로 통일\r\n" + 
			"-각 끼니의 레시피는 id가 dietNRecipe(N은 끼니의 넘버와 일치 시키기)인 ol 형태로 출력할 것. 각 순서 항목은 li에 넣을것. class는 dietRecipe로 통일\r\n" + 
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
			"{isGoodCook}\r\n"+
			
			"[식단 요청사항]\r\n" + 
			"-대상: {goal}를 원하는 {age}세 {gender}성.\r\n" + 
			"-식단 수: {NofDiets} 끼니.\r\n" + 
			"-하루 섭취 탄단지 총량: 탄수화물 {carbo}g, 단백질 {protein}g, 지방 {fat}g - {dietType}식단\r\n" + 
			"-비건식 여부: {isVegan}\r\n" + 
			"-다이어트 중 부족할 수 있는 탄단지 이외의 영양소를 고려해 식단을 짜되, 현재 {supplements}영양제를 이미 복용하므로 굳이 고려하려 하지 않아도됨.\r\n" + 
			"-선호하는 음식 {favFoods}을 참고해 취향을 추측하고 이를 반영한 메뉴를 선정할 것.(메뉴를 굳이 그대로 식단에 넣을 필요는 없음)\r\n" + 
			"\r\n" + 
			
			"[출력 예시]\r\n" + 
			"<div id = \"dietTitle\">식단이름</div>\r\n" + 
			"<div id=\"diet1\" class = \"dietName\">아침 - 프로틴 된장찌개백반과 현미밥</div>\r\n" + 
			"<div id=\"diet1Nutrition\" class = \"dietNutrition\">(탄수화물 71g, 단백질 65g, 지방 32g)</div>\r\n" + 
			"<ul id=\"diet1Ingredient\" class = \"dietIngredient\">\r\n" + 
			"	<li>연어 80g</li>\r\n" + 
			"	<li>아보카도 30g</li>\r\n" + 
			"	.\r\n" + 
			"	.	\r\n" + 
			"	.\r\n" + 
			"</ul>\r\n" + 
			"<ol id=\"diet1Recipe\" class = \"dietRecipe\">\r\n" + 
			"	<li>재료를 준비한다.</li>\r\n" + 
			"	<li>조리한다.</li>\r\n" + 
			"</ol>\r\n" + 
			"\r\n" + 
			"<div id=\"diet2\" class = \"dietName\">점심 - 연어 스테이크와 현미밥</div>\r\n" + 
			"<div id=\"diet2Nutrition\" class = \"dietNutrition\">(탄수화물 71g, 단백질 65g, 지방 32g)</div>\r\n" + 
			"<ul id=\"diet2Ingredient\" class = \"dietIngredient\">\r\n" + 
			"	<li>연어 80g</li>\r\n" + 
			"	<li>아보카도 30g</li>\r\n" + 
			"	.\r\n" + 
			"	.	\r\n" + 
			"	.\r\n" + 
			"</ul>\r\n" + 
			"<ol id=\"diet2Recipe\" class = \"dietRecipe\">\r\n" + 
			"	<li>재료를 준비한다.</li>\r\n" + 
			"	<li>2조리한다.</li>\r\n" + 
			"</ol>";
	
	private String healthRoutineScript = 
			instruction+
			
			"이 사람은 {age}세 {goal}를 원하는 {gender}성이고 선호하는 운동은 {favSport}야.  \r\n" + 
			"분할은 {workoutSplit}분할이야.  \r\n" + 
			"위의 정보를 고려해 적절한 운동 루틴을 추천해줘.\r\n" + 
			"\r\n" + 
			
			"[요청사항]\r\n" + 
			"- !!!앞뒤 설명이나 사족(예: \"알겠어요! 만들어드릴게요\") 없이, 필요한 정보만 출력할 것.!!!\r\n" + 
			"- 2/3/4 분할 루틴은 partition1, partition2, partition3, partition4 형태로 나누어 요일(월,화,수....)과 부위 등과 매치해 제시.\r\n" + 
			"- 각 파티션 제목, 요일, 부위 등은 id가 partitionN (N은 partition숫자), class가 partitionTitles인 div에 넣을것\r\n" + 
			"- 세부 운동 스케줄은 id가 scheduleN(N은 제목의 partition의 N과 같은 숫자), class가 schedule인 ul에 li 태그로 넣을것\r\n" + 
			"- 요일 단위로, 최소 4회 이상 운동 스케줄 제공\r\n" + 
			"- 각 partition마다 종목과 세트수를 상세히 작성할 것.\r\n" + 
			"- 각 운동의 반복 횟수는 '-' 기호를 사용하여 정확하게 표기할 것. (예: 10-12회)\r\n" + 
			"- 세트 간 휴식 시간도 '-' 기호를 사용하여 정확하게 표기할 것. (예: 45-60초)\r\n" + 
			"- 운동 스케줄을 먼저 작성하고 해당 스케줄의 특징(왜 다이어트에 도움이 되는지), 구체적 수행방법 작성\r\n" + 
			"- 운동 스케줄과 조언 및 요청한 것 외 다른 문장은 포함하지 말 것.\r\n" + 
			"- 조언파트는 id가 \"routineAdvice\" 인 div에 넣고 (조언, 특징, 수행방법등)은 \"이 스케줄은\" 이렇게 항상 시작\r\n" + 
			"- 조언 파트에 요일은 개인 스케줄에 따라 조절 가능하다고 표시해주기.";
	
	private String etcRoutineScript = 
			instruction+
			"이 사람은 {age}세 {goal}를 원하는 {gender}성이고 ,선호하는 운동은 {favSport}야.  \r\n" + 
			"주어진 정보를 고려해 적절한 운동 루틴을 추천해줘.\r\n" +
			"\r\n" + 
			
			"[요청사항]\r\n" + 
			"- !!!앞뒤 설명이나 사족(예: \"알겠어요! 만들어드릴게요\") 없이, 필요한 정보만 출력할 것.!!!\r\n" + 
			"- 맨몸운동일 경우: 월요일 ~ 일요일 요일별로 종목과 세트수 작성.\r\n" + 
			"- 스포츠일 경우: 요일별 운동을 추천하여 일주일 운동 스케줄을 제시.\r\n" + 
			"- 각 요일(스포츠일경우 종목도 같이)을 제목으로 id가 partitionN(N은 partition 숫자), class가 partitionTitles인 div에 넣을것\r\n" + 
			"- 세부 스케줄은 id가 scheduleN(N은 partition숫자와 일치), class가 schedule인인 ul에 li 태그로 넣을것\r\n" + 
			"- 각 운동의 반복 횟수는 '-' 기호를 사용하여 정확하게 표기할 것. (예: 10-12회)\r\n" + 
			"- 세트 간 휴식 시간도 '-' 기호를 사용하여 정확하게 표기할 것. (예: 45-60초)\r\n" + 
			"- 운동 스케줄을 먼저 작성하고 해당 스케줄의 특징(왜 다이어트에 도움이 되는지), 구체적 수행방법 작성\r\n" + 
			"- 운동 스케줄과 조언 및 요청한 것 외 다른 문장은 포함하지 말 것.\r\n" + 
			"- 조언파트는 id가 \"routineAdvice\" 인 div에 넣고 (조언, 특징, 수행방법등)은 \"이 스케줄은\" 이렇게 항상 시작"
			;
	
	private String cheatingMealScript = 
			instruction + 
			
			"[요청사항]\r\n" + 
			"이사람은 식욕 조절 능력이 {appetiteControl}인 사람이야 {frequency} 에 한번 치팅을 할건데, 치팅시 다이어트를 크게 방해 하지 않는 음식 4가지 정도만 추천해줘.\r\n" + 
			"\r\n" + 
			
			"[조건]\r\n" + 
			"- !!!앞뒤 설명이나 사족(예: \"알겠어요! 만들어드릴게요\") 없이, 필요한 정보만 출력할 것.!!!\r\n" + 
			"- 음식이름과 이 음식이 치팅에 좋은 이유를 각각 작성할것\r\n" + 
			"- 음식 이름과 설명 외에 다른 문장은 작성하지 말 것.\r\n" + 
			"- 음식 이름은 id가 cheatingMealN(N은 1부터 시작하는 숫자), class가 cheatingMeal인 div에 넣고, 이유는 id가 reasonN(N은 chatingMeal의N과일치), class가 reason인 div에 넣을것"
			;
	
	private String adviceScript =
			instruction +
			
			"[요청사항]\r\n" + 
			"이 사람은 {goal}가 어려운 이유를 {difficulties}이라고 대답했어.\r\n" + 
			"다이어트 성공을 위한 조언과 추천 등을 해줘\r\n" + 
			"\r\n" + 
			"[조건]\r\n" + 
			"- !!!앞뒤 설명이나 사족(예: \"알겠어요! 만들어드릴게요\") 없이, 필요한 정보만 출력할 것.!!!\r\n" + 
			"- 문장형으로 딱딱 끊기지 않게 흐름이 이어지게 답변 했으면 좋겠어\r\n" + 
			"- 말투는 딱딱하지 않고 요 체로\r\n" + 
			"- 문장 전체를 id가 advice인 div에 담을것";
	
	public String getDietScript() {
		String result = dietScript
				.replace("{goal}", dDTO.getcDTO().getGoal())
		        .replace("{age}", dDTO.getcDTO().getAge()+"")
		        .replace("{gender}", dDTO.getcDTO().isGender()?"남":"여")
		        .replace("{NofDiets}", dDTO.getcDTO().getHit()+"");
		
		DietUtilCalculator cal = new DietUtilCalculator();
		cal.setTotalCalNormalCase(dDTO.getcDTO(), dDTO.getDietGoal());
		String[] nutrients = cal.getNutrientsGram(dDTO.getDietType());
		result = result
				.replace("{carbo}", nutrients[0])
				.replace("{protein}", nutrients[1])
		        .replace("{fat}", nutrients[2])
		        .replace("{dietType}", dDTO.getDietType())
		        .replace("{isVegan}", dDTO.getcDTO().getVegan()=="yes" ? "비건" : "비비건")
		        .replace("{supplements}", Arrays.toString(dDTO.getcDTO().getSupplements()))
		        .replace("{favFoods}", Arrays.toString(dDTO.getcDTO().getFavoriteFood()));
		if(dDTO.getcDTO().getRecipeComplexity().equals("low")) {
			result = result.replace("{isGoodCook}", complex);
		}else if(dDTO.getcDTO().getRecipeComplexity().equals("high")) {
			result = result.replace("{isGoodCook}", notComplex);
		}
		return result;
	}
	
	public String getRoutineScript() { 
		String result;
		if(dDTO.getcDTO().getFavSport().equals("헬스")) {
			result = healthRoutineScript
					.replace("{age}",dDTO.getcDTO().getAge()+"")
					.replace("{goal}",dDTO.getcDTO().getGoal())
					.replace("{gender}", dDTO.getcDTO().isGender()?"남":"여")
					.replace("{favSport}", dDTO.getcDTO().getFavSport())
					.replace("{workoutSplit}", dDTO.getcDTO().getWorkoutSplit()+"");
		}
		else {
			result = etcRoutineScript
					.replace("{age}",dDTO.getcDTO().getAge()+"")
					.replace("{goal}",dDTO.getcDTO().getGoal())
					.replace("{gender}", dDTO.getcDTO().isGender()?"남":"여")
					.replace("{favSport}", dDTO.getcDTO().getFavSport());
			
		}
		return result; 
	}
	
	public String getCheatingMealScript() {
		String result;
		result = cheatingMealScript
				.replace("{appetiteControl}", dDTO.getAppetiteControl());
		
		switch (dDTO.getAppetiteControl()) {
		case "상":
			result = result.replace("{frequency}", "열흘");
			break;
			
		case "중":
			result = result.replace("{frequency}", "일주일");
			break;
			
		case "하":
			result = result.replace("{frequency}", "4일");
			break;
		}
		return result;
	}
	
	public String getAdviceScript() {
		String result;
		result = adviceScript
				.replace("{goal}", dDTO.getcDTO().getGoal())
				.replace("{difficulties}", dDTO.getDietDifficulties());
		return result;
	}
	 
			
}
