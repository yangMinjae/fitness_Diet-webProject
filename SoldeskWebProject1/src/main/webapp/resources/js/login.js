//-----CSS 파일 추가
//1. 파일 경로 설정
const CSS_FILE_PATH = ['/resources/css/login.css', '/resources/css/findID.css', '/resources/css/resultFindID.css'];
//2. link 태그 생성
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
//3. head 태그에 link 엘리먼트 추가
	document.head.appendChild(linkEle);	
});

const regExpId = /^[a-z]+[0-9a-z]{3,12}$/;	// 아이디 검증 정규식
const regExpPw = /^[0-9a-zA-Z]{8,16}$/;		  // 비밀번호 검증 정규식
const regIsNum = /^\d+$/;                   // 숫자 확인 정규식

// 모달 변수 생성
const findModal = document.getElementById('findIdModal');
const resultModal = document.getElementById('resultModal');
const inputFieldID = document.querySelector("input[name=username]");
const inputFieldPW = document.querySelector("input[name=password]");

let f = document.forms[0];
let btnSubmit = document.querySelector('.login-submit');

document
.querySelectorAll('a')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let href = e.currentTarget.getAttribute('href');
    if(href == 'findId'){
    	document.getElementById('findIdModal').classList.add('show');
    }
    else if(href == 'findPw'){
      console.log('비밀번호 찾기');
    }else if(href == 'signup'){
      console.log('회원가입');
      location.href='/sign/signUp';
    }
  })
});

//btnSubmit.addEventListener('click', (e)=>{
//  console.log('로그인 버튼');
//  if(!regExpId.test(f.username.value)){
//    alert('올바른 형식의 아이디를 입력해주세요\n(숫자와 영소문자로만 구성된 3~12자)');
//    f.username.focus();
//    return;
//  }
//  if(!regExpPw.test(f.password.value)){
//    alert('올바른 형식의 비밀번호를 입력해주세요\n(숫자와 영문자로만 구성된 8~16자)');
//    f.password.focus();
//    return;
//  }
//  //login();
//})

function login(){
  fetch('/sign/login',{
    method : 'post',
    body:JSON.stringify({
      username : f.username.value,
      password : f.password.value
    }),
    headers : {
      'Content-Type' : 'application/json; charset=utf-8'
    }
  })
  .then(res=>res.text())
  .then(text=>{
    if(text=='fail'){
      alert('일치하는 회원정보가 존재하지 않습니다.');
    }else if(regIsNum.test(text)){
      sessionStorage.setItem('uno',text);
      location.href='/'+'?uno='+sessionStorage.getItem('uno');
    }
  })
}

//회원 가입 모달 닫기
document.querySelector('#findIdModal .close-btn').addEventListener('click', () => {
	findModal.classList.remove('show');
});

//정보창 모달 닫기
document.querySelector('#resultModal .close-btn').addEventListener('click', () => {
	resultModal.classList.remove('show');
	console.log(inputFieldID.value);
});

// email 찾기 버튼 클릭 시
document.getElementById('findIdSubmit').addEventListener('click', () => {
	const email = document.getElementById('findIdEmail').value;
	const result = document.getElementById('findIdResult');

	if (!email) {
		result.textContent = "이메일을 입력해주세요.";
		return;
	}
	
	fetch('/sign/findID?email='+email)
		.then(response => response.json())
		.then(data => {
			if (data != null) {
				// 정보 존재 시
				document.getElementById('resultTitle').textContent = "아이디 및 비밀번호 확인";
				document.getElementById('resultBody').innerHTML = `
					<p>🧑 아이디: <strong>${data.id}</strong></p>
					<p>🔐 비밀번호: <strong>${data.pw}</strong></p>	`;
				
				// 찾은 ID, PW로 inputField 초기화
				inputFieldID.value = data.id;
				inputFieldPW.value = data.pw;
			} else {
				// 정보 없음
				document.getElementById('resultTitle').textContent = "검색 결과 없음";
				document.getElementById('resultBody').textContent = "해당 이메일로 등록된 회원 정보가 없습니다.";
			}

			// 회원 가입 모달 닫기
			findModal.classList.remove('show');
			// 정보 창 모달 열기
			resultModal.classList.add('show');
		})
		.catch(err => {
			console.log(err);
		});
});