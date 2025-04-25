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
				console.log("testPage");
				break;
			// 게시판 목록
			case 'boardPage' :
				location.href = '/boardList';
				break;
			// 운동 메이트 찾기
			case 'matePage' :
				location.href = '/matePage'+'?uno=3';
				// 추후에 uno 관련 코드 수정
				break;
		}
	});
});

// 프로필 팝업들 버튼화
document.querySelectorAll('p').forEach(p=>{
	p.addEventListener("click", function(e){		
		let id = e.target.getAttribute('id');

		switch(id){
			// 마이페이지
			case 'myPage' :
				location.href = '/myPage';
				break;
			// 회원 정보 수정
			case 'modifyPage' :
				console.log("modifyPage");
				break;
			// 로그 아웃
			case 'logout' :
				console.log("logout");
				break;
		}
	});
});

// 헤더 메일 아이콘 버튼화
document.querySelectorAll('img').forEach(img=>{
	img.addEventListener("click", function(e){		
		let alt = e.target.getAttribute('alt');

		switch(alt){
			case 'mailPage' :
				location.href = '/mailList'+'?receiver=1';
				// 추후에 리시버 관련 코드 수정
				break;
		}
	});
});

// 로그인 버튼
document.querySelectorAll('button').forEach(button=>{
	button.addEventListener("click", function(e){		
		let name = e.target.getAttribute('class');

		switch(name){
			case 'login-btn' :
				location.href = '/login';
				break;
		}
	});
});