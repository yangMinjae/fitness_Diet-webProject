//-----CSS 파일 추가
const CSS_FILE_PATH = ['/resources/css/myPage.css', '/resources/css/profileView.css'];
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

let showArea = document.querySelector('#showArea');

let myProfileImg = document.querySelector('#myProfileImg');
let cancelEdit = document.querySelector('#cancelEdit');
let editProfile = document.querySelector('#editProfile');
let searchArea = document.querySelector('#searchArea');
let f = document.forms[0];

let firstPressed = true;       							// 프로필 수정 관련 제어를 위한 변수

initProfile();                   						// 초기셋팅 : input 태그들, 이미지 버튼 비활성화
                          								// db에서 비동기로 유저프로필 및 메이트 데이터 가져와서 화면에 표시
f.searchAreaBtn.addEventListener("click", function() {
	openModal();
});

document.querySelectorAll('.edit-button-wrapper button')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let btnId = e.currentTarget.getAttribute('id');
    if(btnId=='editProfile'){
      if(firstPressed){            						// 프로필 수정 버튼 가장 처음 눌렀을 시

        setToEdit();                					// input 태그 및 이미지 버튼의 disabled를 풀어준다.

        profileEditToSubmit(e);     					// 화면상 표시되는 '프로필 수정' 버튼을 '제출'버튼으로 스타일과
                                    					// 텍스트를 바꿔준다.
        firstPressed=!firstPressed;
      }else if(!firstPressed){      					// '프로필 수정'(제출 버튼)이 두번째 눌렸을 시 컨트롤러로 form을 제출
        submitForm();               					// 폼을 동기 방식으로 제출하는 함수
      }
    }else if(btnId=='cancelEdit'){  					// 취소 버튼을 누를 시

      initProfile();                       				// input 태그와 img 버튼을 비활성화 시키고
                                    					// 유저의 정보를 db에서 비동기 방식으로 가져와 다시 화면에 뿌려준다.

      submitToProfileEdit();        					// '제출'버튼의 스타일을 다시 '프로필 수정' 버튼으로 변경
               
      firstPressed=!firstPressed;
    }
  })
})

//--------------------------프로필 세팅---------------------------

function getProfileFormElements() {
	  return document.querySelectorAll('.profile-form input, .profile-form textarea, .profile-form button, .profile-image, .profile-form select');
}

function initialProfileTagSet(){       					// 초기셋팅 : input 태그들, 이미지 버튼 비활성화
  getProfileFormElements().forEach(el => {
	    if (el.tagName.toLowerCase() !== 'img') {
	      el.disabled = true;
	      el.classList.add('readonly');
	    }
	  });
	  document.querySelector('#imgEditBtn').classList.add('hidden');
	}
function setToEdit(){             						// input 태그 및 이미지 버튼의 disabled를 풀어준다.
  getProfileFormElements().forEach(el => {
	    if (el.tagName.toLowerCase() !== 'img') {
	      el.disabled = false;
	      el.classList.remove('readonly');
	      document.querySelector('.profile-form').classList.add('editing');
	    }
	  });
	  document.querySelector('#imgEditBtn').classList.remove('hidden');
	}

function getUserInfo(){           						// db에서 비동기로 유저프로필 및 메이트 데이터 가져와서 화면에 표시
  let uno = f.elements['uVO.uno'].value;
  fetchUserInfo(uno);
}

function fetchUserInfo(uno){      						// getUserInfo() 함수에서 쓰이는 fetch 함수
	  fetch(`/myPage/getProfileInfo`,{
	    method : 'post',
	    body : uno,
	    headers :{
	      'Content-Type' : 'text/plain; charset=utf-8'
	    }
	  })
	  .then(res=>res.json())
	  .then(json=>{
	    // 이 부분에 현재 db에 저장된 프로필 사진(경로를 이용해) 표시
	    // 각각 json.fVO.path, json.fVO.fileName, json.fVO.uuid 로 접근 가능
		
		let result = json.fVO.path.substring(json.fVO.path.indexOf("\\profile"))+'\\'+json.upVO.uuid+'_'+json.fVO.fileName;
		result = result.replace(/\\/g, "/");
		myProfileImg.setAttribute('src',result);			


	    let yesRadio = document.querySelector('#yesRadio');
	    let noRadio = document.querySelector('#noRadio');
	    let nickName =document.querySelector('.profile-nickname');
	    nickName.textContent=json.uVO.nickname;
	    f.elements['fVO.uuid'].value=json.fVO.uuid; 
	    f.elements['upVO.fav'].value=json.upVO.fav;
	    showArea.innerText=json.mVO.area;  
	    f.elements['mVO.time'].value=json.mVO.time;
	    f.elements['upVO.self'].value=json.upVO.self;
	  })
	  .catch(err=>console.log(err));
	}

function initProfile() {
	initialProfileTagSet();            					// 초기셋팅 : input 태그들, 이미지 버튼 비활성화
	getUserInfo();                  					// db에서 비동기로 유저프로필 및 메이트 데이터 가져와서 화면에 표시
	document.querySelector('.profile-form').classList.remove('editing');
}

function profileEditToSubmit(){   						// 화면상 표시되는 '프로필 수정' 버튼을 '제출'버튼으로 스타일과 텍스트를 변경
	  editProfile.innerText='제출';
	  editProfile.classList.remove('edit-button');
	  editProfile.classList.add('submit-button');
	  cancelEdit.classList.remove('hidden');
	  searchArea.classList.remove('hidden');
	}

	function submitToProfileEdit(){   					// '제출'버튼의 스타일을 다시 '프로필 수정' 버튼으로 변경
	  editProfile.innerText='프로필 수정';
	  editProfile.classList.remove('submit-button');
	  editProfile.classList.add('edit-button');
	  cancelEdit.classList.add('hidden');
	  searchArea.classList.add('hidden');
	}
	
//-------------------------------------------------------------

function submitForm(){            						// 폼을 동기 방식으로 제출하는 함수
  let areaVal = showArea.textContent;

  if(!f.elements['upVO.fav'].value){
    alert('좋아하는 운동을 입력해 주세요');
    f.elements['upVO.fav'].focus();
    return;
  }

  if(areaVal=='::'){
    alert('지역을 선택해 주세요');
    return;
  }

  if(f.elements['mVO.time'].value=='::'){
    alert('운동 시간대를 선택해 주세요');
    return;
  }

  if(!f.elements['upVO.self'].value){
    alert('자기소개를 입력해 주세요');
    f.elements['upVO.self'].focus();
    return;
  }
  let formChildArea = document.createElement('input');
  formChildArea.setAttribute('type', 'hidden');
  formChildArea.setAttribute('name', 'mVO.area');
  formChildArea.value=areaVal;
  f.appendChild(formChildArea);
  f.action='/myPage/updateProfile';
  if(confirm('프로필을 수정하시겠습니까?')){
    f.submit();
  }
}

//------------------이미지 업로드 모달 관련-------------------------
document.querySelectorAll('.button-grid button, .modal-footer button').forEach(button => {
	  button.addEventListener('click', (e) => {
	    const id = e.currentTarget.id;

	    switch(id) {
	      case 'basic1':
	      case 'basic2':
	      case 'basic3':
	      case 'basic4':
	      case 'basic5':
	      case 'basic6':
	      case 'basic7':
	      case 'basic8':
	    	f.basicImg.value=id;
	    	myProfileImg.setAttribute('src',`/resources/img/basicProfileImg/${id}.png`);
	    	f.uploadFile.value='';
	    	closeProfileImgModal(); // 기본 이미지 선택 후 모달 닫기
	        break;
	      case 'directUp':
	        closeModal();
	        f.uploadFile.click();
	        break;
	      case 'close':
	    	  closeProfileImgModal(); // 닫기 버튼 클릭 시 모달 닫기
	        break;
	      default:
	        console.warn('알 수 없는 버튼 ID:', id);
	    }
	  });
	});

//모달 DOM 참조
const modalOverlay = document.getElementById('modalOverlay');
const imgEditBtn = document.getElementById('imgEditBtn');

// 모달 열기 함수
function openProfileImgModal() {
	modalOverlay.style.display = 'flex';
}

// 모달 닫기 함수
function closeProfileImgModal() {
	modalOverlay.style.display = 'none';
}

// 기어 버튼 클릭 → 모달 열기
imgEditBtn.addEventListener('click', () => {
	openProfileImgModal();
});

//직접 업로드된 이미지 미리보기
f.uploadFile.addEventListener('change', function(e) {
	  f.basicImg.value='';
	  const file = e.target.files[0];
	  	  
	  if (file && file.type.startsWith("image/")) {
	    const reader = new FileReader();
	    reader.onload = function(event) {
	      myProfileImg.setAttribute("src", event.target.result); // 이미지 미리보기
	    };
	    reader.readAsDataURL(file);
	  } else {
	    alert("이미지 파일만 업로드할 수 있습니다.");
	    e.target.value = ''; // 잘못된 파일일 경우 초기화
	  }
	});
