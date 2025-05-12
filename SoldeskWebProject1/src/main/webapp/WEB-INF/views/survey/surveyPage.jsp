<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />
	<jsp:include page="loadingModal.jsp"></jsp:include>
	<div class="container">
		<h1>라이프스타일 설문조사</h1>
		<form id="surveyForm" method="post">
			<section>
			<input type="hidden" name="cDTO.uno" value="1">
				<h2>공통 정보</h2>
				<!-- 기존 입력 항목 -->

				<label>키 (cm) : 
					<input type="number" name="cDTO.height"min="0" required />
				</label>


				<label>체중 (kg) : 
					<input type="number" name="cDTO.weight" min="0" required />
				</label>

				<label>나이 : 
					<input type="number" name="cDTO.age" min="15" max="99" required />
				</label>
				<label>성별 : 
					<select name="cDTO.gender">
						<option value="">-- 선택하세요 --</option>
						<option value="true">남성</option>
						<option value="false">여성</option>
					</select>
				</label>
				<label>
					지역(추후수정) : 
					<select name="cDTO.area">
						<option value="">-- 선택하세요 --</option>
						<option value="경기도">경기</option>
						<option value="전라도">전라</option>
						<option value="경상도">경상</option>
						<option value="강원도">강원</option>
						<option value="제주도">제주</option>
						<option value="충청도">충청</option>
					</select>
				</label>
				<label>
					운동 시간대 : 
					<select name="cDTO.workoutTime">
						<option value="">-- 선택하세요 --</option>
						<option value="08:00~09:59">08:00~09:59</option>
						<option value="10:00~11:59">10:00~11:59</option>
						<option value="12:00~13:59">12:00~13:59</option>
						<option value="14:00~15:59">14:00~15:59</option>
						<option value="16:00~17:59">16:00~17:59</option>
						<option value="18:00~19:59">18:00~19:59</option>
						<option value="20:00~21:59">20:00~21:59</option>
						<option value="22:00~23:59">22:00~23:59</option>
						<option value="00:00~07:59">00:00~07:59</option>
					</select>
				</label>
				<section>비건 여부 : 
					<label><input type="radio" name="cDTO.vegan" value="yes" /> 예 </label> 
					<label><input type="radio" name="cDTO.vegan" value="no" checked /> 아니오</label>
				</section>
				<section>평소 식사 량 : 
					<label><input type="radio" name="cDTO.hit" value="2" /> 하루 2번 </label> 
					<label><input type="radio" name="cDTO.hit" value="3" checked /> 하루 3번</label>
				</section>
				<label>
					선호하는 운동 : <select name="cDTO.favSport">
						<option value="">-- 선택하세요 --</option>
						<option value="헬스">헬스</option>
						<option value="맨몸 운동">맨몸 운동</option>
						<option value="스포츠">스포츠</option>
					</select>
				</label>
				<label id="splitSelectLabel" class="hidden"> 운동 분할 방식 : 
					<select name="cDTO.workoutSplit">
						<option value="3">잘 모름</option>
						<option value="2">2분할</option>
						<option value="3">3분할</option>
						<option value="4">4분할</option>
					</select>
				</label>
				<label>선호하는 음식 (쉼표로 구분) : 
					<input type="text" name="cDTO.favoriteFood" placeholder="예: 닭가슴살, 샐러드, 고구마" />
				</label>

				<label>주당 운동 횟수 및 활동수준 : 
					<select name="cDTO.activityLevel">
						<option value="">-- 선택하세요 --</option>
						<option value="1.2">아주 낮음 (거의 운동 없음)</option>
						<option value="1.375">가벼운 운동 (주 1~3회)</option>
						<option value="1.55">중간 활동 (주 3~5회)</option>
						<option value="1.725">높은 활동 (주 6~7회)</option>
						<option value="1.9">매우 격렬함 (운동선수 수준)</option>
					</select>
				</label>
				<section>
					영양제 섭취 여부 :
					<div class="supplement-list" id="supplementList">
						<label><input type="checkbox" name="cDTO.supplements" value="비타민 B"> 비타민 B</label> 
						<label><input type="checkbox" name="cDTO.supplements" value="비타민 D"> 비타민 D</label> 
						<label><input type="checkbox" name="cDTO.supplements" value="비타민 C"> 비타민 C</label> 
						<label><input type="checkbox" name="cDTO.supplements" value="마그네슘"> 마그네슘</label> 
						<label><input type="checkbox" name="cDTO.supplements" value="칼륨"> 칼륨</label> 
						<label><input type="checkbox" name="cDTO.supplements" value="아연"> 아연</label> 
						<label><input type="checkbox" name="cDTO.supplements" value="철분"> 철분</label> 
						<label><input type="checkbox" name="cDTO.supplements" value="오메가3"> 오메가3</label> 
						<label><input type="checkbox" name="cDTO.supplements" value="프로바이오틱스"> 프로바이오틱스</label>
					</div>
				</section>
				<label>
					레시피 복잡도 : 
					<select name="cDTO.recipeComplexity">
						<option value="">-- 선택하세요 --</option>
						<option value="low">단순한 레시피를 원해요</option>
						<option value="high">복잡한 요리도 자신있어요</option>
					</select>
				</label>
				<label>
					운동 목적 : 
					<select name="cDTO.goal" id="goalSelect">
						<option value="">-- 선택하세요 --</option>
						<option value="다이어트">다이어트</option>
						<option value="멸치 탈출">멸치 탈출</option>
						<option value="프로 득근러">근육 성장/스트렝스 강화</option>
						<option value="건강 유지">건강 유지</option>
						<option value="체중 유지">체중 유지</option>
					</select>
				</label>
			</section>

			<!-- 다이어터 -->
			<section id="dietSection" class="goal-section hidden">
				<h3>다이어터 정보</h3>
				<label>1개월 목표 감량 (kg): <input type="number" name="dietGoal"
					min="1" max="5"/>
				</label>
				<section>
					식단 조절 방식 : 
					<label><input type="radio" name="dietType" value="저탄고지" /> 저탄고지</label> 
					<label><input type="radio" name="dietType" value="칼로리 제한" /> 칼로리 제한</label> 
					<label><input type="radio" name="dietType" value="고단백식단" /> 고단백식단</label> 
				</section>
				<label>
					식욕 조절 능력: 
					<select name="appetiteControl">
						<option value="">-- 선택하세요 --</option>
						<option value="상">상</option>
						<option value="중">중</option>
						<option value="하">하</option>
					</select>
				</label>
				<section>
					다이어트 시 어려운 점: 
					<label><input type="radio" name="dietDifficulties" value="식단 유지" /> 식단 유지</label> 
					<label><input type="radio" name="dietDifficulties" value="운동 지속" /> 운동 지속</label> 
					<label><input type="radio" name="dietDifficulties" value="식욕 조절" /> 식욕 조절</label> 
					<label><input type="radio" name="dietDifficulties" value="정보 부족" /> 정보 부족</label> 
					<label><input type="radio" name="dietDifficulties" value="심리적 요인" /> 심리적 요인</label>
				</section>
			</section>

			<!-- 멸치 탈출 -->
			<section id="gainSection" class="goal-section hidden">
				<h3>멸치탈출 정보</h3>

				<!-- 📈 구체적인 목표 -->
				<label>1개월 목표 증량 (kg): 
					<input type="number" name="gainGoal" min="1" max="3"/>
				</label>

				<!-- 📊 증가 시도 경험 -->
				<label>증가 시도 경험: 
					<select name="gainExperience">
						<option value="">-- 선택하세요 --</option>
						<option value="유의미한 체중 증가 경험이 있다">유의미한 체중 증가 경험 있다</option>
						<option value="유의미한 체중 증가 경험이 없다.">유의미한 체중 증가 경험이 없다.</option>
						<option value="체중 증가 경험이 있지만 다시 줄었다.">체중 증가 경험이 있지만 다시 줄었다.</option>
					</select>
				</label>

				<!-- 🍪 간식 횟수 -->
				<label>끼니 외 간식 횟수: 
					<select name="gainSnacks">
						<option value="">-- 선택하세요 --</option>
						<option value="0">일 0회</option>
						<option value="1">일 1회</option>
						<option value="2">일 2회</option>
						<option value="3">일 3회</option>
					</select>
				</label>

				<!-- ⚠️ 어려운 점 -->
				<section>체중 증가 시 어려운 점: 
					<label><input type="radio" name="gainDifficulties" value="식욕 부진" /> 식욕 부진</label> 
					<label><input type="radio" name="gainDifficulties" value="식단 유지가 어렵다." /> 식단 유지가 어렵다.</label> 
					<label><input type="radio" name="gainDifficulties" value="운동 루틴을 따르는게 어렵다." /> 운동 루틴을 따르는게 어렵다.</label>
				</section>
			</section>

			<!-- 프로 득근러 -->
			<section id="proSection" class="goal-section hidden">
				<h3>프로득근러 정보</h3>

				<!-- 선택 분기 -->
				<label>목표 유형: 
					<select name="proGoalType" id="proGoalTypeSelect">
						<option value="">-- 선택하세요 --</option>
						<option value="스트렝스 강화">스트랭스 강화</option>
						<option value="근육 성장">근육 성장</option>
					</select>
				</label>

				<!-- 🎯 스트랭스 강화 -->
				<div id="proStrengthSection" class="hidden">
					<label>근육량 / 체지방률: 
						<input type="text" name="strengthStats" placeholder="예: 근육량 35kg / 체지방률 18%" />
					</label> 
					<label> 추천 받을 운동 분할 방식: 
						<select name="strengthSplit">
							<option value="0">잘 모름</option>
							<option value="2">2분할</option>
							<option value="3">3분할</option>
							<option value="4">4분할</option>
						</select>
					</label> 
					<label>끼니 외 간식 횟수: 
						<select name="strengthSnacks">
							<option value="1">일 1회</option>
							<option value="2">일 2회</option>
							<option value="3">일 3회</option>
						</select>
					</label> 
					<label>보충제 스쿱 수: 
						<select name="strengthScoops">
							<option value="1">1 스쿱</option>
							<option value="2">2 스쿱</option>
							<option value="3">3 스쿱</option>
						</select>	
					</label> 
					<label>강화 종목: 
						<select name="liftFocus">
							<option value="bench">벤치</option>
							<option value="deadlift">데드</option>
							<option value="squat">스쿼트</option>
							<option value="unknown">딱히 없음</option>
						</select>
					</label> 
					<label>주당 휴식일: 
						<select name="restDays">
							<option value="0">주 0회</option>
							<option value="1">주 1회</option>
							<option value="2">주 2회</option>
							<option value="3">주 3회</option>
						</select>
					</label>
				</div>

				<!-- 💪 근육 성장 -->
				<div id="proMuscleSection" class="hidden">
					<label>근육량 / 체지방률: 
						<input type="text" name="muscleStats" placeholder="예: 근육량 33kg / 체지방률 15%" />
					</label> 
					<label> 추천 받을 운동 분할 방식: 
						<select name="muscleSplit">
							<option value="0">잘 모름</option>
							<option value="2">2분할</option>
							<option value="3">3분할</option>
							<option value="4">4분할</option>
						</select>
					</label> 
					<label>끼니 외 간식 횟수: 
						<select name="muscleSnacks">
							<option value="1">일 1회</option>
							<option value="2">일 2회</option>
							<option value="3">일 3회</option>
						</select>
					</label> 
					<label>보충제 스쿱 수: 
						<select name="muscleScoops">
							<option value="1">1 스쿱</option>
							<option value="2">2 스쿱</option>
							<option value="3">3 스쿱</option>
						</select>
					</label> 
					<label>원하는 체형: 
						<select name="muscleType">
							<option value="big">그냥 큰 몸</option>
							<option value="physique">피지크 몸</option>
						</select>
					</label>
				</div>
			</section>

			<!-- 헬스 키퍼 -->
			<section id="healthSection" class="goal-section hidden">
				<h3>헬스키퍼 정보</h3>

				<!-- 🧬 관심 기저질환 -->
				<section>관심 기저질환 (중복 선택):
					<div class="diseases-list" id="diseasesList">
						<label><input type="checkbox" name="diseases" value="고혈압" />고혈압</label> 
						<label><input type="checkbox" name="diseases" value="당뇨" /> 당뇨</label>
						<label><input type="checkbox" name="diseases" value="고지혈증" /> 고지혈증</label> 
						<label><input type="checkbox" name="diseases" value="심장병" /> 심장병</label>
						<label><input type="checkbox" name="diseases" value="골다공증" /> 골다공증</label>
						<label><input type="checkbox" name="diseases" value="빈혈" /> 빈혈</label> 
						<label><input type="checkbox" name="diseases" value="변비" /> 변비</label> 
						<label><input type="checkbox" name="diseases" value="통풍" /> 통풍</label> 
						<label><input type="checkbox" name="diseases" value="치주질환" /> 치주질환</label> 
						<label><input type="checkbox" name="diseases" value="신장결석" /> 신장결석</label> 
						<label><input type="checkbox" name="diseases" value="지루성 피부염" /> 지루성 피부염</label>
					</div>
				</section>
				<!-- 🍺 음주 -->
				<label>음주 빈도: 
					<select name="alcohol">
						<option value="없음">없음</option>
						<option value="월 1회">월 1회</option>
						<option value="주 1회">주 1회</option>
						<option value="주 3회 이상">주 3회 이상</option>
					</select>
				</label>

				<!-- 🚬 흡연 -->
				<label>하루 평균 흡연 (갑 수): 
					<input type="number" name="smoking" min="0" placeholder="예: 0.5" />
				</label>

				<!-- 😴 수면 -->
				<label>하루 평균 수면 시간: 
					<select name="sleep">
						<option value="6시간 미만">6시간 미만</option>
						<option value="6~8시간">6~8시간</option>
						<option value="8시간 이상">8시간 이상</option>
					</select>
				</label>
			</section>

			<section id="maintainSection" class="goal-section hidden">
				<h3>유지어터 정보</h3>
				<label>외식 및 배달 음식 빈도: 
					<select name="outFood">
						<option value="자주">자주</option>
						<option value="주 1 ~ 2회">주 1 ~ 2회</option>
						<option value="거의 없음">거의 없음</option>
						<option value="없음">없음</option>
					</select>
				</label> 
				<label>간식 및 음료 섭취 빈도: 
					<select name="otherFood">
						<option value="자주">자주</option>
						<option value="가끔">가끔</option>
						<option value="거의 없음">거의 없음</option>
						<option value="없음">없음</option>
					</select>
				</label> 
				<label>폭식 이나 끼니를 거르는 빈도: 
					<select name="notFood">
						<option value="자주">자주</option>
						<option value="가끔">가끔</option>
						<option value="거의 없음">거의 없음</option>
						<option value="없음">없음</option>
					</select>
				</label> 
				<label>체중 유지가 어려운 점: 
					<select name="challenge">
						<option value="stress">스트레스</option>
						<option value="travel">여행</option>
						<option value="party">회식/외식</option>
						<option value="nothing">없음</option>
					</select>
				</label>
			</section>
			<button type="submit" id="testbtn">제출</button>
		</form>
	</div>

	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/survey.js"></script>
</html>