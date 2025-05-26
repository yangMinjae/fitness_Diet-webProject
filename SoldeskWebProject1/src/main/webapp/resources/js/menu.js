// 새로고침 시간 밀리초 (30초)
const SETTIME = 30000;

// 헤더 A 태그 버튼화
document.querySelectorAll('a').forEach(a=>{
	a.addEventListener("click", function(e){
		e.preventDefault();
		
		let href = e.target.getAttribute('href');

		switch(href){
			// 로고
			case 'mainPage' :
				location.href = '/';
				break;
			// 설문 시작
			case 'testPage' :
				location.href = '/survey';
				break;
			// 게시판 목록
			case 'boardPage' :
				location.href = '/boardList';
				break;
			// 운동 메이트 찾기
			case 'matePage' :
				location.href = '/matePage';
				break;
		}
	});
});

// 헤더 메일 아이콘 버튼화
document.querySelector('.mail').addEventListener("click", function(e){		
	location.href = '/mailList';
});

// 마이 페이지 버튼 할당량 수정
document.querySelector('.dropdown.user').addEventListener("click", function(e) {
	location.href = '/myPage';
});

// 로그인 버튼
document.querySelectorAll('button').forEach(button=>{
	button.addEventListener("click", function(e){		
		let name = e.target.getAttribute('class');
		
		switch(name){
			case 'login-btn' :
				location.href = '/login';
				break;
			case 'logout-btn' :
				location.href = '/customLogout';
				break;
		}
	});
});

//메이트 버튼 토글 형태
if (document.getElementById('mateToggle') !== null) {
    document.getElementById('mateToggle').addEventListener("change", async function () {
        const isChecked = this.checked;
        const self = this;

        if (isChecked) {
            const res = await fetch('/getCountDiet');
            const result = await res.text();

            if (result === 'false') {
                self.checked = false;

                if (confirm("최초 1회 설문이 필요합니다. 설문 페이지로 이동할까요?")) {
                    location.href = '/survey';
                }
                return;
            }
        }

        const response = await fetch(`/updateMateVisibility?visible=${isChecked}`, {
            method: 'GET'
        });
        const text = await response.text();

        const mate = document.getElementById('mateChecker');
        if (mate) {
            mate.textContent = text;
        }
    });
}

function updateHeaderData() {
	const mailCountEl = document.getElementById('mailCount');
	if (mailCountEl.textContent.trim() != '') {
		fetch('/header/data')
		.then(res => res.json())
		.then(data => {
			
			if (mailCountEl && data.mailCount !== undefined) {
				mailCountEl.textContent = data.mailCount;
			}
			
		})
		.catch(err => console.error('헤더 데이터 갱신 실패:', err));
	}
}

// 예: 30초마다 자동 갱신
setInterval(updateHeaderData, SETTIME);
