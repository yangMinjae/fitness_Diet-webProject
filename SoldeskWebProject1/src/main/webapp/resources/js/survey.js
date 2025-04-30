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

document.querySelector('select[name="favSport"]').addEventListener('change', function() {
	  const splitSelect = document.getElementById('splitSelectLabel');
	  if (this.value === 'health') {
	    splitSelect.classList.remove('hidden'); // 헬스 선택하면 보이기
	  } else {
	    splitSelect.classList.add('hidden'); // 다른 운동이면 숨기기
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
	setupLimitedCheckboxGroup("supplements", 3);
	setupLimitedCheckboxGroup("diseases", 3);

	// 음식 리스트 파싱 처리
	const foodList = data.favoriteFood ? data.favoriteFood.split(',').map(f => f.trim()).filter(Boolean) : [];
	console.log(data.workoutSplit);
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
	const selectedSupplements = formData.getAll('supplements');
	selectedSupplements.forEach(function(supplement) {
		console.log(supplement);
	})
	switch(data.goal){
		// 다이어터 데이터
		case 'diet' :
			console.log(data.dietGoal);
			console.log(data.dietType);
			console.log(data.appetiteControl);
			console.log(data.dietDifficulties);
			break;
		// 멸치 탈출 데이터
		case 'gain' : 
			console.log(data.gainGoal);
			console.log(data.gainExperience);
			console.log(data.gainSnacks);
			console.log(data.gainDifficulties);
			break;
		// 프로 득근러 데이터
		case 'pro' :
			console.log(data.proGoalType);
			if(data.proGoalType === 'strength'){
				// 스트랭스 강화
				console.log(data.strengthStats);
				console.log(data.strengthSplit);
				console.log(data.strengthSnacks);
				console.log(data.strengthScoops);
				console.log(data.liftFocus);
				console.log(data.restDays);
			}else{
				// 근육 성장
				console.log(data.muscleStats);
				console.log(data.muscleSplit);
				console.log(data.muscleSnacks);
				console.log(data.muscleScoops);
				console.log(data.muscleType);
			}			
			break;
		// 헬스 키퍼
		case 'health' :
			const selectedDiseases = formData.getAll('diseases');
			selectedDiseases.forEach(function(diseases) {
				console.log(diseases);
			})
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

function setupLimitedCheckboxGroup(groupName, maxCount) {
	  const checkboxes = document.querySelectorAll(`input[name="${groupName}"]`);
	  
	  checkboxes.forEach(cb => {
	    cb.addEventListener('change', () => {
	      const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;
	      
	      if (checkedCount > maxCount) {
	        cb.checked = false;
	        alert(`최대 ${maxCount}개까지만 선택할 수 있습니다.`);
	      }
	    });
	  });
}