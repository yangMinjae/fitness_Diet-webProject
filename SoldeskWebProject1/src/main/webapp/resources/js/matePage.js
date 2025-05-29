//-----CSS 파일 추가
const CSS_FILE_PATH = ['/resources/css/matePage.css', '/resources/css/sendMailModal.css', '/resources/css/profileView.css'];
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

const regionData = {
	"강원도" : [
	    "강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시",
	    "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"
	  ],
	"경기도" : [
	    "서울특별시", "인천광역시", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시",
	    "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시",
	    "안양시", "양주시", "여주시", "오산시", "용인시", "의왕시", "의정부시", "이천시",
	    "파주시", "평택시", "포천시", "하남시", "화성시",
	    "가평군", "양평군", "연천군"
	  ],
	"경상남도" : [
	  "부산광역시", "울산광역시", "거제시", "김해시", "밀양시", "사천시", "양산시", "진주시", "창원시", "통영시",
	  "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"
	  ],
	"경상북도" : [
	  "대구광역시", "경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시",
	  "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"
	  ],
    "전라남도" : [
	    "광주광역시", "광양시", "나주시", "목포시", "순천시", "여수시",
	    "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군",
	    "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"
	  ],
	"전라북도" : [
	    "군산시", "김제시", "남원시", "익산시", "전주시", "정읍시",
	    "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"
	  ],
    "제주특별자치도" : [
	  "서귀포시", "제주시"
	  ],
    "충청남도" : [
	  "대전광역시", "세종시", "계룡시", "공주시", "논산시", "당진시", "보령시", "서산시", "아산시", "천안시",
	  "금산군", "부여군", "서천군", "예산군", "청양군", "태안군", "홍성군"
	  ],
	"충청북도" : [
	    "제천시", "청주시", "충주시",
	    "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군"
	  ]
};

//지역 필터 옵션 생성
const region1 = document.getElementById("filterRegion1");
const region2 = document.getElementById("filterRegion2");
if (region1 && region2) {
  Object.keys(regionData).forEach(province => {
    const option = document.createElement("option");
    option.value = province;
    option.textContent = province;
    region1.appendChild(option);
  });

  region1.addEventListener("change", function () {
	  const selectedProvince = this.value;

	  region2.innerHTML = '<option value="">시/군/구 선택</option>';

	  if (selectedProvince && regionData[selectedProvince]) {
	    // 도 선택됨 → 시/군/구 표시 + 옵션 추가
	    region2.style.display = 'inline-block'; // 또는 'block'
	    regionData[selectedProvince].forEach(city => {
	      const option = document.createElement("option");
	      option.value = city;
	      option.textContent = city;
	      region2.appendChild(option);
	    });
	  } else {
	    // 도가 선택되지 않았으면 시/군/구 숨기기
	    region2.style.display = 'none';
	  }
	});
}

const profileModal = document.getElementById("profileModal");
setImages();

// 필터링
const timeFilter = document.getElementById("fileterTime");
const genderFilter = document.getElementById("fileterGender");
const ageFilter = document.getElementById("fileterAge");
const tagFilter = document.getElementById("fileterTag");
const mateItems = document.querySelectorAll(".mate-item");
const region1Filter = document.getElementById("filterRegion1");
const region2Filter = document.getElementById("filterRegion2");

function applyFilters() {
	const selectedTime = timeFilter.value;
	const selectedGender = genderFilter.value;
	const selectedAge = ageFilter.value;
	const selectedTag = tagFilter.value;
	const selectedRegion1 = region1Filter.value;
	const selectedRegion2 = region2Filter.value;

	let sendVisibleCount = 0;

	mateItems.forEach(item => {
		const itemTime = item.dataset.time;
		const itemGender = item.dataset.gender;
		const itemAge = item.dataset.age;
		const itemTag = item.dataset.tag;
		const itemArea = item.dataset.area;
		const gender = (itemGender === 'true') ? 'men' : 'women';
		let matchArea = true;
		
		if (selectedRegion1 && !selectedRegion2) {
			matchArea = itemArea.includes(selectedRegion1); // 시/도만 체크
		} else if (selectedRegion1 && selectedRegion2) {
			matchArea = itemArea.includes(selectedRegion1) && itemArea.includes(selectedRegion2);
		}
		const matchTime = (selectedTime === "::" || selectedTime === "" || itemTime === selectedTime);
		const matchGender = (selectedGender === "::" || selectedGender === "" || gender === selectedGender);
		const matchAge = (selectedAge === "::" || selectedAge === "" || itemAge === selectedAge);
		const matchTag = (selectedTag === "::" || selectedTag === "" || itemTag === selectedTag);
		
		item.querySelectorAll(".mate-info p").forEach(p => p.classList.remove("match"));
		const matchMap = [
			  { matched: matchTag, className: "tag", selected: selectedTag },
			  { matched: matchGender, className: "gender", selected: selectedGender },
			  { matched: matchAge, className: "age", selected: selectedAge },
			  { matched: matchTime, className: "time", selected: selectedTime },
			  { matched: matchArea, className: "area", selected: selectedRegion1 },
			  { matched: matchTime, className: "area", selected: selectedRegion2 }
			];

		matchMap.forEach(({ matched, className, selected }) => {
		  if (matched && selected !== "::" && selected !== "") {
		    const el = item.querySelector(`.mate-info .${className}`);
		    if (el) el.classList.add("match");
		  }
		});
		
		if (matchTime && matchGender && matchAge && matchTag && matchArea) {
			item.classList.remove("hidden");
			if (item.closest(".mate-scroll-section").classList.contains("sendList")) sendVisibleCount++;
		} else {
			item.classList.add("hidden");
		}
	});

	document.getElementById("sendEmptyMessage").style.display = sendVisibleCount === 0 ? "block" : "none";
	document.getElementById("sendWrapper").style.display = sendVisibleCount === 0 ? "none" : "block";
	
	document.querySelectorAll(".mate-scroll-section").forEach(section => {
		section.scrollTo({left: 0, behavior: "auto"});
	});
	
	
	updateFilterVisualState();
};

timeFilter.addEventListener("change", applyFilters);
genderFilter.addEventListener("change", applyFilters);
ageFilter.addEventListener("change", applyFilters);
tagFilter.addEventListener("change", applyFilters);
region1Filter.addEventListener("change", applyFilters);
region2Filter.addEventListener("change", applyFilters);

document.getElementById("resetBtn").addEventListener("click", function () {
	timeFilter.selectedIndex = 0;
	genderFilter.selectedIndex = 0;
	ageFilter.selectedIndex = 0;
	tagFilter.selectedIndex = 0;
	region1Filter.selectedIndex = 0;
	region2Filter.innerHTML = '<option value="">시/군/구 선택</option>';
	region2.style.display = 'none';
	applyFilters();
});

// 프로필 모달 띄우기
document.querySelectorAll(".mate-info").forEach(item => {
	  item.addEventListener("click", function(event) {	
		  setSelectUno(item.dataset.selectuno);
		  profileModal.classList.add("show");
	  });
});

// 필터 시 시각적으로 확인되는 함수
function updateFilterVisualState() {
	const filters = [timeFilter, genderFilter, ageFilter, tagFilter, region1Filter, region2Filter];
	filters.forEach(select => {
		if (select.value !== "::" && select.value !== "") {
			select.classList.add("active");
		} else {
			select.classList.remove("active");
		}
	});
};

// 버튼 (팔로우, 메일) 
	document.querySelectorAll('.mate-scroll-section').forEach(a => {
		a.addEventListener('click', (e) => {
			const followBtn = e.target.closest('.follow-btn');
			const sendBtn = e.target.closest('.send-msg-btn');
			const mateItem = e.target.closest('.mate-item');
			const selectUno = mateItem.dataset.selectuno;
			const myUno = mateItem.dataset.myuno;
			
			// 팔로우 팔로잉
			if (followBtn) {
				const isFollowing = followBtn.classList.contains("following");
				
				fetch(`/mate/${isFollowing ? 'unfollow' : 'follow'}?uno=${mateItem.dataset.selectuno}&userUno=${mateItem.dataset.myuno}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' }
				})
				.then(res => res.text())
				.then(data => {
					const bool = data.trim() === '<Boolean>true</Boolean>';
					if (isFollowing && bool) {
						e.target.id = 'follow';
						e.target.textContent = '팔로우';
						e.target.classList.remove('following');
						e.target.classList.add('follow');
					} else {
						e.target.id = 'following';
						e.target.textContent = '팔로잉';
						e.target.classList.remove('follow');
						e.target.classList.add('following');
					}
				});
				return;
				
			// 메일 모달 띄우기
			}else if (sendBtn) {
				setSendMyUno(myUno);
				setSendSelectUno(selectUno);
				initMailModalContent();
				initMailModalEvent();
				document.getElementById('sendmailModal').classList.add('show');
				document.body.classList.add('modal-open'); // ✅ 스크롤 차단
				return;
			}else{
				return;
			}
		});
	});

// 가이드 닫기 함수
function closeScrollGuideOverlay() {
	const guideOverlay = document.getElementById("scrollGuideOverlay");
	if (guideOverlay) guideOverlay.style.display = "none";
}

//가로 스크롤 바인딩
	const scrollSections = document.querySelectorAll(".mate-scroll-section");

	scrollSections.forEach(section => {
		let lastWheelTime = 0;
		const SCROLL_DELAY = 500; // 밀리초 단위

		// 카드 한 번에 넘길 너비 계산
		const scrollStep = () => {
			const visibleCard = section.querySelector(".mate-item:not(.hidden)");
			return visibleCard ? (visibleCard.offsetWidth + 20) * 3 : 240 * 3;
		};

		// 휠 이벤트 → 일정 시간 내 한 번만 스크롤
		section.addEventListener("wheel", (e) => {
			const now = Date.now();
			if (now - lastWheelTime < SCROLL_DELAY) {
				e.preventDefault();
				return;
			}
			lastWheelTime = now;
			e.preventDefault();

			const delta = e.deltaY;
			const step = scrollStep();

			const isAtEnd = Math.ceil(section.scrollLeft + section.clientWidth) >= section.scrollWidth;

			section.scrollBy({
				left: delta > 0 ? step : -step,
				behavior: "smooth"
			});
		}, { passive: false });
	});


// 가이드 오버레이 표시 로직
const LAST_HIDE_KEY = "scrollGuideLastHide";
const HIDE_DAYS = 1;

function shouldShowGuide() {
	const lastHide = localStorage.getItem(LAST_HIDE_KEY);
	if (!lastHide) return true; // 기록 없으면 무조건 보여줌

	const diff = Date.now() - Number(lastHide);
	return diff > HIDE_DAYS * 24 * 60 * 60 * 1000; // ms 기준 비교
}

document.addEventListener("DOMContentLoaded", () => {
	region2.style.display = 'none';
	const guideOverlay = document.getElementById("scrollGuideOverlay");
	const guideButton = document.getElementById("scrollGuideConfirm");
	const neverButton = document.getElementById("scrollGuideNever");

	if (guideOverlay && shouldShowGuide()) {
		setTimeout(() => {
			guideOverlay.style.display = "flex";
		}, 500);
	} else if (guideOverlay) {
		guideOverlay.style.display = "none";
	}

	if (guideButton) {
		guideButton.addEventListener("click", () => {
			if (guideOverlay) guideOverlay.style.display = "none";
		});
	}

	if (neverButton) {
		neverButton.addEventListener("click", () => {
			localStorage.setItem(LAST_HIDE_KEY, Date.now()); // ❗ 7일 숨기기 시작 시점
			if (guideOverlay) guideOverlay.style.display = "none";
		});
	}
});

//ESC 키 닫기 처리 (우선순위별로)
document.addEventListener("keydown", (e) => {
	const guideOverlay = document.getElementById("scrollGuideOverlay");
	
	if (e.key === "Escape") {
		if (guideOverlay && window.getComputedStyle(guideOverlay).display === "flex") {
			guideOverlay.style.display = "none";
		}
	}
});

function setImages(){
	document
	.querySelectorAll('.user-icon')
	.forEach(ele=>{
		let srcPath = ele.getAttribute('src-data');
		srcPath = srcPath.substring(srcPath.indexOf("\\profile")).replace(/\\/g, "/");
		ele.setAttribute('src',srcPath);
	})
}

//