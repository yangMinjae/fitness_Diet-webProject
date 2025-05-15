//-----CSS 파일 추가
//1. 파일 경로 설정
const CSS_FILE_PATH = ['/resources/css/mailList.css', '/resources/css/mailModal.css', '/resources/css/sendMailModal.css'];
//2. link 태그 생성
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
//3. head 태그에 link 엘리먼트 추가
	document.head.appendChild(linkEle);	
});

document.addEventListener("DOMContentLoaded", function () {
	  const searchInput = document.querySelector(".search-input");
	  const mailItems = document.querySelectorAll(".mail-item");

	  // 디바운스 함수 정의
	  function debounce(func, delay) {
	    let timeout;
	    return function (...args) {
	      clearTimeout(timeout);
	      timeout = setTimeout(() => func.apply(this, args), delay);
	    };
	  }

	  function filterMails() {
	    const keyword = searchInput.value.toLowerCase().trim();

	    mailItems.forEach(item => {
	      const sender = item.querySelector(".sender").textContent.toLowerCase();
	      const content = item.dataset.content.toLowerCase();

	      const matches = sender.includes(keyword) || content.includes(keyword);
	      item.style.display = matches ? "flex" : "none";
	    });
	  }

	  // 실시간 입력값 변경 시 검색
	  searchInput.addEventListener("input", filterMails);
	  
	  // 디바운스된 버전으로 등록
	  /*
		 * const debouncedFilter = debounce(filterMails, 300);
		 * searchInput.addEventListener("input", debouncedFilter);
		 */
});

//메일 보내기 버튼
document.querySelectorAll('button').forEach(button=>{
	button.addEventListener("click", function(e){		
		let name = e.target.getAttribute('class');

		switch(name){
			case 'send-mail-btn' :
				console.log("send-mail-btn");
				location.href = '/mail/sendMail';
				break;
		}
	});
});

// 메일 모달창
document.querySelectorAll('.mail-item').forEach(item => {
	item.addEventListener('click', () => {
		const name = item.dataset.name;
		const photo = item.dataset.photo;
		const content = item.dataset.content;
		const regdate = item.dataset.regdate

		document.getElementById('senderName').innerText = name;
		document.getElementById('mailContent').innerText = content;
		document.getElementById('regdate').innerText = regdate;

		document.getElementById('mailModal').classList.add('show');
	});
});

document.querySelector('.close-btn').addEventListener('click', () => {
	document.getElementById('mailModal').classList.remove('show');
});

document.getElementById('replyBtn').addEventListener('click', () => {
	document.getElementById('mailInput').value = '';
	document.getElementById('sendmailModal').classList.add('show');
});

//모달 닫기 (ESC 키)
document.addEventListener('keydown', (e) => {
	const sendModal = document.getElementById("sendmailModal");
	
    if (e.key === 'Escape') {
    	if(!sendModal || !sendModal.classList.contains("show")){
    		document.getElementById('mailModal').classList.remove('show');	
    	}
    	else{
    		document.getElementById('sendmailModal').classList.remove('show');	
    	}
    }
});
