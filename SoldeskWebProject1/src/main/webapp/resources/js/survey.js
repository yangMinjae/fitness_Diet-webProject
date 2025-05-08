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
    case "다이어트":
      document.getElementById("dietSection").classList.remove("hidden");
      break;
    case "멸치탈출":
      document.getElementById("gainSection").classList.remove("hidden");
      break;
    case "근성장/스트렝스강화":
      document.getElementById("proSection").classList.remove("hidden");
      break;
    case "건강유지":
      document.getElementById("healthSection").classList.remove("hidden");
      break;
    case "체중유지":
      document.getElementById("maintainSection").classList.remove("hidden");
      break;
  }
});

document.querySelector('select[name="cDTO.favSport"]').addEventListener('change', function() {
	  const splitSelect = document.getElementById('splitSelectLabel');
	  if (this.value === '헬스') {
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

  if (type === "스트렝스 강화") {
    document.getElementById("proStrengthSection").classList.remove("hidden");
  } else if (type === "근육 성장") {
    document.getElementById("proMuscleSection").classList.remove("hidden");
  }
});

setupLimitedCheckboxGroup("cDTO.supplements", 3);
setupLimitedCheckboxGroup("diseases", 3);

document.getElementById("surveyForm").addEventListener("submit", function (e) {
	e.preventDefault();    
	const form = this;
  	const formData = new FormData(this);
	const data = Object.fromEntries(formData.entries());

	// 음식 리스트 파싱 처리
	const foodList = data.favoriteFood ? data.favoriteFood.split(',').map(f => f.trim()).filter(Boolean) : [];
	console.log(data['cDTO.workoutSplit']);
	// 공통 질문 데이터
	foodList.forEach(function(food) {
		console.log(food);		
	});
	if(!data['cDTO.gender']){
		alert("성별을 선택해주세요");
		form.elements["cDTO.gender"].focus();
		return;
	}
	if(!data['cDTO.area']){
		alert("지역을 선택해주세요");
		form.elements["cDTO.area"].focus();
		return;
	}
	if(!data['cDTO.workoutTime']){
		alert("운동 시간대를 선택해주세요");
		form.elements["cDTO.workoutTime"].focus();
		return;
	}
	if(!data['cDTO.favSport']){
		alert("선호하는 운동을 선택해 주세요");
		form.elements["cDTO.favSport"].focus();
		return;
	}
	if(!data['cDTO.activityLevel']){
		alert("활동수준을 선택해 주세요");
		form.elements["cDTO.activityLevel"].focus();
		return;
	}
	if(!data['cDTO.recipeComplexity']){
		alert("레시피 복잡도를 선택해 주세요");
		form.elements["cDTO.recipeComplexity"].focus();
		return;
	}
	if(!data['cDTO.goal']){
		alert("운동목적을 선택해 주세요");
		form.elements["cDTO.goal"].focus();
		return;
	}
	
	const selectedSupplements = formData.getAll('cDTO.supplements');
	selectedSupplements.forEach(function(supplement) {
		console.log(supplement);
	})
	switch(data['cDTO.goal']){
		// 다이어터 데이터
		case '다이어트' :
			if(!data.dietGoal){
				alert('감량목표를 입력해주세요');
				form.elements['dietGoal'].focus();
				return;
			}
			if(!data.appetiteControl){
				alert('식욕 조절 능력을 선택해주세요');
				form.elements['appetiteControl'].focus();
				return;
			}
//			console.log(data.dietGoal);
//			console.log(data.dietType);
//			console.log(data.appetiteControl);
//			console.log(data.dietDifficulties);
			form.action = "/survey/submitDiet";
			form.submit();
			break;
		// 멸치 탈출 데이터
		case '멸치탈출' : 
			console.log(data.gainGoal);
			console.log(data.gainExperience);
			console.log(data.gainSnacks);
			console.log(data.gainDifficulties);
			break;
		// 프로 득근러 데이터
		case '근성장/스트렝스강화' :
			console.log(data.proGoalType);
			if(data.proGoalType === '스트렝스 강화'){
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
		case '건강유지' :
			const selectedDiseases = formData.getAll('diseases');
			selectedDiseases.forEach(function(diseases) {
				console.log(diseases);
			})
			console.log(data.alcohol);
			console.log(data.smoking);
			console.log(data.sleep);
			break;
		// 유지 어터
		case '체중유지' : 
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