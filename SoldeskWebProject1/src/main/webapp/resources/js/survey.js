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
  const foodList = data.favoriteFood
    ? data.favoriteFood.split(',').map(f => f.trim()).filter(Boolean)
    : [];
  
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h3>요약 정보</h3>
    <p><strong>키:</strong> ${data.height} cm</p>
    <p><strong>체중:</strong> ${data.weight} kg</p>
    <p><strong>운동 목적:</strong> ${data.goal}</p>
    <p><strong>활동 수준:</strong> ${data.activityLevel}</p>
  `;
});
