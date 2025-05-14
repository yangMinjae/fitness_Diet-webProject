// --- CSS 파일 동적 로딩 ---
const CSS_FILE_PATH1 = '/resources/css/signup.css';
const linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH1;
document.head.appendChild(linkEle);

let isId = false;
let isNickname = false;
let isEmail = false;
let isPw = false;

const idCheckBtn = document.getElementById("duplicateCkIdBtn");
const nickCheckBtn = document.getElementById("duplicateCkNnBtn");
const emailCheckBtn = document.getElementById("duplicateCkEmBtn");
// --- 정규식 ---
const regExp = {
		// 아이디 6자, 닉네임으로 바꾸기
  mId: /^[a-z]+[0-9a-z]{3,12}$/,
  mPw: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/,
  mNickname: /^[가-힣a-zA-Z]{2,12}$/,
  mEmail: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

// --- Form 및 상태요소 참조 ---
const f = document.forms[0];

// --- 개별 유효성 검사 ---
function validateField(id) {
  const value = f[id].value.trim();
  
  const labels = {
	mId : document.querySelector('input[name="mId"]'),
	mPw : document.querySelector('input[name="mPw"]'),
	mNickname : document.querySelector('input[name="mNickname"]'),
	mEmail : document.querySelector('input[name="mEmail"]')
  };

  const currentLabel = labels[id];
  
  switch(id){
  	case 'mId' : 
  	  idCheckBtn.classList.toggle("show-btn", value);
  		break;
  	case 'mNickname' : 
  	  nickCheckBtn.classList.toggle("show-btn", value);
  		break;
  	case 'mEmail' : 
  	  emailCheckBtn.classList.toggle("show-btn", value);
  		break;
  }
  
  
  currentLabel.classList.remove("input-invalid", "input-valid");
  
  if (value === "") {
	  
	  currentLabel.classList.remove("input-invalid");
	  currentLabel.classList.remove("input-valid");
	  currentLabel.classList.remove("input-verified");
	  
    return;
  }

  if (regExp[id] && !regExp[id].test(value)) {	  
	  if (id === 'mPw') {
		  currentLabel.classList.remove("input-verified");
	}
		 currentLabel.classList.add("input-invalid");
  	} else {		  
	  if(id === 'mPw'){
		  currentLabel.classList.add("input-verified");
	  }else
		  currentLabel.classList.add("input-valid");
  }  
}

// --- 비밀번호 일치 확인 ---
const pw = document.getElementById("mPw");
const pwRe = document.getElementById("mPwRe");

function checkPwMatch() {
  if (pw.value === "" || pwRe.value === "") {
	document.querySelector('input[name="mPwRe"]').classList.remove("input-verified");
	document.querySelector('input[name="mPwRe"]').classList.remove("input-invalid");
	isPw = false;
    return;
  }

  if (pw.value === pwRe.value) {
	document.querySelector('input[name="mPwRe"]').classList.remove("input-invalid");
    document.querySelector('input[name="mPwRe"]').classList.add("input-verified");
    isPw = true;
  } else {
    document.querySelector('input[name="mPwRe"]').classList.remove("input-verified");
    document.querySelector('input[name="mPwRe"]').classList.add("input-invalid");
    isPw = false;
  }
}

// --- 입력 이벤트 바인딩 ---
["mId", "mPw", "mPwRe", "mNickname", "mEmail"].forEach(id => {
  f[id].addEventListener("input", () => {
    if (id === "mPw") {
      checkPwMatch();
      validateField("mPw");
    } else if(id === "mPwRe"){
      checkPwMatch();
    } else{
      validateField(id);
    }
  });
});

// --- 중복 확인 함수들 ---
function validateDuplicate(id, endpoint, label) {
  const value = f[id].value.trim();
  const url = id === 'mEmail' ? `/sign/validateEmail?email=${encodeURIComponent(value)}` 
		  : `/sign/${endpoint}/${encodeURIComponent(value)}`;
  
  console.log(value);
  if(id === 'mId' && !regExp.mId.test(f.mId.value)){
	  alert('형식이 맞지 않습니다. (영어 소문자로 시작, 영어 + 숫자 조합 3~12 글자)');
	  return;
  }
  
  if(id === 'mEmail' && !regExp.mEmail.test(f.mEmail.value)){
	  alert('형식이 맞지 않습니다. (@ 포함 전체 이메일)');
	  return;
  }
  
  if(id === 'mNickname' && !regExp.mNickname.test(f.mNickname.value)){
	  alert('형식이 맞지 않습니다. (한글, 영어 2~12 글자)');
	  return;
  }
	
  fetch(url)
	  .then(res => res.text())
	  .then(result => {
		  if (result === "true") {
			  if (confirm(`사용 가능한 ${label}입니다. 사용하시겠습니까?`)) {
				  f[id].readOnly = true;
				  f[id].classList.add("input-verified");
				  
				  switch (id) {
				  	case "mId":
				  		isId = true;
					break;
				  	case "mEmail":
				  		isEmail = true;
					break;
				  	case "mNickname":
				  		isNickname = true;
				  	break;
				  }
			  }
		  } else {
			  alert(`이미 존재하는 ${label}입니다.`);
			  check = false;
		  }
	  })
	  .catch(err => console.error("중복 확인 오류:", err));
};

// --- 회원가입 요청 ---
function join() {
  const userData = {
    id: f.mId.value.trim(),
    pw: f.mPw.value.trim(),
    nickname: f.mNickname.value.trim(),
    email: f.mEmail.value.trim()
  };
  
  if(!isId || !isNickname || !isEmail || !isPw){
	  alert('모든 빈칸을 정확히 입력해 주세요.');
	  return; 
  } 
  
  fetch('/sign/insertUser', {
    method: 'POST',
    headers: {'Content-type': 'application/json; charset=utf-8'},
    body: JSON.stringify(userData)
  })
  .then(res => res.text())
  .then(data => {
    if (data === "false") {
      alert("회원가입이 실패했습니다.");
    } else {
      alert("회원가입이 완료되었습니다.");
      location.href="/login";
      // 이동 코드 추가 가능
    }
  })
  .catch(err => console.log(err));
}

// --- 버튼 클릭 이벤트 ---
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", (e) => {
	const id = btn.id;
	
    if (id === "duplicateCkIdBtn") validateDuplicate("mId", "validateId", "아이디");
    else if (id === "duplicateCkEmBtn") validateDuplicate("mEmail", "validateEmail", "이메일");
    else if (id === "duplicateCkNnBtn") validateDuplicate("mNickname", "validateNickname", "닉네임");
    else if (id === "joinBtn") join();
    else if (id === "resetBtn") init(); 
    else if (id === "mainBtn") location.href = "/login";
  });
});

// 초기화 함수
function init() {
	f.reset();
    ["mId", "mNickname", "mEmail"].forEach(id => {
      f[id].readOnly = false;
      f[id].classList.remove("input-verified");
      f[id].classList.remove("input-valid");
      f[id].classList.remove("input-invalid");
    });
    document.querySelector('input[name="mPwRe"]').classList.remove("input-verified");
	document.querySelector('input[name="mPwRe"]').classList.remove("input-invalid");
	document.querySelector('input[name="mPw"]').classList.remove("input-invalid");
	document.querySelector('input[name="mPw"]').classList.remove("input-verified");
}

// --- 초기화 ---
init();