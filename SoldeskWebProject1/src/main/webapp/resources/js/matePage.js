//-----CSS 파일 추가
const CSS_FILE_PATH = ['/resources/css/matePage.css', '/resources/css/sendMailModal.css', '/resources/css/profileView.css'];
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

const modal = document.getElementById("profileModal");
setImages();
// 필터링
document.addEventListener("DOMContentLoaded", function () {
	const timeFilter = document.getElementById("fileterTime");
	const genderFilter = document.getElementById("fileterGender");
	const ageFilter = document.getElementById("fileterAge");
	const tagFilter = document.getElementById("fileterTag");
	const mateItems = document.querySelectorAll(".mate-item");

	function applyFilters() {
		const selectedTime = timeFilter.value;
		const selectedGender = genderFilter.value;
		const selectedAge = ageFilter.value;
		const selectedTag = tagFilter.value;

		let sendVisibleCount = 0;

		mateItems.forEach(item => {
			const itemTime = item.dataset.time;
			const itemGender = item.dataset.gender;
			const itemAge = item.dataset.age;
			const itemTag = item.dataset.tag;
			const gender = (itemGender === 'true') ? 'men' : 'women';

			const matchTime = (selectedTime === "::" || selectedTime === "" || itemTime === selectedTime);
			const matchGender = (selectedGender === "::" || selectedGender === "" || gender === selectedGender);
			const matchAge = (selectedAge === "::" || selectedAge === "" || itemAge === selectedAge);
			const matchTag = (selectedTag === "::" || selectedTag === "" || itemTag === selectedTag);

			item.querySelectorAll(".mate-info p").forEach(p => p.classList.remove("match"));
			const matchMap = [
				  { matched: matchTag, className: "tag", selected: selectedTag },
				  { matched: matchGender, className: "gender", selected: selectedGender },
				  { matched: matchAge, className: "age", selected: selectedAge },
				  { matched: matchTime, className: "time", selected: selectedTime }
				];

			matchMap.forEach(({ matched, className, selected }) => {
			  if (matched && selected !== "::" && selected !== "") {
			    const el = item.querySelector(`.mate-info .${className}`);
			    if (el) el.classList.add("match");
			  }
			});
			
			if (matchTime && matchGender && matchAge && matchTag) {
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

	document.getElementById("resetBtn").addEventListener("click", function () {
		timeFilter.selectedIndex = 0;
		genderFilter.selectedIndex = 0;
		ageFilter.selectedIndex = 0;
		tagFilter.selectedIndex = 0;
		applyFilters();
	});
});

// 프로필 모달 띄우기
document.querySelectorAll(".mate-info").forEach(item => {
	  item.addEventListener("click", function(event) {	
		  setSelectUno(item.dataset.selectuno);
		  modal.classList.add("show");
	  });
});

// 필터 시 시각적으로 확인되는 함수
function updateFilterVisualState() {
	const filters = [timeFilter, genderFilter, ageFilter, tagFilter];
	filters.forEach(select => {
		if (select.value !== "::" && select.value !== "") {
			select.classList.add("active");
		} else {
			select.classList.remove("active");
		}
	});
};

// 버튼 (팔로우, 메일) 
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll('.mate-scroll-section').forEach(a => {
		a.addEventListener('click', (e) => {
			const followBtn = e.target.closest('.follow-btn');
			const sendBtn = e.target.closest('.send-msg-btn');
			const mateItem = e.target.closest('.mate-item');
			const myUno = mateItem.dataset.myuno;
			const selectUno = mateItem.dataset.selectuno;
			
			// 팔로우 팔로잉
			if (followBtn) {
				const isFollowing = followBtn.classList.contains("following");
				
				fetch(`/mate/${isFollowing ? 'unfollow' : 'follow'}?uno=${selectUno}&userUno=${myUno}`, {
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
				document.getElementById('selectUno').innerText = selectUno;
				document.getElementById('myUno').innerText = myUno;
				initMailModalContent();
				initMailModalEvent();
				document.getElementById('sendmailModal').classList.add('show');
				return;
			}else{
				return;
			}
		});
	});
});

// 가이드 닫기 함수
function closeScrollGuideOverlay() {
	const guideOverlay = document.getElementById("scrollGuideOverlay");
	if (guideOverlay) guideOverlay.style.display = "none";
}

//가로 스크롤 바인딩
document.addEventListener("DOMContentLoaded", () => {
	const scrollSections = document.querySelectorAll(".mate-scroll-section");
	const scrollEndOverlay = document.getElementById("scrollEndOverlay");

	scrollSections.forEach(section => {
		const scrollStep = () => {
			const visibleCard = section.querySelector(".mate-item:not(.hidden)");
			return visibleCard ? (visibleCard.offsetWidth + 20) * 3 : 240 * 3;
		};

		let isScrolling = false;

		section.addEventListener("wheel", (e) => {
			e.preventDefault();
			if (isScrolling) return;
			isScrolling = true;

			const delta = e.deltaY;
			const step = scrollStep();

			const isAtEnd = Math.ceil(section.scrollLeft + section.clientWidth) >= section.scrollWidth;

			section.scrollBy({
				left: delta > 0 ? step : -step,
				behavior: "smooth"
			});

			if (delta > 0 && isAtEnd && scrollEndOverlay) {
				scrollEndOverlay.classList.remove("hide");
				scrollEndOverlay.classList.add("show");

				setTimeout(() => {
					scrollEndOverlay.classList.remove("show");
					scrollEndOverlay.classList.add("hide");
				}, 1000); // 1초 후 사라지기 시작
			}

			setTimeout(() => {
				isScrolling = false;
			}, 300);
		}, { passive: false });

		section.addEventListener("mousemove", (e) => {
			const rect = section.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const width = rect.width;
			section.classList.toggle("scroll-left", x < width * 0.25);
			section.classList.toggle("scroll-right", x > width * 0.75);
		});
	});
});

// 가이드 오버레이 표시 로직
document.addEventListener("DOMContentLoaded", () => {
	const guideOverlay = document.getElementById("scrollGuideOverlay");
	const guideButton = document.getElementById("scrollGuideConfirm");
	const neverButton = document.getElementById("scrollGuideNever");

	if (!localStorage.getItem("scrollGuideHidden")) {
		setTimeout(() => {
			guideOverlay.style.display = "flex";
		}, 500);
	}

	guideButton.addEventListener("click", closeScrollGuideOverlay);

	neverButton.addEventListener("click", () => {
		localStorage.setItem("scrollGuideHidden", "true");
		closeScrollGuideOverlay();
	});
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