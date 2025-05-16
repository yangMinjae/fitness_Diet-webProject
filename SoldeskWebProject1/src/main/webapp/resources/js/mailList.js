const ITEMS_PER_PAGE = 8;
let allMailItems = [];
let filteredMailItems = [];
let currentPage = 0;

// CSS 추가
const CSS_FILE_PATH = ['/resources/css/mailList.css', '/resources/css/mailModal.css', '/resources/css/sendMailModal.css'];
CSS_FILE_PATH.forEach(css => {
	const linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

document.addEventListener("DOMContentLoaded", function () {
	const searchInput = document.querySelector(".search-input");
	const rawMailItems = document.querySelectorAll(".mail-item");
	allMailItems = Array.from(rawMailItems);
	filteredMailItems = [...allMailItems];

	renderMailListPage(currentPage);
	renderPagination();

	// 필터 함수
	function filterMails() {
		const keyword = searchInput.value.toLowerCase().trim();
		filteredMailItems = allMailItems.filter(item => {
			const sender = item.querySelector(".sender").textContent.toLowerCase();
			const content = item.dataset.content.toLowerCase();
			return sender.includes(keyword) || content.includes(keyword);
		});
		currentPage = 0;
		renderMailListPage(currentPage);
		renderPagination();
	}

	searchInput.addEventListener("input", filterMails);
});

// 메일 리스트 렌더링
function renderMailListPage(page) {
	const mailList = document.querySelector(".mail-list");
	mailList.innerHTML = "";

	const start = page * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;
	const pageItems = filteredMailItems.slice(start, end);

	pageItems.forEach(item => mailList.appendChild(item));
}

// 페이징 렌더링
function renderPagination() {
	const existing = document.getElementById("pagination");
	if (existing) existing.remove();

	const totalPages = Math.ceil(filteredMailItems.length / ITEMS_PER_PAGE);
	const pageGroup = Math.floor(currentPage / 10);
	const startPage = pageGroup * 10;
	const endPage = Math.min(startPage + 10, totalPages);

	const container = document.createElement("div");
	container.id = "pagination";
	container.style.textAlign = "center";
	container.style.margin = "20px";

	if (currentPage > 0) {
		const prevBtn = document.createElement("button");
		prevBtn.textContent = "이전";
		prevBtn.onclick = () => {
			currentPage--;
			renderMailListPage(currentPage);
			renderPagination();
		};
		container.appendChild(prevBtn);
	}

	for (let i = startPage; i < endPage; i++) {
		const btn = document.createElement("button");
		btn.textContent = i + 1;
		if (i === currentPage) btn.classList.add("active");
		btn.onclick = () => {
			currentPage = i;
			renderMailListPage(currentPage);
			renderPagination();
		};
		container.appendChild(btn);
	}

	if (currentPage < totalPages - 1) {
		const nextBtn = document.createElement("button");
		nextBtn.textContent = "다음";
		nextBtn.onclick = () => {
			currentPage++;
			renderMailListPage(currentPage);
			renderPagination();
		};
		container.appendChild(nextBtn);
	}

	document.querySelector(".mailbox-container").appendChild(container);
}

// 버튼
document.querySelectorAll('button').forEach(button => {
	button.addEventListener("click", function (e) {
		if (e.target.classList.contains("send-mail-btn")) {
			location.href = '/mail/sendMail';
		}
	});
});

// 메일 모달 열기
document.querySelectorAll('.mail-item').forEach(item => {
	item.addEventListener('click', () => {
	// 메일 모달창
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.mail-item').forEach(item => {
		item.addEventListener('click', () => {
			const name = item.dataset.name;
			const photo = item.dataset.photo;
			const content = item.dataset.content;
			const mno = item.dataset.mno;
			const regdate = item.dataset.regdate;
			const selectUno = item.dataset.selectuno;
			const myUno = item.dataset.myuno;
			
			fetch(`/mail/updateByReadMail?mno=${mno}`, {
				method: 'GET'
			})
			.then(res => res.json())
			.then(data  => {
				if (data.status === 'success') {
					// 모달 채우기
					document.getElementById('senderName').innerText = name;
					document.getElementById('mailContent').innerText = content;
					document.getElementById('regdate').innerText = regdate;
					document.getElementById('selectUno').innerText = selectUno;
					document.getElementById('myUno').innerText = myUno;
					document.getElementById('regdate').innerText = regdate;
					
					document.getElementById('mailModal').classList.add('show');
	
					// 읽음 처리된 mail-item에 클래스 추가
					item.classList.add('read');
	
					// ✔ mailCount 갱신 (헤더 UI 업데이트)
					const mailCountSpan = document.querySelector('.count');
					if (mailCountSpan) {
						mailCountSpan.textContent = data.mailCount;
					}
				}
			})
		});
	});
});

// 모달 닫기
document.querySelector('.close-btn').addEventListener('click', () => {
	document.getElementById('mailModal').classList.remove('show');
});
document.getElementById('replyBtn').addEventListener('click', () => {
	document.getElementById('mailInput').value = '';
	document.getElementById('sendmailModal').classList.add('show');
});
document.addEventListener('keydown', (e) => {
	const sendModal = document.getElementById("sendmailModal");
	if (e.key === 'Escape') {
		if (!sendModal || !sendModal.classList.contains("show")) {
			document.getElementById('mailModal').classList.remove('show');
		} else {
			initMailModalContent();
			document.getElementById('sendmailModal').classList.remove('show');
		}
	}
});
