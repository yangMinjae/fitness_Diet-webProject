const closeBtn = document.querySelector(".profile-modal .close");
const profilemodal = document.getElementById("profileModal");

//이전 class 상태 저장용
let previousClassList = [...profilemodal.classList];
let selectUno;
let currentMyUno;

// 게시글 클릭 시 해당 ID로 이동

closeBtn.addEventListener("click", () => {
	closeProfileModal();
});

const observer = new MutationObserver((mutationsList) => {
 for (let mutation of mutationsList) {
     if (mutation.type === "attributes" && mutation.attributeName === "class") {
         const currentClassList = [...profilemodal.classList];
         
         const added = currentClassList.filter(cls => !previousClassList.includes(cls));

         if (added.includes("show")) {        	 
             getProfile();
             getFollow()
         }         
         
         previousClassList = currentClassList;
     }
 }
});

observer.observe(profilemodal, {
 attributes: true,
 attributeFilter: ["class"]
});

function setSelectUno(uno) {
	selectUno = uno;
}

function setCurrentMyUno(uno){
	currentMyUno = uno;
}

function getProfile() {
	if(!selectUno)
		return;
	
	fetch(`/myPage/getProfileModalInfo?uno=${selectUno}`)
	  .then(res=>res.json())
	  .then(json=>{
		  renderProfileModalInfo(json);
	  })
	  .catch(err=>console.log(err));
}

function getFollow(){
	if(!selectUno || !currentMyUno || selectUno == currentMyUno)
		return;
	
	fetch(`/myPage/checkIfFollow?selectUno=${selectUno}&myUno=${currentMyUno}`)
	  .then(res=>res.json())
	  .then(json=>{		  
		  const existingBtn = document.getElementById('customBtn');
		  
		  if (existingBtn) {
		    existingBtn.remove(); // 중복 방지용
		  }		  
		  
		  const profileImg = document.querySelector('.profile-photo');
		  const customBtn = document.createElement('button');

		  // 버튼 기본 속성 설정
		  customBtn.type = 'button';
		  customBtn.id = 'customBtn';
		  customBtn.textContent = json > 0 ? '팔로잉' : '팔로우';
		  customBtn.className = json > 0 ? 'following-btn' : 'follow-btn';

		  // 삽입 위치: 이미지 바로 아래
		  profileImg.insertAdjacentElement('afterend', customBtn);
		  
		  customBtn.onclick = () => {
			  handleFollowToggle(customBtn.textContent, customBtn, currentMyUno, selectUno);
		  };
	  })
	  .catch(err=>console.log(err));
}

function handleFollowToggle(status, buttonEl, myUno, targetUno) {
	  const isFollowing = status === '팔로잉';
	  const url = isFollowing ? '/mate/unfollow' : '/mate/follow';

	  const formData = new URLSearchParams();
	  formData.append('uno', targetUno);     // 상대방
	  formData.append('userUno', myUno);     // 나

	  fetch(url, {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    body: formData
	  })
	    .then(res => res.text())
	    .then(result => {
	    	
	      if (!result) return alert('요청 실패');

	      // 상태 반전
	      const nextStatus = isFollowing ? '팔로우' : '팔로잉';
	      const nextClass = isFollowing ? 'follow-btn' : 'following-btn';

	      buttonEl.textContent = nextStatus;
	      buttonEl.className = nextClass;
	    })
	    .catch(err => console.error('요청 실패:', err));
	}

function renderProfileModalInfo(data) {
	  // 프로필 이미지
	  document.querySelector(".profile-photo").src = 
		  (data.fvo.path.substring(data.fvo.path.indexOf("\\profile"))+'\\'+data.fvo.uuid+'_'+data.fvo.fileName)
		  .replace(/\\/g, "/");

	
	  // 닉네임
	  document.querySelector(".up-nickname").textContent = data.nickname;

	  // 자기소개 (bio)
	  if(data.upvo.self == null){
		  document.querySelector(".bio").textContent = '자기 소개 글이 없습니다.';
	  }else{
		  document.querySelector(".bio").textContent = data.upvo.self;
	  }

	  // 팔로워 수
	  if(data.fcount == null){
		  document.querySelector(".followers span").textContent = 0;
	  }else{
		  document.querySelector(".followers span").textContent = data.fcount;		  
	  }
	  
	  // 좋아하는 운동 
	  const badgesContainer = document.querySelector(".badges");
	  badgesContainer.innerHTML = ""; // 기존 제거
	  if(data.upvo.fav == null){
	  }else{		  
		  const span = document.createElement("span");
		  span.className = "badge";
		  span.textContent = data.upvo.fav;
		  badgesContainer.appendChild(span);
	  }
	  
	  // 게시글 테이블
	  const postTable = document.querySelector(".post-table");
	  // 기존 행들 삭제 (header는 유지)
	  postTable.querySelectorAll(".post-row:not(.header)").forEach(el => el.remove());
	  
	  if(data.blist != null){		  
		  data.blist.forEach(board => {
			  
			  const row = document.createElement("div");
			  row.className = "post-row clickable";
			  row.dataset.bno = board.bno;
			  row.innerHTML = `
				  <div>${board.title}</div>
				  <div>${formatDateToYMD(board.regDate)}</div>
				  <div>${board.hit}</div>
				  <div>${board.love}</div>
				  `;
			  
			  postTable.appendChild(row);
		  });
		  
		  document.querySelectorAll('.post-row.clickable').forEach(row => {
        	  row.addEventListener('click', () => {
        		  location.href="/board/boardView?bno="+row.dataset.bno;
        	  });
		  });
	  } 
}

function formatDateToYMD(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}

//모달 열기 닫기 함수
let scrollPosition = 0;

function openProfileModal() {
  scrollPosition = window.scrollY || window.pageYOffset;
  document.body.classList.add('modal-open');
  document.body.style.top = `-${scrollPosition}px`;
  document.getElementById('profileModal').classList.add('show');
}

function closeProfileModal() {
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  window.scrollTo(0, scrollPosition);
  document.getElementById('profileModal').classList.remove('show');
}

//esc 누를 시 모달 스타일 제거 (sendmailModal이 열려 있을 시에만)
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape"){
		closeProfileModal();
	}
});
