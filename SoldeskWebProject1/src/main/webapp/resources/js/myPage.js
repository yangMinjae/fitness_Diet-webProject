let link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('type','text/css');
link.setAttribute('href','/resources/css/myPage.css');
document.head.appendChild(link);

let nickName =document.querySelector('.profile-nickname');

let yesRadio = document.querySelector('#yesRadio');
let noRadio = document.querySelector('#noRadio');

let favSport = document.querySelector('input[name="favSport"]');
let time = document.querySelector('input[name="time"]');
let showArea = document.querySelector('#showArea');
let intro = document.querySelector('#intro');
let profileImg = document.querySelector('.profile-image');

let isFirstPressed = true;
initialProfileSet();
getUserInfo();
document.querySelectorAll('button')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let btnId = e.currentTarget.getAttribute('id');
    if(btnId=='goMyProfile'){
      console.log("내 프로필 스크롤")
    }else if(btnId=='goMyFriendsMng'){
      console.log("친구리스트")
    }else if(btnId=='goFavList'){
      console.log("즐겨찾기 리스트")
    }else if(btnId=='goFollowList'){
      console.log("팔로우 리스트")
    }else if(btnId=='goFollowerList'){
      console.log("팔로워 리스트")
    }else if(btnId=='editProfile'){
      console.log("프로필 수정")
      if(isFirstPressed){
        firstPressed();
      }else{
        secondPressed();
      }
    }
  })
})

function initialProfileSet(){
  const formElements = document.querySelectorAll('.profile-form input, .profile-form textarea, .profile-form button, .profile-image');
  formElements.forEach(el => {
    if(el.tagName.toLowerCase()=='img'){
      //el.classList.add('imgAbled');
      el.classList.remove('imgAbled');
      el.classList.add('imgDisabled');
      console.log("탔어요");
    }else{
      el.disabled = true;
    }
  });
  nickName = document.querySelector('.profile-nickname');
  nickName.innerText = '초기 닉네임';
}

function getUserInfo(){
  let uno = '1';    // 추후 수정
  fetchGetUserInfo(uno);
}

function fetchGetUserInfo(uno){
  fetch(`/ymj/getProfileInfo`,{
    method : 'post',
    body : uno,
    headers :{
      'Content-Type' : 'text/plain; charset=utf-8'
    }
  })
  .then(res=>res.json())
  .then(json=>{
    console.log(json);
    if(json.mate=='0'){
      noRadio.checked=true;
      yesRadio.checked=false;
    }else if(json.mate=='1'){
      noRadio.checked=false;
      yesRadio.checked=true;
    }
    favSport.value=json.fav;
    showArea.innerText=json.area;
    time.value=json.time;
    intro.value=json.self;
  })
  .catch(err=>console.log(err));
}

function firstPressed(){
  const formElements = document.querySelectorAll('.profile-form input, .profile-form textarea, .profile-form button, .profile-image');
  formElements.forEach(el => {
    if(el.tagName.toLowerCase()=='img'){
      el.classList.remove('imgDisabled');
      el.classList.add('imgAbled');
    }else{
      el.disabled = false;
    }
  });
  isFirstPressed=false;
}

function secondPressed(){
  initialProfileSet();
  isFirstPressed=true;
}