// --- CSS 파일 동적 로딩 ---
const CSS_FILE_PATH1 = '/resources/css/survey.css';
const linkEle1 = document.createElement('link');
linkEle1.rel = 'stylesheet';
linkEle1.href = CSS_FILE_PATH1;
document.head.appendChild(linkEle1);
//------모달 css 로딩------
const CSS_FILE_PATH2 = '/resources/css/loadingModal.css';
const linkEle2 = document.createElement('link');
linkEle2.rel = 'stylesheet';
linkEle2.href = CSS_FILE_PATH2;
document.head.appendChild(linkEle2);
//-----------------------

document.getElementById("goalSelect").addEventListener("change", function () {
  const goal = this.value;
  const sections = document.querySelectorAll(".goal-section");
  sections.forEach((sec) => sec.classList.add("hidden"));

  switch (goal) {
    case "다이어트":
      document.getElementById("dietSection").classList.remove("hidden");
      break;
    case "멸치 탈출":
      document.getElementById("gainSection").classList.remove("hidden");
      break;
    case "프로 득근러":
      document.getElementById("proSection").classList.remove("hidden");
      break;
    case "건강 유지":
      document.getElementById("healthSection").classList.remove("hidden");
      break;
    case "체중 유지":
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
	let form = this;
	let formData = new FormData(this);
	const data = Object.fromEntries(formData.entries());
	// 음식 리스트 파싱 처리
	const foodList = data.favoriteFood ? data.favoriteFood.split(',').map(f => f.trim()).filter(Boolean) : [];
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
			for (const [key, value] of formData.entries()) {
				  console.log(`${key} → ${value}`);
				}
			fetchFunc(formData,'submitDiet');
			break;
		// 멸치 탈출 데이터
		case '멸치 탈출' : 
			if(!data.gainGoal){
				alert('증량목표를 입력해주세요');
				form.elements['gainGoal'].focus();
				return;
			}
			if(!data.gainExperience){
				alert('증가 시도 경험란을 입력해 주세요');
				form.elements['gainExperience'].focus();
				return;
			}
			if(!data.gainSnacks){
				alert('끼니 외 간식 횟수를 입력해 주세요');
				form.elements['gainSnacks'].focus();
				return;
			}
			if(!data.gainDifficulties){
				alert('체중 증가 시 어려운 점을 입력해 주세요');
				form.elements['gainDifficulities'].focus();
				return;
			}
			fetchFunc(formData,'submitGain');
			break;
		// 프로 득근러 데이터
		case '프로 득근러' :
			console.log(data.proGoalType);
			if(data.proGoalType === '스트렝스 강화'){
				// 스트랭스 강화
				if(!data.strengthStats){
					alert("체지방률을 입력해주세요");
					form.elements['strengthStats'].focus();
					return;
				}

				
				if(!data.strengthSnacks){
					alert("끼니 외 간식 횟수를 선택해주세요");
					form.elements['strengthSnacks'].focus();
					return;
				}
				if(!data.strengthScoops){
					alert("보충제 스쿱 수를 선택해주세요");
					form.elements['strengthScoops'].focus();
					return;					
				}
				if(!data.liftFocus){
					alert("강화 종목을 선택해주세요");
					form.elements['liftFocus'].focus();
					return;			
				}
				if(!data.restDays){
					alert("주당 휴식일을 선택해주세요");
					form.elements['restDays'].focus();
					return;		
				}
				form.elements["cDTO.favSport"].value="헬스";
				form.elements["cDTO.workoutSplit"].value=data.strengthSplit;	
				
				console.log(form.elements["cDTO.favSport"].value);
				console.log(form.elements["cDTO.workoutSplit"].value);
				formData = new FormData(this);
				fetchFunc(formData,'submitStrength');
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
		case '건강 유지' :
			const selectedDiseases = formData.getAll('diseases');
			if(selectedDiseases.length===0){
				alert('관심 기저질환을 최소 한개이상 선택해 주세요');
				return;
			}
			if(!data.alcohol){
				alert('음주 빈도를 선택해주세요');
				form.elements['alcohol'].focus();
				return;
			}
			if(!data.smoking){
				alert('하루 평균 흡연량을 입력해 주세요');
				form.elements['smoking'].focus();
				return;
			}
			if(!data.sleep){
				alert('하루 평균 수면시간을 선택해 주세요')
				form.elements['sleep'].focus();
				return;
			}
			fetchFunc(formData,'submitHealth');
			break;
		// 유지 어터
		case '체중 유지' : 
			if(!data.outFood){
				alert('외식 및 배달 음식 빈도를 선택해주세요');
				form.elements['outFood'].focus();
				return;
			}
			if(!data.otherFood){
				alert('간식 및 음료 섭취 빈도를 선택해주세요');
				form.elements['otherFood'].focus();
				return;
			}
			if(!data.notFood){
				alert('폭식이나 끼니를 거르는 빈도를 선택해주세요');
				form.elements['notFood'].focus();
				return;
			}
			if(!data.challenge){
				alert('체중 유지가 어려운 점을 선택해주세요');
				form.elements['challenge'].focus();
				return;
			}
			fetchFunc(formData,'submitMaintain');
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

//로딩 모달 표시
function showLoadingModal() {
  document.getElementById("loadingModal").style.display = "block";
}

// 로딩 모달 숨김
function hideLoadingModal() {
  document.getElementById("loadingModal").style.display = "none";
}

function fetchFunc(f,param){
	showLoadingModal();
	console.log(f);
	
	const sendData = Object.fromEntries(f.entries());
	sendData['cDTO.supplements'] = f.getAll('cDTO.supplements');
	if(param=='submitHealth'){
		sendData['diseases'] = f.getAll('diseases');
	}
	
	fetch(`/survey/${param}`,{
		method:'POST',
		body: JSON.stringify(sendData),
		headers:{
			'Content-Type' : 'application/json;charset=UTF-8'
		}
	})
	.then(res=>res.text())
	.then(text=>{
		console.log(text);
		hideLoadingModal();
		alert('설문이 완료되었습니다.')
		window.open("/survey/surveyResultPage", "_blank");
		location.href='/';		
	})
}