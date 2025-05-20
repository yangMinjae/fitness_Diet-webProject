// CSS 추가
const CSS_FILE_PATH = ['/resources/css/mailList.css', '/resources/css/mailModal.css', '/resources/css/sendMailModal.css'];
CSS_FILE_PATH.forEach(css => {
	const linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

// 메일 모달창
function readModal() {
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
			});
		});
	});
};
readModal();

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
//메일 타입 버튼 처리
document.addEventListener('DOMContentLoaded', () => {
	const unoElement = document.getElementById('myUno');
	const senderBtn = document.getElementById('loadSenderBtn');
	const recevierBtn = document.getElementById('loadRecevierBtn');
	const myUno = unoElement ? unoElement.textContent.trim() : null;

	if (senderBtn) {
	  senderBtn.addEventListener('click', () => {
	    loadMailListByType('/mail/recevier', myUno, true);
	  });
	}

	if (recevierBtn) {
	  recevierBtn.addEventListener('click', () => {
	    loadMailListByType('/mail/sender', myUno, false);
	  });
	}
});

function loadMailListByType(url, myUno, isView) {
	fetch(url)
	.then(res => res.json())
	.then(html => {
		const mailListContainer = document.querySelector('.mail-list');
		let data = '';
		mailListContainer.innerHTML = data;
		
		html.forEach(mvo=>{
			data +=`<li class="mail-item ${mvo.hit == 1 ? 'read' : ''}"
			    data-name="${mvo.nickname}"
			    data-photo="${mvo.imgPath}"
			    data-content="${mvo.content}"
			    data-regdate="${mvo.regdate}"
			    data-selectuno="${mvo.uno}"
			    data-mno="${mvo.mno}"
			    >
				<div class="profile-icon">
					<img src="/resources/img/tag/다이어터.png" alt="프로필" />
				</div>
				<div class="mail-info">
					<span class="sender">${mvo.nickname}</span> 
					<span class="preview">${mvo.preview}</span>
					<span class="regdate">${formatDateToYMD(mvo.regdate)}</span>
				</div>
			</li>`				
			
		})
		mailListContainer.innerHTML = data;
		
		if(isView)
			readModal();
	})
	.catch(err => console.error("메일 목록 불러오기 실패:", err));
}

//날짜 형식 바꾸기
function formatDateToYMD(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}
