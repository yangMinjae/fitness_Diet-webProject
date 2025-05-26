// ===== CSS 추가 =====
const CSS_FILE_PATH = ['/resources/css/mailList.css', '/resources/css/mailModal.css', '/resources/css/sendMailModal.css'];
CSS_FILE_PATH.forEach(css => {
	const linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

// ===== 전역 변수 =====
let fullMailList = [];
let currentPage = 1;
const pageSize = 10;
let isReceiverView = true; // 기본값: 받은 메일 보기 상태
let filteredList = []; // 검색 결과 목록 (기본은 fullMailList와 동일)

//버튼
document.querySelectorAll('button').forEach(button => {
   button.addEventListener("click", function (e) {
      if (e.target.classList.contains("send-mail-btn")) {
         location.href = '/mail/sendMail';
      }
   });
});

// ===== 페이지 로딩 시 =====
document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.querySelector('.search-input');

	searchInput.addEventListener('input', () => {
		const keyword = searchInput.value.trim().toLowerCase();

		if (!keyword) {
			filteredList = [...fullMailList]; // 입력 없으면 전체 목록
		} else {
			filteredList = fullMailList.filter(mvo =>
				(mvo.content && mvo.content.toLowerCase().includes(keyword)) ||
				(mvo.preview && mvo.preview.toLowerCase().includes(keyword)) ||
				(mvo.nickname && mvo.nickname.toLowerCase().includes(keyword))
			);
		}

		currentPage = 1;
		renderPage(currentPage);
	});
	
	const unoElement = document.getElementById('myUno');
	const myUno = unoElement ? unoElement.textContent.trim() : null;

	loadMailListByType('/mail/recevier', myUno);  // ✅ 최초 받은메일 자동 로딩
	document.getElementById('loadSenderBtn').classList.add('active');

	const senderBtn = document.getElementById('loadSenderBtn');
	const recevierBtn = document.getElementById('loadRecevierBtn');

	if (senderBtn) {	
		senderBtn.addEventListener('click', () => {
			loadMailListByType('/mail/recevier', myUno);
			senderBtn.classList.add('active');
			recevierBtn.classList.remove('active');
		});
	}
	if (recevierBtn) {
		recevierBtn.addEventListener('click', () => {
			loadMailListByType('/mail/sender', myUno);
			recevierBtn.classList.add('active');
			senderBtn.classList.remove('active');
		});
	}
});

// ===== 메일 리스트 로딩 =====
function loadMailListByType(url, myUno, initPage = 1) {
	isReceiverView = (url === '/mail/recevier'); // 받은 메일인지 여부 저장

	fetch(url)
		.then(res => res.json())
		.then(list => {
			fullMailList = list;
			filteredList = [...list];  // 처음 로딩 시에는 전체를 보여줌
			currentPage = initPage;
			renderPage(currentPage);  // 👈 isReceiverView는 전역값으로 씀
		})
		.catch(err => console.error("메일 목록 불러오기 실패:", err));
}

// ===== 페이징에 따라 리스트 출력 =====
function renderPage(page) {
	  const container = document.querySelector('.mail-list');
	  const pagination = document.getElementById('pagination');
	  const start = (page - 1) * pageSize;
	  const end = start + pageSize;
	  const pageItems = filteredList.slice(start, end);

	  container.innerHTML = '';

	  if (pageItems.length === 0) {
	    container.innerHTML = '<div class="no-result">메일이 없습니다.</div>';
	    pagination.innerHTML = '';
	    return;
	  }

	  container.innerHTML = pageItems.map(mvo => `
	    <li class="mail-item ${mvo.hit == 1 ? 'read' : ''}"
	      data-name="${mvo.nickname}"
	      data-photo="${mvo.imgPath}"
	      data-content="${mvo.content}"
	      data-regdate="${mvo.regdate}"
	      data-selectuno="${mvo.uno}"
	      data-myuno="${document.getElementById('myUno').textContent.trim()}"
	      data-mno="${mvo.mno}">
	      <div class="profile-icon"><img src="${mvo.imgPath}" alt="프로필" /></div>
	      <div class="mail-info">
	        <span class="sender">${mvo.nickname}</span>
	        <span class="preview">${mvo.preview}</span>
	        <span class="regdate">${formatDateToYMD(mvo.regdate)}</span>
	      </div>
	    </li>
	  `).join('');

	  if (isReceiverView) readModal();
	  renderPagination(page);
	}

// ===== 페이징 버튼 출력 =====
function renderPagination(page) {
	  const pagination = document.getElementById('pagination');
	  const totalPages = Math.ceil(filteredList.length / pageSize);
	  const pageBlockSize = 10;
	  const startBlock = Math.floor((page - 1) / pageBlockSize) * pageBlockSize + 1;
	  const endBlock = Math.min(startBlock + pageBlockSize - 1, totalPages);

	  let html = '';

	  if (startBlock > 1) {
	    html += `<button class="page-btn" data-page="${startBlock - 1}">이전</button>`;
	  }

	  for (let i = startBlock; i <= endBlock; i++) {
	    html += `<button class="page-btn ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
	  }

	  if (endBlock < totalPages) {
	    html += `<button class="page-btn" data-page="${endBlock + 1}">다음</button>`;
	  }

	  pagination.innerHTML = html;

	  document.querySelectorAll('.page-btn').forEach(btn => {
	    btn.addEventListener('click', () => {
	      currentPage = Number(btn.dataset.page);
	      renderPage(currentPage);
	    });
	  });
	}

// ===== 메일 모달 열기 =====
function readModal() {
	document.querySelectorAll('.mail-item').forEach(item => {
		item.addEventListener('click', () => {
			const name = item.dataset.name;
			const content = item.dataset.content;
			const mno = item.dataset.mno;
			const regdate = item.dataset.regdate;
			const imgPath = item.dataset.photo;
			fetch(`/mail/updateByReadMail?mno=${mno}`, { method: 'GET' })
				.then(res => res.json())
				.then(data => {
					if (data.status === 'success') {
						document.getElementById('senderName').innerText = name;
						document.getElementById('mailContent').innerText = content;
						document.getElementById('regdate').innerText = formatDateToYMD(regdate);
						document.getElementById('profilePhoto').setAttribute('src',imgPath);
						setSendMyUno(item.dataset.myuno);
						setSendSelectUno(item.dataset.selectuno);
						
						openModal();
						item.classList.add('read');
						const unoElement = document.getElementById('myUno');
						const myUno = unoElement ? unoElement.textContent.trim() : null;

						loadMailListByType('/mail/recevier', myUno, currentPage);
						
						const mailCountSpan = document.querySelector('.count');
						if (mailCountSpan) {
							mailCountSpan.textContent = data.mailCount;
						}
					}
				});
		});
	});
}

let scrollPosition = 0;

function openModal() {
  scrollPosition = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add('modal-open');
  document.getElementById('mailModal').classList.add('show');
}

function closeModal() {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.classList.remove('modal-open');
  window.scrollTo(0, scrollPosition);
  document.getElementById('mailModal').classList.remove('show');
}

// ===== 모달 닫기 & ESC 처리 =====
//메일 모달 닫기 버튼
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
	closeBtn.addEventListener('click', () => {
		if (mailModal) {
			closeModal();
		}
	});
}

// 답장 버튼 클릭 시 모달 열기
const replyBtn = document.getElementById('replyBtn');
if (replyBtn) {
	replyBtn.addEventListener('click', () => {
		const mailInput = document.getElementById('mailInput');
		const sendmailModal = document.getElementById('sendmailModal');

		if (mailInput) mailInput.value = '';
		if (sendmailModal) sendmailModal.classList.add('show');
	});
}

// ESC 키 눌렀을 때 모달 닫기
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		const sendModal = document.getElementById('sendmailModal');
		const mailModal = document.getElementById('mailModal');

		if (!sendModal || !sendModal.classList.contains("show")) {
			if (mailModal) closeModal();
		} else {
			if (typeof initMailModalContent === 'function') {
				initMailModalContent();
			}
			sendModal.classList.remove('show');
		}
	}
});


// ===== 날짜 포맷 함수 =====
function formatDateToYMD(input) {
	const timestamp = Number(input);  // string → number로 강제 변환
	const date = new Date(timestamp);

	if (isNaN(date.getTime())) return '-';  // 유효성 체크

	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}
