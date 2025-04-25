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

// --- 정규식 ---
const regExp = {
  mId: /^[a-z]+[0-9a-z]{3,12}$/,
  mPw: /^[0-9a-zA-Z]{8,16}$/,
  mNickname: /^[가-힣a-zA-Z]{2,12}$/,
  mEmail: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

// --- Form 및 상태요소 참조 ---
const f = document.forms[0];
const feedback = {
  mId: document.querySelector("#mIdValidState"),
  mPw: document.querySelector("#mPwValidState"),
  mPwRe: document.querySelector("#mPwReValidState"),
  mEmail: document.querySelector("#mEmailValidState"),
  mNickname: document.querySelector("#mNicknameValidState")
};

// --- 스타일 초기화 함수 ---
function resetFeedback(input, msgBox) {
  input.classList.remove("is-valid", "is-invalid");
  if (msgBox) {
    msgBox.classList.remove("valid-feedback", "invalid-feedback");
    msgBox.innerHTML = '';
  }
}

// --- 유효 / 무효 처리 ---
function markValid(input, msgBox, msg = "") {
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
  if (msgBox) {
    msgBox.classList.add("valid-feedback");
    msgBox.classList.remove("invalid-feedback");
    msgBox.innerHTML = msg;
  }
}

function markInvalid(input, msgBox, msg = "") {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  if (msgBox) {
    msgBox.classList.add("invalid-feedback");
    msgBox.classList.remove("valid-feedback");
    msgBox.innerHTML = msg;
  }
}

// --- 개별 유효성 검사 ---
function validateField(id) {
  const value = f[id].value.trim();
  
  const labels = {
	mId : document.querySelector('input[name=mId]'),
	mPw : document.querySelector('input[name="mPw"]'),
	mNickname : document.querySelector('input[name="mNickname"]'),
	mEmail : document.querySelector('input[name="mEmail"]')
  };

  const currentLabel = labels[id];
  
  currentLabel.classList.remove("input-invalid", "input-valid");
  
  if (value === "") {
    return;
  }

  if (regExp[id] && !regExp[id].test(value)) {
	if (id === "mPw") {
//	currentLabel.classList.remove("input-valid")
//	currentLabel.classList.add("input-verified");
	} currentLabel.classList.add("input-invalid");
  } else {
	currentLabel.classList.add("input-valid");
  }

}

// --- 비밀번호 일치 확인 ---
const pw = document.getElementById("mPw");
const pwRe = document.getElementById("mPwRe");
const pwMsg = document.getElementById("pwMatchMessage");

function checkPwMatch() {
  if (pw.value === "" || pwRe.value === "") {
    pwMsg.textContent = "";
    resetFeedback(pw, feedback.mPw);
    resetFeedback(pwRe, feedback.mPwRe);
    return;
  }

  if (pw.value === pwRe.value) {
    pwMsg.textContent = "✅ 일치";
    pwMsg.style.color = "green";
    isPw = true;
  } else {
    pwMsg.textContent = "❌ 불일치";
    pwMsg.style.color = "red";
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
  const url = id === 'mEmail' ? `/sm/validateEmail?email=${encodeURIComponent(value)}` 
		  : `/sm/${endpoint}/${encodeURIComponent(value)}`;
  
  if(id === 'mId' && !regExp.mId.test(f.mId.value)){
	  alert('형식이 맞지 않습니다. (영어 소문자로 시작, 영어 + 숫자 조합 3~12 글자)');
	  return false;
  }
  
  if(id === 'mEmail' && !regExp.mEmail.test(f.mEmail.value)){
	  alert('형식이 맞지 않습니다. (@ 포함 전체 이메일)');
	  return false;
  }
  
  if(id === 'mNickname' && !regExp.mNickname.test(f.mNickname.value)){
	  alert('형식이 맞지 않습니다. (한글, 영어 2~12 글자)');
	  return false;
  }
	
  fetch(url)
	  .then(res => res.text())
	  .then(result => {
		  if (result === "true") {
			  if (confirm(`사용 가능한 ${label}입니다. 사용하시겠습니까?`)) {
				  f[id].readOnly = true;
				  f[id].classList.add("input-verified");

				  return true;
			  }
		  } else {
			  alert(`이미 존재하는 ${label}입니다.`);
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
	  alert('정확히 입력해 주세요.');
	  return; 
  } 
  
  fetch('/sm/insertUser', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then(data => {
    if (data === "false") {
      alert("회원가입이 실패했습니다.");
    } else {
      alert("회원가입이 완료되었습니다.");
      location.href="/sm/matePage";
      // 이동 코드 추가 가능
    }
  })
  .catch(err => console.log(err));
}

// --- 버튼 클릭 이벤트 ---
document.querySelectorAll("button").forEach(btn => {
  const id = btn.id;
  btn.addEventListener("click", () => {
    if (id === "duplicateCkIdBtn") isId = validateDuplicate("mId", "validateId", "아이디");
    else if (id === "duplicateCkEmBtn") isEmail = validateDuplicate("mEmail", "validateEmail", "이메일");
    else if (id === "duplicateCkNnBtn") isNickname = validateDuplicate("mNickname", "validateNickname", "닉네임");
    else if (id === "joinBtn") join();
    else if (id === "resetBtn") {
    	init();
    }
  });
});

// 초기화 함수
function init() {
	f.reset();
    ["mId", "mNickname", "mEmail"].forEach(id => {
      f[id].readOnly = false;
      f[id].classList.remove("input-verified");
      resetFeedback(f[id], feedback[id]);
    });
    pwMsg.textContent = "";
    resetFeedback(pw, feedback.mPw);
    resetFeedback(pwRe, feedback.mPwRe);
}

// --- 초기화 ---
init();
