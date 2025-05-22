const closeBtn = document.querySelector(".profile-modal .close");
const profilemodal = document.getElementById("profileModal");

//이전 class 상태 저장용
let previousClassList = [...profilemodal.classList];
let selectUno;

// 게시글 클릭 시 해당 ID로 이동
document.querySelectorAll('.post-row.clickable').forEach(row => {
  row.addEventListener('click', () => {
	  console.log('boardView!');
  });
});

closeBtn.addEventListener("click", () => {
	profilemodal.classList.remove("show");
});

const observer = new MutationObserver((mutationsList) => {
 for (let mutation of mutationsList) {
     if (mutation.type === "attributes" && mutation.attributeName === "class") {
         const currentClassList = [...profilemodal.classList];
         
         const added = currentClassList.filter(cls => !previousClassList.includes(cls));

         if (added.includes("show")) {        	 
             getProfile();
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
			  row.dataset.postId = board.id;
			  row.innerHTML = `
				  <div>${board.title}</div>
				  <div>${formatDateToYMD(board.regDate)}</div>
				  <div>${board.hit}</div>
				  <div>${board.love}</div>
				  `;
			  
			  postTable.appendChild(row);
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

//esc 누를 시 모달 스타일 제거 (sendmailModal이 열려 있을 시에만)
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape"){
	document.getElementById('profileModal').classList.remove('show')
	}
});