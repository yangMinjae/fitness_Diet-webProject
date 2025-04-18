// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/mail.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

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
	      const preview = item.querySelector(".preview").textContent.toLowerCase();

	      const matches = sender.includes(keyword) || preview.includes(keyword);
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
				//location.href = '/';
				break;
		}
	});
});

