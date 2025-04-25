// --- CSS 파일 동적 로딩 ---
const CSS_FILE_PATH1 = '/resources/css/survey.css';
const linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH1;
document.head.appendChild(linkEle);

document.getElementById("goalSelect").addEventListener("change", function () {
  const goal = this.value;
  const sections = document.querySelectorAll(".goal-section");
  sections.forEach((sec) => sec.classList.add("hidden"));

  switch (goal) {
    case "diet":
      document.getElementById("dietSection").classList.remove("hidden");
      break;
    case "gain":
      document.getElementById("gainSection").classList.remove("hidden");
      break;
    case "pro":
      document.getElementById("proSection").classList.remove("hidden");
      break;
    case "health":
      document.getElementById("healthSection").classList.remove("hidden");
      break;
    case "maintain":
      document.getElementById("maintainSection").classList.remove("hidden");
      break;
  }
});

//프로득근러 하위 섹션 분기 처리
document.getElementById("proGoalTypeSelect").addEventListener("change", function () {
  const type = this.value;
  document.getElementById("proStrengthSection").classList.add("hidden");
  document.getElementById("proMuscleSection").classList.add("hidden");

  if (type === "strength") {
    document.getElementById("proStrengthSection").classList.remove("hidden");
  } else if (type === "muscle") {
    document.getElementById("proMuscleSection").classList.remove("hidden");
  }
});

document.getElementById("surveyForm").addEventListener("submit", function (e) {
  e.preventDefault();    
  const formData = new FormData(this);
	const data = Object.fromEntries(formData.entries());

	// 음식 리스트 파싱 처리
	const foodList = data.favoriteFood ? data.favoriteFood.split(',').map(f => f.trim()).filter(Boolean) : [];
	
	// 공통 질문 데이터
	/*foodList.forEach(function(food) {
		console.log(food);		
	});
	console.log(data.height);
	console.log(data.weight);
	console.log(data.gender);
	console.log(data.workoutTime);
	console.log(data.vegan);
	console.log(data.hit);
	console.log(data.favSport);
	console.log(data.activityLevel);
	console.log(data.goal);*/
	
	switch(data.goal){
		// 다이어터 데이터
		case 'diet' :
			console.log(data.dietGoal);
			console.log(data.dietType);
			console.log(data.dietSupplements);
			console.log(data.appetiteControl);
			console.log(data.dietDifficulties);
			break;
		// 멸치 탈출 데이터
		case 'gain' : 
			console.log(data.gainGoal);
			console.log(data.gainExperience);
			console.log(data.gainSnacks);
			console.log(data.gainSupplements);
			console.log(data.gainDifficulties);
			break;
		// 프로 득근러 데이터
		case 'pro' :
			console.log(data.proGoalType);
			if(data.proGoalType === 'strength'){
				// 스트랭스 강화
				console.log(data.strengthStats);
				console.log(data.strengthSupplements);
				console.log(data.strengthSnacks);
				console.log(data.strengthScoops);
				console.log(data.liftFocus);
				console.log(data.restDays);
			}else{
				// 근육 성장
				console.log(data.muscleStats);
				console.log(data.muscleSupplements);
				console.log(data.muscleSnacks);
				console.log(data.muscleScoops);
				console.log(data.muscleType);
			}			
			break;
		// 헬스 키퍼
		case 'health' :
			console.log(data.diseases);
			console.log(data.alcohol);
			console.log(data.smoking);
			console.log(data.sleep);
			break;
		// 유지 어터
		case 'maintain' : 
			console.log(data.outFood);
			console.log(data.otherFood);
			console.log(data.notFood);
			console.log(data.challenge);
			break;
	};
	
});
