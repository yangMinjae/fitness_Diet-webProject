package test;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.ChatModel;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;



// Configures using the `OPENAI_API_KEY`, `OPENAI_ORG_ID` and `OPENAI_PROJECT_ID` 
// environment variables

public class apiTest {
	public static void main(String[] args) {

        
		OpenAIClient client = OpenAIOkHttpClient.builder()
				.fromEnv()
				.apiKey("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")
				.baseUrl("https://api.openai.com/v1")
				.build();
		
		String input = "[요청사항]\r\n" + 
				"- !!!앞뒤 설명이나 사족(예: \"알겠어요! 만들어드릴게요\") 없이, 필요한 정보만 출력할 것.!!!\r\n" + 
				"- 식단의 이름은 <div id = \"dietName\"> 태그 안에 넣을것\r\n" + 
				"- 식단의 이름은 재밌고 독특하며 식단의 특성을 반영하는이름\r\n" + 
				"- 각 끼니는 <div id=\"diet1\">, <div id=\"diet2\">, ... 형태로 출력할 것.\r\n" + 
				"- 각 끼니의 칼로리는 <div id=\"diet1Cal\">, <div id = \"diet2Cal>,... 로 표시\r\n" + 
				"- 각 끼니의 레시피는 <div id=\"diet1Recipe\">, <div id=\"diet2Recipe\">, ... 형태로 출력할 것.\r\n" + 
				"- 각 끼니의 재료는 g수를 포함시켜  <div id=\"diet1Ingredient\">, <div id=\"diet2Ingredient\">, ... 형태로 출력할것.\r\n" + 
				"- 모든 메인 요리뿐만 아니라, 사용하는 소스나 드레싱(예: 타히니 소스, 발사믹 드레싱 등)도 직접 만들 수 있도록 레시피를 상세히 작성할 것.\r\n" + 
				"- 소스나 드레싱에 들어가는 재료와 그 중량(g), 만드는 방법을 함께 명시할 것.\r\n" + 
				"- 만약 시판 제품을 사용하는 경우에는 생략가능\r\n" + 
				"- 끼니 이름과 레시피,재료 외에 다른 문장은 작성하지 말 것.\r\n" + 
				"- 요청을 여러번 할거라 식단과 식단제목은 가능하면 다양하게 바뀌면 좋겠다.\r\n" + 
				"\r\n" + 
				"[식단 요청사항] \r\n" + 
				"- 이 사람은 다이어트를 원하는 [20]대 [남]성이야\r\n" + 
				"- 하루에 섭취할 칼로리는 [2200] kcal이고 이를 끼니수로 나눠서 칼로리를 적절하게 분배해서 식단을 작성해(총합만 일치하면 돼)\r\n" + 
				"- 각 끼니의 칼로리와 탄단지가 실제 음식의 칼로리와 탄단지와 실제로 거의 일치해야해\r\n" + 
				"- 탄단지 비율: [40:30:30]이고 모든 끼니에 적용되도록 식단을 구성할 것. (±5% 오차 허용)\r\n" + 
				"- 식단 수: [3] 끼니.\r\n" + 
				"- 이사람은 요리를 즐겨하는 사람 : 요리 난이도는 상관없고, 레시피를 상세하고 정식으로 작성할 것. 가능하면 요리로 식단을 줘\r\n" + 
				"- 꼭 뻔한 다이어트식 아니어도 다양한 나라의 음식 레시피 다이어트 버전 포함시키기면 좋음\r\n" + 
				"- 각 식단에는 모든 재료별 중량(g)을 반드시 포함할 것.\r\n" + 
				"- 다이어트 시 결핍되기 쉬운 탄단지를 제외한 필수 영양소를 고려하여 식단을 구성할 것.\r\n" + 
				"- 현재 복용 중인 영양제 [비타민B, 비타민C]의 영양소는 굳이 추가하지 않아도 됨.\r\n" + 
				"- 비건식 여부: [비비건]\r\n" + 
				"- 모든 식단의 총 칼로리와 탄단지(g)는 각 재료별 중량(g)과 100g당 영양정보(kcal, 탄수화물g, 단백질g, 지방g)를 기준으로 정확히 계산할 것.\r\n" + 
				"- 끼니별 총합 칼로리와 탄단지 합계는 목표값 대비 ±5% 이내로 반드시 일치하도록 식재료 중량을 조정할 것.\r\n" + 
				"- 칼로리 및 탄단지 정확성 확보를 최우선할 것.\r\n" + 
				"- 필요한 경우, kcal 및 탄단지 값을 충족시키기 위해 소량 재료 추가나 중량(g) 조정을 허용할 것.\r\n" + 
				"- 닭가슴살도 좋고 이 외에 다른 저지방 고단백질 원 활용해도 좋음(구체적 부위 명시), 단 너무 비싸거나 한국 마트에서 쉽게 구하기 어려운 재료 제외\r\n" + 
				"   ex) 소고기(안심, 우둔살, 등등), 돼지고기(목살, 앞다리살 등등), 오리, 콩, 두부 등의 식물성 단백질\r\n" + 
				"- 선호하는 음식은[순두부찌개, 삼겹살, 치킨, 뷔프부르기뇽 ] 이야. 이메뉴 그대로 달라는게 아니라 선호메뉴를 기반으로 이 사람 취향 추측해서 메뉴 선정 해봐\r\n" + 
				"\r\n" + 
				"[출력 예시]\r\n" + 
				"<div id = \"dietName\">식단이름</div>\r\n" + 
				"<div id=\"diet1\">아침</div>\r\n" + 
				"<div id=\"diet1Cal\">421kcal (탄수화물 81g, 단백질 65g, 지방 32g)</div>\r\n" + 
				"<div id=\"diet1Ingredient\">재료\r\n" + 
				"-연어 80g\r\n" + 
				"-아보카도 30g\r\n" + 
				"-...\r\n" + 
				"</div>\r\n" + 
				"<div id=\"diet1Recipe\">1. 재료를 준비한다. 2. 조리한다.</div>\r\n" + 
				"\r\n" + 
				"<div id=\"diet2\">점심</div>\r\n" + 
				"<div id=\"diet2Cal\">531kcal (탄수화물 81g, 단백질 65g, 지방 32g)</div>\r\n" + 
				"<div id=\"diet1Ingredient\">재료\r\n" + 
				"-연어 80g\r\n" + 
				"-아보카도 30g\r\n" + 
				"-...\r\n" + 
				"<div id=\"diet2Recipe\">1. 재료를 준비한다. 2. 조리한다.</div>";
		
		ResponseCreateParams params = ResponseCreateParams.builder()
		        .input(input)
		        .model(ChatModel.CHATGPT_4O_LATEST)
		        .build();
		
		Response response = client.responses().create(params);
		System.out.println(response.output().get(0).message().get().content().get(0).outputText().get().text());
	}
	
}
