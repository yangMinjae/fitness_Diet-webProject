// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/main.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

// 버튼 이벤트 추가
document.querySelectorAll('button').forEach(button=>{
	button.addEventListener("click", function(e){		
		let name = e.target.getAttribute('class');

		switch(name){
			// 설문 시작 버튼
			case 'cta-button' :
				console.log("cta-button");
				location.href = '/survey';
				break;
		}
	});
});

// 인기 게시글 버튼화
document.querySelectorAll('.post-card').forEach(div=>{
	div.addEventListener("click", function(e){		
		console.log("post-card");
	});
});

const thumbnails = document.querySelectorAll('.thumb');
const mainImg = document.getElementById('main-image');
const mainTitle = document.getElementById('main-title');
const mainDesc = document.getElementById('main-desc');

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    mainImg.src = thumb.src;
    mainTitle.textContent = thumb.getAttribute('data-title');
    mainDesc.textContent = thumb.getAttribute('data-desc');
  });
});
