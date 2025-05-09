//----------------css스타일--------------------------------
let link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('type','text/css');
link.setAttribute('href','/resources/css/myPage.css');
document.head.appendChild(link);
//--------------------------------------------------------

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
	document.getElementById("regionModal").style.display = "flex";
});

document.querySelectorAll('.edit-button-wrapper button')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let btnId = e.currentTarget.getAttribute('id');
    if(btnId=='editProfile'){
      console.log("프로필 수정");
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
	getProfileFormElements()
	.forEach(el => {
    if(el.tagName.toLowerCase()=='img'){
      el.classList.remove('imgAbled','imgClickable');
      el.classList.add('imgDisabled');
      el.removeEventListener('click',imgClicked);
    }else{
      el.disabled = true;
    }
  });
  cancelEdit.classList.add('hidden');
}

function setToEdit(){             						// input 태그 및 이미지 버튼의 disabled를 풀어준다.
	getProfileFormElements()
	.forEach(el => {
    if(el.tagName.toLowerCase()=='img'){
      el.classList.remove('imgDisabled');
      el.classList.add('imgAbled');
      el.classList.add('imgClickable');
      el.addEventListener('click',imgClicked);
    }else{
      el.disabled = false;
    }
  });
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

	    let yesRadio = document.querySelector('#yesRadio');
	    let noRadio = document.querySelector('#noRadio');
	    let nickName =document.querySelector('.profile-nickname');
	    nickName.textContent=json.uVO.nickname;

	    if(json.upVO.mate=='0'){
	      noRadio.checked=true;
	      yesRadio.checked=false;
	    }else if(json.upVO.mate=='1'){
	      noRadio.checked=false;
	      yesRadio.checked=true;
	    }
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
  const isChecked = Array
  .from(document.querySelectorAll('input[name="upVO.mate"]'))
  .some(r => r.checked);

  let areaVal = showArea.textContent;
  if(!isChecked){
    alert('메이트 추천 여부를 체크해 주세요');
    return;
  }

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

function imgClicked(){            						// 이미지 버튼 클릭시 파일 업로드/db 등록을 하는함수
	console.log("이미지 버튼 클릭");
	// 후에 input[tyep="file" hidden]과 연결
}