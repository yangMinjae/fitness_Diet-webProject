let link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('type','text/css');
link.setAttribute('href','/resources/css/myPage.css');
document.head.appendChild(link);

let nickName =document.querySelector('.profile-nickname');

let yesRadio = document.querySelector('#yesRadio');
let noRadio = document.querySelector('#noRadio');

let fav = document.querySelector('input[name="fav"]');
let time = document.querySelector('select[name="time"]');
let showArea = document.querySelector('#showArea');
let self = document.querySelector('#self');

let myProfileImg = document.querySelector('#myProfileImg');
let cancelEdit = document.querySelector('#cancelEdit');
let editProfile = document.querySelector('#editProfile');
let f = document.forms[0];

let pressCount = 0;       // 프로필 수정 관련 제어를 위한 변수

initialProfileSet();      // 초기셋팅 : input 태그들, 이미지 버튼 비활성화
getUserInfo();            // db에서 비동기로 유저프로필 및 메이트 데이터 가져와서 화면에 표시

document.querySelectorAll('button')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let btnId = e.currentTarget.getAttribute('id');
    if(btnId=='editProfile'){
      console.log("프로필 수정");
      if(pressCount==0){            // 프로필 수정 버튼 가장 처음 눌렀을 시

        setToEdit();                // input 태그 및 이미지 버튼의 disabled를 풀어준다.

        profileEditToSubmit(e);     // 화면상 표시되는 '프로필 수정' 버튼을 '제출'버튼으로 스타일과
                                    // 텍스트를 바꿔준다.

      }else if(pressCount==1){      // '프로필 수정'(제출 버튼)이 두번째 눌렸을 시 컨트롤러로 form을 제출
        submitForm();               // 폼을 동기 방식으로 제출하는 함수
      }
    }else if(btnId=='cancelEdit'){  // 취소 버튼을 누를 시

      initialProfileSet();          // input 태그와 img 버튼을 비활성화 시키고

      submitToProfileEdit();        // '제출'버튼의 스타일을 다시 '프로필 수정' 버튼으로 변경

      getUserInfo();                // 유저의 정보를 db에서 비동기 방식으로 가져와 다시 화면에 뿌려준다.
      pressCount=0;
    }
  })
})

function initialProfileSet(){       // 초기셋팅 : input 태그들, 이미지 버튼 비활성화
  const formElements = document
  .querySelectorAll('.profile-form input, .profile-form textarea, .profile-form button, .profile-image, .profile-form select');
  formElements.forEach(el => {
    if(el.tagName.toLowerCase()=='img'){
      el.classList.remove('imgAbled');
      el.classList.add('imgDisabled');
      el.classList.remove('imgClickable');
      el.removeEventListener('click',imgClicked);
    }else{
      el.disabled = true;
    }
  });
  cancelEdit.classList.add('hidden');
}

function getUserInfo(){           // db에서 비동기로 유저프로필 및 메이트 데이터 가져와서 화면에 표시
  let uno = f.uno.value;
  fetchGetUserInfo(uno);
}

function fetchGetUserInfo(uno){   // getUserInfo() 함수에서 쓰이는 fetch 함수
  fetch(`/ymj/getProfileInfo`,{
    method : 'post',
    body : uno,
    headers :{
      'Content-Type' : 'text/plain; charset=utf-8'
    }
  })
  .then(res=>res.json())
  .then(json=>{
    console.log("내 프로필 정보 --- "+json);
    // 이 부분에 현재 db에 저장된 프로필 사진(경로를 이용해) 표시
    // 각각 json.path, json.fileName, json.uuid 로 접근 가능
    nickName.textContent=json.nickname;
    if(json.mate=='0'){
      noRadio.checked=true;
      yesRadio.checked=false;
    }else if(json.mate=='1'){
      noRadio.checked=false;
      yesRadio.checked=true;
    }
    fav.value=json.fav;
    showArea.innerText=json.area;  
    time.value=json.time;
    self.value=json.self;
  })
  .catch(err=>console.log(err));
}

function setToEdit(){             // input 태그 및 이미지 버튼의 disabled를 풀어준다.
  const formElements = document
  .querySelectorAll('.profile-form input, .profile-form textarea, .profile-form button, .profile-image, .profile-form select');
  formElements.forEach(el => {
    if(el.tagName.toLowerCase()=='img'){
      el.classList.remove('imgDisabled');
      el.classList.add('imgAbled');
      el.classList.add('imgClickable');
      el.addEventListener('click',imgClicked);
    }else{
      el.disabled = false;
    }
  });
  ++pressCount;
}


function submitForm(){            // 폼을 동기 방식으로 제출하는 함수
  const isChecked = Array
  .from(document.querySelectorAll('input[name="mate"]'))
  .some(r => r.checked);

  let areaVal = showArea.textContent;
  if(!isChecked){
    alert('메이트 추천 여부를 체크해 주세요');
    return;
  }

  if(!f.fav.value){
    alert('좋아하는 운동을 입력해 주세요');
    f.fav.focus();
    return;
  }

  if(areaVal=='::'){
    alert('지역을 선택해 주세요');
    return;
  }

  if(f.time.value=='::'){
    alert('운동 시간대를 선택해 주세요');
    return;
  }

  if(!f.self.value){
    alert('자기소개를 입력해 주세요');
    f.self.focus();
    return;
  }
  let formChildArea = document.createElement('input');
  formChildArea.setAttribute('type', 'hidden');
  formChildArea.setAttribute('name', 'area');
  formChildArea.value=areaVal;
  f.appendChild(formChildArea);
  f.action='/ymj/updateProfile';
  let isSubmit = confirm('프로필을 수정하시겠습니까?');
  if(isSubmit){
    f.submit();
  }
}

function imgClicked(){            // 이미지 버튼 클릭시 파일 업로드/db 등록을 하는함수
	console.log("이미지 버튼 클릭");
	// 후에 input[tyep="file" hidden]과 연결
}

function profileEditToSubmit(){   // 화면상 표시되는 '프로필 수정' 버튼을 '제출'버튼으로 스타일과 텍스트를 변경
  editProfile.innerText='제출';
  editProfile.classList.remove('edit-button');
  editProfile.classList.add('submit-button');
  cancelEdit.classList.remove('hidden');
}

function submitToProfileEdit(){   // '제출'버튼의 스타일을 다시 '프로필 수정' 버튼으로 변경
  editProfile.innerText='프로필 수정';
  editProfile.classList.remove('submit-button');
  editProfile.classList.add('edit-button');
  cancelEdit.classList.add('hidden');
}


