
let f = document.forms[0];
document.addEventListener("DOMContentLoaded", () => {
  const divs = document.querySelectorAll(".dietNutrition");

  divs.forEach(div => {
	  
	const text = div.textContent.trim();  // 혹시 모를 공백 제거
    const numbers = text.match(/\d+/g)?.map(Number);  // [45, 120, 39] 같은 숫자 배열 추출
    if (numbers && numbers.length === 3) {
      const kcal = numbers[0] * 4 + numbers[1] * 4 + numbers[2] * 9;
      div.textContent = `${kcal}kcal ${text}`;
    }
  });
  
  let dietSubheading = document.querySelector('#dietSubheading');
  let routineSubheading = document.querySelector('#routineSubheading');
  let cheatingMealSubheading = document.querySelector('#cheatingMealSubheading');
  let adviceSubheading = document.querySelector('#adviceSubheading');

  [dietSubheading, routineSubheading, cheatingMealSubheading, adviceSubheading]
  .forEach(ele=>{
	  insertSubheading(ele);
  })
  document.querySelectorAll('.details')[0].setAttribute('id','dietDetail');
  setDietTbl();
});

function insertSubheading(div){
  if(div!=null){
    const subheadingId = div.getAttribute('id');
    switch (subheadingId) {
      case 'dietSubheading':
        div.textContent='맞춤 식단';
        break;
    
      case 'routineSubheading':
        div.textContent='운동 루틴';
        break;

      case 'cheatingMealSubheading':
        div.textContent='치팅식 추천';
        break;

      case 'adviceSubheading':
        div.textContent='조언';
        break;
    }
  }
}

document.getElementById("printBtn").addEventListener("click", () => {
	  const original = document.querySelectorAll(".details");
	  const pdfContainer = document.getElementById("pdfContainer");
	  pdfContainer.innerHTML = ''; // 초기화
	  pdfContainer.style.display = 'block';

	  original.forEach(detail => {
	    const clone = detail.cloneNode(true);
	    clone.style.pageBreakInside = 'avoid';
	    clone.style.breakInside = 'avoid';
	    clone.style.marginBottom = '30px';
	    clone.style.boxShadow = 'none';
	    pdfContainer.appendChild(clone);
	  });

	  const opt = {
	    margin: 0.3,
	    filename: 'survey-result.pdf',
	    image: { type: 'jpeg', quality: 0.98 },
	    html2canvas: {
	      scale: 2,
	      useCORS: true,
	      scrollY: 0
	    },
	    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
	    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
	  };

	  html2pdf().set(opt).from(pdfContainer).save().then(() => {
	    pdfContainer.style.display = 'none';
	  });
	});

document.getElementById("homeBtn").addEventListener("click", () => {
	location.href = '/';
});

function fetchDiet(formA){
  const formData = new FormData(formA);

  fetch('/survey/insertDiet',{
    method:'put',
    body:JSON.stringify(Object.fromEntries(formData.entries())),
    headers:{
      'Content-Type':'application/json; charset=utf-8'
    }
  })
  .then(res=>res.text())
  .then(text=>)
  .catch(err=>console.log(err));
}
function initSurveyResult(){
  f.title.value = document.querySelector("#dietTitle").textContent;
  f.content.value = document.querySelector('#mainBlock').innerHTML;
}

function setDietTbl(){
  initSurveyResult();
  fetchDiet(f);
}
