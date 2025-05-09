//-----CSS 파일 추가
//1. 파일 경로 설정
const CSS_FILE_PATH = ['/resources/css/matePage.css', '/resources/css/profile.css', '/resources/css/sendMailModal.css'];
//2. link 태그 생성
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
//3. head 태그에 link 엘리먼트 추가
	document.head.appendChild(linkEle);
});

// 스크롤 관련 코드
let sendList = document.querySelector('.sendList')
let difList = document.querySelector('.difList');

document.querySelectorAll('button').forEach(ele=>{
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
	  };

	// 이벤트 연결
	timeFilter.addEventListener("change", applyFilters);
	genderFilter.addEventListener("change", applyFilters);
	ageFilter.addEventListener("change", applyFilters);

	// 초기화 함수
	const resetBtn = document.getElementById("resetBtn");
	resetBtn.addEventListener("click", function() {
	  // 필터 select 박스 모두 기본값으로 초기화
	  timeFilter.selectedIndex = 0;
	  genderFilter.selectedIndex = 0;
	  ageFilter.selectedIndex = 0;
	  
	  applyFilters();
	});
  
});


//프로필 선택 시 모달 창
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll('.mate-item').forEach( a => {
		a.addEventListener('click', (b) =>{
			const uno = a.querySelector('.uno').textContent.trim();
			
			fetch('/mate/findProfile?uno=' + uno + '&uno1=3', {
			  })
			  .then(res => res.text())
			  .then(data => {
				  document.getElementById('find-profile-modal').innerHTML = data;
				  document.getElementById('find-profile-modal').classList.add('show');
			  });
		});
	});
});

// 팔로우 버튼
document.addEventListener('click', (e) =>{	
	if (e.target.classList.contains('close-btn')) {
		document.getElementById('mailModal').classList.remove('show')};
		
	if (e.target.classList.contains('close-modal-btn')) {
		document.getElementById('find-profile-modal').classList.remove('show')};
	
	if (e.target.classList.contains('send-msg-btn')) {
		const mailInput = document.getElementById('mailInput');
		const charCount = document.getElementById('charCount');
		
		// 초기화
		initMailModalContent();
		initMailModalEvent();
		document.getElementById('mailModal').classList.add('show');
	}
	
	if (e.target.classList.contains('follow-btn')){
		const uno = document.querySelector('#profile-modal-content .uno').textContent.trim();
		const isFollowing = e.target.id === 'following';
		// uno1 수정 필요 !!!!!!
		fetch(`/mate/${isFollowing ? 'unfollow' : 'follow'}?uno=${uno}&uno1=3`, {
			method : 'POST',
			headers: {'Content-Type': 'application/json'}
		})
		.then(res => res.text())
		.then(data => {
			const bool = data.trim() === '<Boolean>true</Boolean>';
			if (isFollowing && bool) {
				// 언팔 성공 → 버튼을 팔로우 상태로 변경
	            e.target.id = 'follow';
	            e.target.textContent = '팔로우';
	            e.target.classList.remove('following');
	            e.target.classList.add('follow');
			} else {
				// 팔로우 성공 → 버튼을 팔로잉 상태로 변경
	            e.target.id = 'following';
	            e.target.textContent = '팔로잉';
	            e.target.classList.remove('follow');
	            e.target.classList.add('following');
			}
		})
	}
});

//모달 닫기 (ESC 키)
document.addEventListener('keydown', (e) => {
	const sendModal = document.getElementById('mailModal');
    if (e.key === 'Escape' && !sendModal.classList.contains('show')) {
        document.getElementById('find-profile-modal').classList.remove('show');
    }
});

//모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
    const modal = document.getElementById('find-profile-modal');
    const content = document.querySelector('.profile-modal-content');
    if (modal.classList.contains('show') && !content.contains(e.target) && e.target.id === 'find-profile-modal') {
        modal.classList.remove('show');
    }
});


// 메일 초기화 함수
function initMailModalContent(){
	mailInput.value = '';
	charCount.textContent = `${mailInput.value.length} / 300`;
}

// 글자 수 제한 함수
function initMailModalEvent() {

    if (mailInput && charCount) {
        mailInput.addEventListener('input', () => {
            const length = mailInput.value.length;
            charCount.textContent = `${length} / 300`;
        });
    }
}

// 스크롤
document.addEventListener("DOMContentLoaded", () => {
	  const scrollSections = document.querySelectorAll(".mate-scroll-section");

	  scrollSections.forEach(section => {
	    const scrollStep = () => {
	      const card = section.querySelector(".mate-item");
	      return card ? card.offsetWidth + 20 : 240; // 카드 너비 + gap
	    };

	    let isScrolling = false;

	    section.addEventListener("wheel", (e) => {
	      e.preventDefault();

	      if (isScrolling) return;
	      isScrolling = true;

	      const delta = e.deltaY;
	      const step = scrollStep();

	      section.scrollBy({
	        left: delta > 0 ? step : -step,
	        behavior: "smooth"
	      });

	      setTimeout(() => {
	        isScrolling = false;
	      }, 300); // 애니메이션 지속 시간과 맞춤
	    }, { passive: false });

	    // 마우스 위치에 따라 커서 변경 (선택적)
	    section.addEventListener("mousemove", (e) => {
	      const rect = section.getBoundingClientRect();
	      const x = e.clientX - rect.left;
	      const width = rect.width;

	      section.classList.toggle("scroll-left", x < width * 0.25);
	      section.classList.toggle("scroll-right", x > width * 0.75);
	    });
	  });
	});

// 애니메이션 확인 버튼
document.addEventListener("DOMContentLoaded", () => {
	  const guideOverlay = document.getElementById("scrollGuideOverlay");
	  const guideButton = document.getElementById("scrollGuideConfirm");

	  // 2초 후에 안내 모달 띄우기
	  setTimeout(() => {
	    guideOverlay.style.display = "flex";
	  }, 500); // 조정 가능

	  guideButton.addEventListener("click", () => {
	    guideOverlay.style.display = "none";
	  });
	});