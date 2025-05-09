<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/surveyResultPage.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
<button id="printBtn" title="PDF 저장"><i class="fa-solid fa-print"></i></button>
	<div id="mainBlock">

		<div class="details">
			<div id="dietSubheading" class="subheadings">맞춤 식단</div>
			<div id="dietTitle">닭근육 대폭발 저탄고지 플랜</div>
			<div id="diet1" class="dietName">아침 - 버터 닭가슴살 스크램블 &amp; 올리브
				아보카도</div>
			<div id="diet1Nutrition" class="dietNutrition">860kcal (탄수화물
				4g, 단백질 58g, 지방 68g)</div>
			<ul id="diet1Ingredient" class="dietIngredient">
				<li>닭가슴살 150g</li>
				<li>계란 3개 (150g)</li>
				<li>무염 버터 15g</li>
				<li>아보카도 50g</li>
				<li>올리브오일 10g</li>
			</ul>
			<ol id="diet1Recipe" class="dietRecipe">
				<li>닭가슴살은 잘게 찢어서 프라이팬에 버터 5g을 넣고 볶는다.</li>
				<li>계란은 풀어서 나머지 버터 10g과 함께 스크램블로 익힌다.</li>
				<li>닭가슴살과 계란을 섞어 한 접시에 담고, 옆에 아보카도 슬라이스를 올린다.</li>
				<li>아보카도 위에 올리브오일을 뿌려 마무리한다.</li>
			</ol>

			<div id="diet2" class="dietName">점심 - 목살 구이와 소이마요 양배추 샐러드</div>
			<div id="diet2Nutrition" class="dietNutrition">946kcal (탄수화물
				8g, 단백질 62g, 지방 74g)</div>
			<ul id="diet2Ingredient" class="dietIngredient">
				<li>돼지 목살 180g</li>
				<li>양배추 100g</li>
				<li>마요네즈 20g</li>
				<li>간장 5g</li>
				<li>올리브오일 10g</li>
			</ul>
			<ol id="diet2Recipe" class="dietRecipe">
				<li>돼지 목살을 소금 간만 살짝 해서 구워서 접시에 담는다.</li>
				<li>양배추를 채썬 후 간장, 마요네즈, 올리브오일을 섞어 드레싱을 만든다.</li>
				<li>양배추에 드레싱을 뿌려 목살 옆에 함께 담는다.</li>
			</ol>

			<div id="diet3" class="dietName">저녁 - 소고기 안심 구이와 고소한 타히니 브로콜리</div>
			<div id="diet3Nutrition" class="dietNutrition">941kcal (탄수화물
				6g, 단백질 56g, 지방 77g)</div>
			<ul id="diet3Ingredient" class="dietIngredient">
				<li>소고기 안심 170g</li>
				<li>브로콜리 100g</li>
				<li>참깨 10g</li>
				<li>올리브오일 10g</li>
				<li>소금 2g</li>
			</ul>
			<ol id="diet3Recipe" class="dietRecipe">
				<li>소고기 안심은 소금 간 후 미디엄으로 구운 후 슬라이스한다.</li>
				<li>브로콜리는 데쳐서 식힌다.</li>
				<li>참깨를 믹서에 갈고 올리브오일과 소금을 섞어 타히니 소스를 만든다.</li>
				<li>브로콜리에 타히니 소스를 뿌려 접시에 안심과 함께 담는다.</li>
			</ol>
		</div>

		<div class="details">
			<div id="routineSubheading" class="subheadings">운동 루틴</div>
			<div id="partition1" class="partitionTitles">월요일 - 가슴 / 삼두</div>
			<ul id="schedule1" class="schedule">
				<li>벤치 프레스: 4세트 10-12회 - 휴식 60초</li>
				<li>인클라인 덤벨 프레스: 3세트 10-12회 - 휴식 45초</li>
				<li>펙덱 플라이: 3세트 12-15회 - 휴식 45초</li>
				<li>딥스(삼두 집중): 3세트 10-12회 - 휴식 60초</li>
				<li>트라이셉스 케이블 푸시다운: 3세트 12-15회 - 휴식 45초</li>
			</ul>

			<div id="partition2" class="partitionTitles">수요일 - 등 / 이두</div>
			<ul id="schedule2" class="schedule">
				<li>랫풀다운: 4세트 10-12회 - 휴식 60초</li>
				<li>바벨 로우: 3세트 8-10회 - 휴식 60초</li>
				<li>시티드 케이블 로우: 3세트 12-15회 - 휴식 45초</li>
				<li>바벨 컬: 3세트 10-12회 - 휴식 45초</li>
				<li>해머 컬: 3세트 12회 - 휴식 45초</li>
			</ul>

			<div id="partition3" class="partitionTitles">금요일 - 하체 / 어깨 / 복부</div>
			<ul id="schedule3" class="schedule">
				<li>스쿼트: 4세트 10-12회 - 휴식 60초</li>
				<li>레그 프레스: 3세트 12회 - 휴식 60초</li>
				<li>레그 컬: 3세트 15회 - 휴식 45초</li>
				<li>숄더 프레스 머신: 3세트 10-12회 - 휴식 45초</li>
				<li>사이드 레터럴 레이즈: 3세트 12-15회 - 휴식 30초</li>
				<li>크런치: 4세트 20회 - 휴식 30초</li>
			</ul>

			<div id="routineAdvice">이 스케줄은 체지방을 줄이면서 근육량 유지를 목표로 한 3분할
				루틴으로, 헬스를 선호하는 24세 남성에게 적합합니다. 전신을 고르게 자극할 수 있도록 나누었으며, 복합 관절 운동과
				유산소적 자극을 동시에 주어 다이어트에 효과적입니다. 각 운동은 중간 강도의 중량으로 설정하여 심박수를 유지하고, 세트 간
				휴식을 짧게 설정하여 지속적인 칼로리 소모를 유도합니다. 요일은 개인 스케줄에 따라 유동적으로 조절 가능합니다.</div>
		</div>

		<div class="details">
			<div id="cheatingMealSubheading" class="subheadings">치팅식 추천</div>
			<div id="cheatingMeal1" class="cheatingMeal">그릭 요거트와 베리</div>
			<div id="reason1" class="reason">단백질이 풍부하고 설탕 함량이 낮아 포만감을 주면서도
				단맛을 즐길 수 있다.</div>
			<div id="cheatingMeal2" class="cheatingMeal">고구마 스낵</div>
			<div id="reason2" class="reason">식이섬유와 천천히 소화되는 탄수화물로 구성되어 혈당
				스파이크를 유발하지 않는다.</div>
			<div id="cheatingMeal3" class="cheatingMeal">다크 초콜릿(70% 이상)</div>
			<div id="reason3" class="reason">적은 양으로도 단맛 욕구를 충족시켜주며 항산화 성분이
				풍부하다.</div>
			<div id="cheatingMeal4" class="cheatingMeal">현미김밥</div>
			<div id="reason4" class="reason">복합 탄수화물과 단백질, 섬유질의 균형이 좋아 치팅에도
				균형 잡힌 선택이다.</div>
		</div>

		<div class="details">
			<div id="adviceSubheading" class="subheadings">조언</div>
			<div id="advice">운동 꾸준히 하는 게 제일 힘들지, 그래서 재미 요소를 더해보는 것도 방법이야!
				좋아하는 음악 틀어놓고 홈트 하는 것도 괜찮고, 친구랑 약속해서 같이 운동하면 빠질 수 없으니까 덜 지루하더라구. 너무
				무리해서 시작하면 며칠 못 가니까 짧게라도 매일 조금씩 해보고, 한 주 동안 한 번도 안 빠지고 했으면 스스로 칭찬도
				해주고! 또 식단이랑 운동 기록 남기면 뿌듯해서 더 하게 돼, 그런 사소한 성취가 의외로 동기부여엔 제일 좋더라. 지금처럼
				이유를 정확히 알고 있다는 것도 이미 절반은 성공한 거니까 너무 조급해하지 말고 매일 한 걸음씩 해보자!</div>
		</div>

	</div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script type="text/javascript" src="/resources/js/surveyResultPage.js"></script>
</html>