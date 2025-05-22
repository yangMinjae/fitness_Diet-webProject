// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/sendMail.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

const form = document.forms[0];
const textarea = form.content;
const charCount = document.getElementById('char-count');
const MAX_LENGTH = 300;

document.querySelectorAll('button').forEach(button=>{
	button.addEventListener("click", function(e){		
		let name = e.target.getAttribute('class');

		switch(name){
			// 전송 버튼
			case 'btn send' :
				sendMail();
				break;
			// 목록 버튼
			case 'btn close' :
				location.href = '/mailList'
				break;
		}
	});
});

function sendMail() {
  const inputValue = document.getElementById('friend-input').value.trim();
  const hiddenValue = document.getElementById('receiver-hidden').value;
  const list = document.querySelectorAll('#dropdown-list li');
  
  if (!form.content.value.trim()) {
	  alert('내용을 입력하세요.');
	  return;
  }

  //🔍 먼저 입력값과 히든값이 일치하는 닉네임이 존재하는지 확인
  const matched = Array.from(list).some(li =>
    li.textContent.trim() === inputValue && li.dataset.value === hiddenValue
  );

  if (inputValue && !matched) {
    // 입력은 했지만 hiddenValue와 일치하는 닉네임 없음
    alert('!!! 받는 사람을 확인하세요 !!!');
    return;
  }

  if (!hiddenValue) {
    // 입력도 없고 hidden도 없음
    alert('받는 사람을 선택하세요.');
    return;
  }
  
  form.action = '/mail/sendMail';
  form.submit();
}

textarea.addEventListener('input', function () {
  const content = textarea.value;

  if (content.length > MAX_LENGTH) {
    textarea.value = content.slice(0, MAX_LENGTH); // 초과 시 자동 잘림
  }

  charCount.textContent = textarea.value.length;
});

document.addEventListener('DOMContentLoaded', function () {
	  const input = document.getElementById('friend-input');
	  const list = document.getElementById('dropdown-list');
	  const hiddenInput = document.getElementById('receiver-hidden');
	  const items = Array.from(list.querySelectorAll('li'));
	  
	  document.getElementById('friend-input').addEventListener('keydown', function (e) {
		  if (e.key === 'Enter') {
		    e.preventDefault(); // ✅ form 전송 막기
		  }
		});
	  
	  // input 클릭 시 드롭다운 표시
	  input.addEventListener('focus', () => {
	    list.classList.remove('hidden');
	  });

	  // input 입력 시 필터링
	  input.addEventListener('input', function () {
		  const keyword = this.value.toLowerCase();
		  hiddenInput.value = '';

		  if (!keyword) {
		    // 🔁 입력 없으면 전체 목록 표시
		    items.forEach(li => li.style.display = '');
		    return;
		  }

		  let exactMatched = null;

		  items.forEach(li => {
		    const text = li.textContent.toLowerCase();
		    if (text === keyword) {
		      exactMatched = li;
		    }
		  });

		  if (exactMatched) {
		    // ✅ 완전 일치하는 항목만 보여줌
		    items.forEach(li => li.style.display = 'none');
		    exactMatched.style.display = '';
		    
		    hiddenInput.value = exactMatched.dataset.value;
		  } else {
		    // 🔍 포함된 항목 모두 보여줌
		    items.forEach(li => {
		      const text = li.textContent.toLowerCase();
		      li.style.display = text.includes(keyword) ? '' : 'none';
		    });
		    hiddenInput.value = '';
		  }
		});

	  // 항목 클릭 시 input 채우기 + hidden input 설정
	  list.addEventListener('click', function (e) {
	    if (e.target.tagName === 'LI') {
	      input.value = e.target.textContent;
	      hiddenInput.value = e.target.dataset.value;
	      list.classList.add('hidden');
	    }
	  });

	  // 외부 클릭 시 드롭다운 숨김
	  document.addEventListener('click', function (e) {
	    if (!e.target.closest('.custom-dropdown')) {
	      list.classList.add('hidden');
	    }
	  });
	});