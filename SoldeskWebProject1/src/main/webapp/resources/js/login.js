// 스타일 링크-----------------------------------------
let link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('href','/resources/css/login.css');
document.head.appendChild(link);
//----------------------------------------------------

const regExpId = /^[a-z]+[0-9a-z]{3,12}$/;	// 아이디 검증 정규식
const regExpPw = /^[0-9a-zA-Z]{8,16}$/;		  // 비밀번호 검증 정규식
const regIsNum = /^\d+$/;                   // 숫자 확인 정규식

let f = document.forms[0];
let btnSubmit = document.querySelector('.login-submit');
console.log(btnSubmit);
document
.querySelectorAll('a')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let href = e.currentTarget.getAttribute('href');
    if(href == 'findId'){
      console.log('아이디 찾기');
    }
    else if(href == 'findPw'){
      console.log('비밀번호 찾기');
    }else if(href == 'signup'){
      console.log('회원가입');
    }
  })
});

btnSubmit.addEventListener('click', (e)=>{
  console.log('로그인 버튼');
  if(!regExpId.test(f.username.value)){
    alert('올바른 형식의 아이디를 입력해주세요\n(숫자와 영소문자로만 구성된 3~12자)');
    f.username.focus();
    return;
  }
  if(!regExpPw.test(f.password.value)){
    alert('올바른 형식의 비밀번호를 입력해주세요\n(숫자와 영문자로만 구성된 8~16자)');
    f.password.focus();
    return;
  }
  login();
})

function login(){
  fetch('/ymj/login',{
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
      location.href='/jsh/main';
    }
  })
}