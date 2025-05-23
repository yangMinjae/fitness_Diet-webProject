//-----CSS 파일 추가
const CSS_FILE_PATH = ['/resources/css/boardView.css', '/resources/css/profileView.css', '/resources/css/sendMailModal.css'];
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

const form = document.forms[0];

document.addEventListener('DOMContentLoaded', () => {
	const likeBtn = document.getElementById('like-btn');
	const unLikeBtn = document.getElementById('unlike-btn');
	const updateBtn = document.getElementById('edit-btn');
	const deleteBtn = document.getElementById('delete-btn');
	
	const nickname = document.getElementById('post-Nickname');	
	const popup = document.getElementById('nickname-popup');	
	const profileModal = document.getElementById("profileModal");
	const likeWrapper = document.getElementById('like-wrapper');
	
	const toggleDietBtn = document.getElementById("toggleDietContentBtn");
	const dietWrapper = document.getElementById("dietContentWrapper");
	
	if (toggleDietBtn  && dietWrapper) {
			console.log("식단 펼치기 버튼 ")
		  toggleDietBtn.addEventListener("click", () => {
		    const isCollapsed = dietWrapper.classList.contains("collapsed");

		    if (isCollapsed) {
		      dietWrapper.classList.remove("collapsed");
		      dietWrapper.classList.add("expanded");
		      toggleDietBtn.textContent = "[- 식단 내용 접기]";
		    } else {
		      dietWrapper.classList.remove("expanded");
		      dietWrapper.classList.add("collapsed");
		      toggleDietBtn.textContent = "[+ 식단 내용 펼치기]";
		    }
		  });
		}
	
	if (likeBtn) likeBtn.addEventListener('click', handleLike);
	if (unLikeBtn) unLikeBtn.addEventListener('click', handleUnLike);
  	
	if(updateBtn){
		updateBtn.addEventListener('click', () => {
			  location.href = '/board/updateBoard?' + 'bno='+ form.bno.value
		 });
	}	
	
	if(deleteBtn){
		deleteBtn.addEventListener('click', () => {	  
		    if (confirm('정말 삭제하시겠습니까?')) {
		    	
		      form.action='/board/boardView/delete';
		      form.submit();
		    }
		 });
	}  
	
  document.getElementById('list-btn').addEventListener('click', () => {
	  location.href = '/boardList';
  }); 

  document.getElementById('prev-btn').addEventListener('click', function(e) {
	  let bList = JSON.parse(e.target.getAttribute("bList"));
	  let bno = e.target.getAttribute("bno");
	  let index = bList.findIndex(b => b.bno == bno);	

	  if(index-1 < 0){
		  alert('이전 글이 없습니다.');
	  }else{
		  location.href="/board/boardView?bno="+(bList[index - 1].bno);
	  }	  	  
  });

  document.getElementById('next-btn').addEventListener('click', function(e) {
	  let bList = JSON.parse(e.target.getAttribute("bList"));
	  let bno = e.target.getAttribute("bno");
	  let index = bList.findIndex(b => b.bno == bno);	
	  
	  if(index+1 >= bList.length){
		  alert('다음 글이 없습니다.');
	  }else{
		  location.href="/board/boardView?bno="+(bList[index + 1].bno);
	  }	 
  });

  nickname.addEventListener('click', (event) => {
      const rect = nickname.getBoundingClientRect();
      popup.style.top = `${rect.bottom + window.scrollY}px`;
      popup.style.left = `${rect.left + window.scrollX}px`;
      popup.classList.toggle('hidden');
      event.stopPropagation();
  });

  document.addEventListener('click', () => {
      popup.classList.add('hidden');
  });

  popup.addEventListener('click', (e) => e.stopPropagation());
  
 document.querySelectorAll("#nickname-popup li").forEach(function(li) {
	    li.addEventListener('click', function(e) {
	        const id = e.currentTarget.id;  // 더 정확하게는 this.id 도 가능

	        switch(id){
	        case "show-profile" :
	        	setSelectUno(e.currentTarget.dataset.uno);
	        	openProfileModal();
	        	break;
	        case "send-mail" :
	        	console.log("send-mail");
	        	setSendMyUno(form.uno.value);
				setSendSelectUno(e.currentTarget.dataset.uno);
				initMailModalContent();
				initMailModalEvent();
				document.getElementById('sendmailModal').classList.add('show');
				document.body.classList.add('modal-open'); // ✅ 스크롤 차단
	        	break;
	        }
	        
	    });
  });
  
});

function createButton(isLiked) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'icon-btn';
    if (isLiked) {
        button.id = 'unlike-btn';
        button.title = '싫어요';
        button.textContent = '❤싫어요';
        button.addEventListener('click', handleUnLike);
    } else {
        button.id = 'like-btn';
        button.title = '좋아요';
        button.textContent = '❤좋아요';
        button.addEventListener('click', handleLike);
    }
    return button;
}

function transitionButton(newButton, oldButton) {
    oldButton.classList.add('fade-out');
    setTimeout(() => {
        likeWrapper.innerHTML = '';
        likeWrapper.appendChild(newButton);
        void newButton.offsetWidth; // 리플로우를 강제로 트리거하여 애니메이션 적용
        newButton.classList.add('fade-in');
    }, 300); // fade-out 시간과 일치
}

function updateLoveCount(delta) {
	const loveCount = document.getElementById('love-count');
	if (loveCount) {
		const current = parseInt(loveCount.textContent, 10);
		loveCount.textContent = current + delta;
	}
}

function handleLike() {
	const currentBtn = document.getElementById('like-btn');
	fetch('/board/boardView/love', {
		method: 'POST',
		body: JSON.stringify({ uno: form.uno.value, bno: form.bno.value }),
		headers: { 'Content-Type': 'application/json; charset=utf-8' }
	})
	.then(res => res.text())
	.then(() => {
		const newBtn = createButton(true);
		transitionButton(newBtn, currentBtn);
		updateLoveCount(1); // 추천 수 +1
	});
}

function handleUnLike() {
	const currentBtn = document.getElementById('unlike-btn');
	fetch('/board/boardView/unlove', {
		method: 'POST',
		body: JSON.stringify({ uno: form.uno.value, bno: form.bno.value }),
		headers: { 'Content-Type': 'application/json; charset=utf-8' }
	})
	.then(res => res.text())
	.then(() => {
		const newBtn = createButton(false);
		transitionButton(newBtn, currentBtn);
		updateLoveCount(-1); // 추천 수 -1
	});
}
