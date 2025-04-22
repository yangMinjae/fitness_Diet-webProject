// css 파일 추가
const CSS_FILE_PATH1 = '/resources/css/signup.css';
let linkEle1 = document.createElement('link');
linkEle1.rel = 'stylesheet';
linkEle1.href = CSS_FILE_PATH1;
document.head.appendChild(linkEle1);

/* ---------- 정규식 ---------------- */
const regExpId = /^[a-z]+[0-9a-z]{3,12}$/;	// 아이디 검증 정규식
const regExpPw = /^[0-9a-zA-Z]{8,16}$/;		// 비밀번호 검증 정규식
const regExpName = /^[가-힣a-zA-Z]{2,12}$/;	// 이름 검증 정규식
const regExpEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;	// 이메일
																			// 검증
																			// 정규식
const regExpNickname = /^[가-힣a-zA-Z]{2,12}$/; // 닉네임 검증 정규식

/* -------- 데이터 검증 함수 -------- */
// 데이터 검증 완료 함수
function validated(inputTarget, resultState, comment){
	inputTarget.classList.add("is-valid");
	inputTarget.classList.remove("is-invalid");
	if(resultState){
		resultState.classList.add("valid-feedback");
		resultState.classList.remove("invalid-feedback");
		comment ? 
			resultState.innerHTML = comment : 
				resultState.innerHTML = '' ;
	}
}
// 데이터 검증 미완료 함수
function invalidate(inputTarget, resultState, comment){
	inputTarget.classList.remove("is-valid");
	inputTarget.classList.add("is-invalid");
	if(resultState){
		resultState.classList.remove("valid-feedback");
		resultState.classList.add("invalid-feedback");
		comment ? 
			resultState.innerHTML = comment : 
				resultState.innerHTML = '' ;
	}
}
// 검증 스타일 초기화 함수
function Initialization(inputTarget, resultState){
	inputTarget.classList.remove("is-valid");
	inputTarget.classList.remove("is-invalid");
	if(resultState){
		resultState.classList.remove("valid-feedback");
		resultState.classList.remove("invalid-feedback");
		resultState.innerHTML = '';
	}
}
/* ---------- Form 관련 요소들 ---------------- */
const f = document.forms[0];
const mIdValidState = document.querySelector("#mIdValidState");
const mPwValidState = document.querySelector("#mPwValidState");
const mPwReValidState = document.querySelector("#mPwReValidState");
const mEmailValidState = document.querySelector("#mEmailValidState");
const mNicknameValidState = document.querySelector("#mNicknameValidState");
/* ---------- 함수 ---------------- */
// 실시간 폼 유효성 검사 함수
const checkFormValidity = () => {
	let isValid = true;

	// 아이디 검증
	if (!regExpId.test(f.mId.value)) {
			invalidate(f.mId, mIdValidState, "아이디 형식이 잘못되었습니다.");
			isValid = false;
	} else {
			validated(f.mId, mIdValidState, "사용 가능한 아이디입니다.");
	}

	// 비밀번호 검증
	if (!regExpPw.test(f.mPw.value)) {
			invalidate(f.mPw, mPwValidState, "비밀번호 형식이 잘못되었습니다.");
			isValid = false;
	} else {
			validated(f.mPw, mPwValidState, "강력한 비밀번호입니다.");
			checkPwMatch();
	}

	// 이메일 검증
	if (!regExpEmail.test(f.mEmail.value)) {
			invalidate(f.mEmail, mEmailValidState, "이메일 형식이 잘못되었습니다.");
			isValid = false;
	} else {
			validated(f.mEmail, mEmailValidState, "올바른 이메일입니다.");
	}
	
	// 닉네임 검증
	if (!regExpNickname.test(f.mNickname.value)) {
		invalidate(f.mNickname, mNicknameValidState, "닉네임 형식이 잘못되었습니다.");
		isValid = false;
	} else {
		validated(f.mNickname, mNicknameValidState, "올바른 닉네임입니다.");
	}
	
	document.querySelector("#duplicateCkIdBtn").disabled = !regExpId.test(f.mId.value);
	document.querySelector("#duplicateCkEmBtn").disabled = !regExpEmail.test(f.mEmail.value);
	document.querySelector("#duplicateCkNnBtn").disabled = !regExpNickname.test(f.mNickname.value);
	
	// 가입 버튼 활성화/비활성화
	document.querySelector("#joinBtn").disabled = !isValid;
};

// 실시간 입력 검사
f.mId.addEventListener('input', checkFormValidity);
f.mPw.addEventListener('input', checkFormValidity);
f.mPwRe.addEventListener('input', checkFormValidity);
f.mEmail.addEventListener('input', checkFormValidity);
f.mNickname.addEventListener('input', checkFormValidity);

// 초기 상태에서 버튼 비활성화
checkFormValidity();

// 버튼들 클릭 이벤트
document.querySelectorAll("button").forEach(btn => {
	btn.addEventListener('click', ()=> {
		let type = btn.getAttribute("id");
		
		if(type === 'duplicateCkIdBtn'){
			// id 중복확인
			validateId();
		}else if(type === 'duplicateCkEmBtn'){
			// email 중복확인
			validateEmail();
		}else if(type === 'duplicateCkNnBtn'){
			// nickname 중복확인
			validateNickname();
		}else if(type === 'joinBtn'){
			// 회원가입
			join();
		}else if(type === 'resetBtn'){
			f.reset();
         	["mId", "mNickname", "mEmail"].forEach(id => {
         	    document.getElementById(id).readOnly = false;
         	    document.getElementById(id).classList.remove("input-verified");
         	});
         	init();
		}else{
			console.log('login');
		}
		
		
	});
});

// 시작 시 형식 초기화
init();

// 형식 초기화 함수
function init() {
	Initialization(f.mId, mIdValidState);
 	Initialization(f.mPw, mPwValidState);
 	Initialization(f.mPwRe, mPwReValidState);
 	Initialization(f.mNickname, mNicknameValidState);
 	Initialization(f.mEmail, mEmailValidState);
}

// ID 중복 확인
function validateId(){
	
	const id = f.mId.value;
	fetch(`/sm/validateId/${encodeURIComponent(id)}`
	)
	.then(response => response.text())
	.then(result => {
		if (result === "true") {
			if (confirm("사용 가능한 아이디 입니다. 사용하시겠습니까?")) {
		        document.getElementById("mId").readOnly = true;
		        f.mId.classList.add("input-verified");
		    }
		}else{
			alert("이미 존재 합니다. ");
		}
	})
	.catch(err => console.error("에러 발생: ", err));
};

// Email 중복 확인
function validateEmail(){
	const email = f.mEmail.value;
	fetch(`/sm/validateEmail/${encodeURIComponent(email)}`
	)
	.then(response => response.text())
	.then(result => {
		if (result === "true") {
			if (confirm("사용 가능한 이메일 입니다. 사용하시겠습니까?")) {
		        document.getElementById("mEmail").readOnly = true;
		        f.mEmail.classList.add("input-verified");
		    }
		}else{
			alert("이미 존재하는 이메일 입니다.");
		}
	})
	.catch(err => console.error("에러 발생: ", err));
};

// Nickname 중복 확인
function validateNickname(){
	const nickname = f.mNickname.value;
	fetch(`/sm/validateNickname/${encodeURIComponent(nickname)}`
	)
	.then(response => response.text())
	.then(result => {
		if (result === "true") {
			if (confirm("사용 가능한 닉네임 입니다. 사용하시겠습니까?")) {
		        document.getElementById("mNickname").readOnly = true;
		        f.mNickname.classList.add("input-verified");
		    }
		}else{
			alert("이미 존재하는 닉네임 입니다.");
		}
	})
	.catch(err => console.error("에러 발생: ", err));
};

const pw = document.getElementById("mPw");
const pwRe = document.getElementById("mPwRe");
const msg = document.getElementById("pwMatchMessage");

function checkPwMatch() {
	if (pw.value === "" || pwRe.value === "") {
		msg.textContent = "";
		return;
	}

	if (pw.value === pwRe.value) {
		msg.textContent = "✅ 일치";
		msg.style.color = "green";
	} else {
		msg.textContent = "❌불일치";
		msg.style.color = "red";
	}
}

pw.addEventListener("input", checkPwMatch);
pwRe.addEventListener("input", checkPwMatch);

// 회원 가입
function join(){
	
	const userData = {
			id : document.getElementById("mId").value.trim(),
			pw : document.getElementById("mPw").value.trim(),
			nickname : document.getElementById("mNickname").value.trim(),
			email : document.getElementById("mEmail").value.trim()
		};
	
	fetch(`/sm/insertUser`, {
			method : 'POST',
			headers : {
				'Content-type' : 'application/json; charset=utf-8'
			},
			body : JSON.stringify(userData),
		})
		.then(response => response.json())
		.then(data => {
			
			if(data === "false"){
				alert("회원가입이 실패했습니다.");
			}else{
				alert("회원가입이 완료되었습니다.");
				console.log("로그인 페이지로 이동");
			}
		})
		.catch(err => console.log(err));
};
