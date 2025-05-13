//-----CSS 파일 추가
const CSS_FILE_PATH = ['/resources/css/matePage.css', '/resources/css/profile.css', '/resources/css/sendMailModal.css'];
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

// 스크롤 관련 코드
let sendList = document.querySelector('.sendList');
let difList = document.querySelector('.difList');

document.querySelectorAll('button').forEach(ele => {
  ele.addEventListener('click', (e) => {
    let btnId = e.currentTarget.getAttribute('id');
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
  window.scrollTo({ top, behavior: "smooth" });
}

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

		let sendVisibleCount = 0;
		let difVisibleCount = 0;

		mateItems.forEach(item => {
			const itemTime = item.dataset.time;
			const itemGender = item.dataset.gender;
			const itemAge = item.dataset.age;
			const gender = (itemGender === 'true') ? 'men' : 'women';

			const matchTime = (selectedTime === "::" || selectedTime === "" || itemTime === selectedTime);
			const matchGender = (selectedGender === "::" || selectedGender === "" || gender === selectedGender);
			const matchAge = (selectedAge === "::" || selectedAge === "" || itemAge === selectedAge);

			if (matchTime && matchGender && matchAge) {
				item.style.display = "block";
				if (item.closest(".mate-scroll-section").classList.contains("sendList")) sendVisibleCount++;
				else if (item.closest(".mate-scroll-section").classList.contains("difList")) difVisibleCount++;
			} else {
				item.style.display = "none";
			}
		});

		document.getElementById("sendEmptyMessage").style.display = sendVisibleCount === 0 ? "block" : "none";
		document.getElementById("difEmptyMessage").style.display = difVisibleCount === 0 ? "block" : "none";
		document.getElementById("sendWrapper").style.display = sendVisibleCount === 0 ? "none" : "block";
		document.getElementById("difWrapper").style.display = difVisibleCount === 0 ? "none" : "block";
	}

	timeFilter.addEventListener("change", applyFilters);
	genderFilter.addEventListener("change", applyFilters);
	ageFilter.addEventListener("change", applyFilters);

	document.getElementById("resetBtn").addEventListener("click", function () {
		timeFilter.selectedIndex = 0;
		genderFilter.selectedIndex = 0;
		ageFilter.selectedIndex = 0;
		applyFilters();
	});
});

// 프로필 선택 시 모달 창
document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll('.mate-item').forEach(a => {
		a.addEventListener('click', () => {
			const uno = a.querySelector('.uno').textContent.trim();
			const userUno = a.querySelector('.userUno').textContent.trim();
			
			fetch('/mate/findProfile?uno=' + uno + '&userUno=' + userUno)
				.then(res => res.text())
				.then(data => {
					document.getElementById('find-profile-modal').innerHTML = data;
					document.getElementById('find-profile-modal').classList.add('show');
				});
		});
	});
});

// 팔로우 버튼 및 모달 동작
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('close-btn')) {
		const modal = document.getElementById('sendmailModal');
		if (modal) modal.classList.remove('show');
	}
	if (e.target.classList.contains('close-modal-btn')) {
		document.getElementById('find-profile-modal').classList.remove('show');
	}
	if (e.target.classList.contains('send-msg-btn')) {
		const mailInput = document.getElementById('mailInput');
		const charCount = document.getElementById('charCount');
		initMailModalContent();
		initMailModalEvent();
		document.getElementById('sendmailModal').classList.add('show');
	}
	if (e.target.classList.contains('follow-btn')) {
		const uno = document.querySelector('#profile-modal-content .uno').textContent.trim();
		const userUno = document.querySelector('.userUno').textContent.trim();
		const isFollowing = e.target.id === 'following';
		
		fetch(`/mate/${isFollowing ? 'unfollow' : 'follow'}?uno=${uno}&userUno=${userUno}`, {
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
	}
});

// ESC 키 닫기 처리 (우선순위별로)
function closeScrollGuideOverlay() {
	const guideOverlay = document.getElementById("scrollGuideOverlay");
	if (guideOverlay) guideOverlay.style.display = "none";
}

document.addEventListener("keydown", (e) => {
	const guideOverlay = document.getElementById("scrollGuideOverlay");
	const guideButton = document.getElementById("scrollGuideConfirm");
	const sendModal = document.getElementById("sendmailModal");
	const profileModal = document.getElementById("find-profile-modal");

	if (e.key === "Escape") {
		if (guideOverlay && window.getComputedStyle(guideOverlay).display === "flex") {
		  closeScrollGuideOverlay();
		  return;
		}
		if (profileModal &&
			profileModal.classList.contains("show") &&
			(!sendModal || !sendModal.classList.contains("show"))) {
			profileModal.classList.remove("show");
			return;
		}
		if (sendModal && sendModal.classList.contains("show")) {
			sendModal.classList.remove("show");
		}
	}
});

// 모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
	const modal = document.getElementById('find-profile-modal');
	const content = document.querySelector('.profile-modal-content');
	if (modal && content && modal.classList.contains('show') && !content.contains(e.target) && e.target.id === 'find-profile-modal') {
		modal.classList.remove('show');
	}
});

// 메일 모달 관련
function initMailModalContent() {
	mailInput.value = '';
	charCount.textContent = `${mailInput.value.length} / 300`;
}

function initMailModalEvent() {
	if (mailInput && charCount) {
		mailInput.addEventListener('input', () => {
			const length = mailInput.value.length;
			charCount.textContent = `${length} / 300`;
		});
	}
}

// 가로 스크롤 바인딩
document.addEventListener("DOMContentLoaded", () => {
	const scrollSections = document.querySelectorAll(".mate-scroll-section");

	scrollSections.forEach(section => {
		const scrollStep = () => {
			const card = section.querySelector(".mate-item");
			return card ? card.offsetWidth + 20 : 240;
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
