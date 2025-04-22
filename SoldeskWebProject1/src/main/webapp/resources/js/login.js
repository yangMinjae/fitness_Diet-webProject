// 스타일 링크-----------------------------------------
let link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('href','/resources/css/login.css');
document.head.appendChild(link);
//----------------------------------------------------

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
  login();
})
