const CSS_FILE_PATH = '/resources/css/matePage.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

// 스크롤 관련 코드
let sendList = document.querySelector('.sendList')
let difList = document.querySelector('.difList');

document.querySelectorAll('button')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let btnId = e.currentTarget.getAttribute('id');
    
    // 스크롤 액션
    switch (btnId) {
      case 'sendTag':
		scrollToTarget(sendList);
		break;
      case 'difTag':
		scrollToTarget(difList);
		break;
    }
  });
});

function scrollToTarget(ele) {
  const top = ele.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: top,
    behavior: "smooth"
  });
};

// 필터링
document.addEventListener("DOMContentLoaded", function () {
	const timeFilter = document.getElementById("time");
	const genderFilter = document.getElementById("gender");
	const ageFilter = document.getElementById("age");
	const mateItems = document.querySelectorAll(".mate-item");
	
function applyFilters() {
	const selectedTime = timeFilter.value;
	const selectedGender = genderFilter.value;
	const selectedAge = ageFilter.value;

	mateItems.forEach(item => {
	   const itemTime = item.dataset.time;
	   const itemGender = item.dataset.gender;
	   const itemAge = item.dataset.age;
	   let gender = '';
	   
	   if(itemGender === 'true'){
	    gender = 'men';
	   }else{
	    gender = 'women';
	   }
	   
	   const matchTime = (selectedTime === "::" || selectedTime === "" || itemTime === selectedTime);
	   const matchGender = (selectedGender === "::" || selectedGender === "" || gender === selectedGender);
	   const matchAge = (selectedAge === "::" || selectedAge === "" || itemAge === selectedAge);

	   if (matchTime && matchGender && matchAge) {
	     item.style.display = "block";
	   } else {
	     item.style.display = "none";
	   }
	});
  }

// 이벤트 연결
timeFilter.addEventListener("change", applyFilters);
genderFilter.addEventListener("change", applyFilters);
ageFilter.addEventListener("change", applyFilters);
});


//프로필 선택 시 모달 창
document.querySelectorAll('.mate-item').forEach( a => {
	a.addEventListener('click', b =>{
		console.log('modal');
	});
});
