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

document
.querySelectorAll('a')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let href = e.currentTarget.getAttribute('href');
    if(href == 'findId'){
    	const emailInput = document.getElementById('findIdEmail');
    	const resultMsg = document.getElementById('findIdResult');

    	emailInput.value = '';          
    	resultMsg.textContent = '';       
    	resultMsg.style.color = '';  
    	
    	document.getElementById('findIdModal').classList.add('show');
    }else if(href == 'signup'){
      location.href='/sign/signUp';
    }
  })
});

//아이디 비밀번호 찾기 모달 닫기
document.querySelector('#findIdModal .close-btn').addEventListener('click', () => {
	findModal.classList.remove('show');
});

// 아이디 비번 결과창 모달 닫기
document.querySelector('#resultModal .close-btn').addEventListener('click', () => {
	resultModal.classList.remove('show');
});

document.getElementById('findIdSubmit').addEventListener('click', () => {
	  const email = document.getElementById('findIdEmail').value;
	  const result = document.getElementById('findIdResult'); // 이메일 아래 결과 표시 영역
	  const resultTitle = document.getElementById('resultTitle');
	  const resultBody = document.getElementById('resultBody');
	  
	  if (!email) {
	    result.textContent = "이메일을 입력해주세요.";
	    result.style.color = "red";
	    return;
	  }

	  fetch('/sign/findID?email=' + email)
	    .then(response => response.json())
	    .then(data => {
	      if (data.success) {
	    	findModal.classList.remove('show');
		    resultModal.classList.add('show');
	        result.textContent = ""; // 오류 메시지 초기화
	        resultTitle.textContent = "아이디 확인 및 비밀번호 재설정";
	        resultBody.innerHTML = `
	          <p>🧑 아이디: <strong>${data.id}</strong></p>
	          <p>🔐 새 비밀번호를 입력하세요:</p>
	          <div class="pw-wrapper">
	            <input type="password" id="newPassword" placeholder="새 비밀번호" required />
	            <span class="toggle-password fa-solid fa-eye" data-target="newPassword"></span>
	          </div>
	          <div class="pw-wrapper">
	            <input type="password" id="confirmPassword" placeholder="비밀번호 확인" required />
	            <span class="toggle-password fa-solid fa-eye" data-target="confirmPassword"></span>
	          </div>
	          <p id="pwMessage" style="color: red; display: none;"></p>
	          <div class="button-center">
	            <button id="submitPwBtn" class="icon-btn">변경하기</button>
	          </div>
	        `;

	        const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;

	        setTimeout(() => {
	          document.getElementById('submitPwBtn').addEventListener('click', () => {
	            const pw = document.getElementById('newPassword').value;
	            const confirmPw = document.getElementById('confirmPassword').value;
	            const pwMsg = document.getElementById('pwMessage');

	            if (!pwRegex.test(pw)) {
	              pwMsg.textContent = '비밀번호는 영문 대/소문자, 숫자 포함 8~16자여야 합니다.';
	              pwMsg.style.display = 'block';
	              return;
	            }

	            if (pw !== confirmPw) {
	              pwMsg.textContent = '비밀번호가 일치하지 않습니다.';
	              pwMsg.style.display = 'block';
	              return;
	            }

	            fetch('/sign/resetPassword', {
	              method: 'POST',
	              headers: { 'Content-Type': 'application/json; charset=utf-8' },
	              body: JSON.stringify({ pw: pw, email: email })
	            })
	              .then(res => res.json())
	              .then(data => {
	                if (data.success) {
	                  alert('비밀번호가 변경되었습니다.');
	                  resultTitle.textContent = '';
	                  resultBody.innerHTML = '';
	                } else {
	                  alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
	                }
	              })
	              .catch(err => {
	                console.error(err);
	                alert('요청 중 오류가 발생했습니다.');
	              });
	          });
	        }, 0);
	      } else {
	        result.textContent = "해당 이메일로 등록된 회원 정보가 없습니다.";
	        result.style.color = "red";
	      }
	    });
});


// 비밀번호 보기/숨기기 토글
document.addEventListener('click', function (e) {
	  if (e.target.classList.contains('toggle-password')) {
	    const targetId = e.target.getAttribute('data-target');
	    const input = document.getElementById(targetId);

	    if (input.type === 'password') {
	      input.type = 'text';
	      e.target.classList.remove('fa-eye');
	      e.target.classList.add('fa-eye-slash');
	    } else {
	      input.type = 'password';
	      e.target.classList.remove('fa-eye-slash');
	      e.target.classList.add('fa-eye');
	    }
	  }
	});