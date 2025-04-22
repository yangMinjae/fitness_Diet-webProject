let favBody = document.querySelector('#favBody');
let followBody = document.querySelector('#followBody');
let followerBody = document.querySelector('#followerBody');

let uno = f.uno.value;      // 시큐리티 구현시 수정
getFavList();
getFollowList();
getFollowerList();

function getFavList(){      // 즐겨찾기 목록을 가져와 화면에 표시해주는 함수
  fetch('/ymj/getFavList/'+uno)
  .then(response=>response.json())
  .then(json=>{
    let str = '';
    //console.log(json);
    json.forEach(ele => {
      let nickName = ele.nickname;
      let fvo = ele.fvo;
      let fav = ele.fav;
      let uno = ele.uno;
      
      str+=`<tr>
              <td class="tblImgSection">
                <img src="/resources/img/tag/헬스키퍼.png" class="smallProfileImg" alt="프로필">
              </td>
              <td class="tblNicknameSection">${nickName}</td>
              <td class="tblFollowBtnSection">
                    <button class="followCancelBtn" cancelFollow="${uno}">취소</button>
              </td>
              <td class="tblBtnSection"><button class="favRemoveBtn" cancelFav="${uno}">해제</button></td>
            </tr>`
      // 파일 업로드 시 img태그의 src 변경
    });
    favBody.innerHTML=str;

    document
    .querySelectorAll('.followCancelBtn')
    .forEach(ele=>{
      ele.addEventListener('click',(e)=>{
        let num = e.currentTarget.getAttribute('cancelFollow');
        cancelFollow(num);
      })
    });

    document
    .querySelectorAll('.favRemoveBtn')
    .forEach(ele=>{
      ele.addEventListener('click',(e)=>{
        let num = e.currentTarget.getAttribute('cancelFav');
        removeFav(num);
      })
    });
  })
  .catch(err=>console.log(err));
}

function getFollowList(){      // 즐겨찾기 목록을 가져와 화면에 표시해주는 함수
  fetch('/ymj/getFollowList/'+uno)
  .then(response=>response.json())
  .then(json=>{
    let str = '';
    //console.log(json);
    json.forEach(ele => {
      let nickName = ele.nickname;
      let fvo = ele.fvo;
      let fav = ele.fav;
      let uno = ele.uno;
      if(fav==false){
        str+=
              `<tr>
                  <td class="tblImgSection">
                    <img src="/resources/img/tag/헬스키퍼.png" class="smallProfileImg"
                      alt="프로필">
                  </td>
                  <td class="tblNicknameSection">${nickName}</td>
                  <td class="tblFollowBtnSection">
                    <button class="followCancelBtn" cancelFollow="${uno}">취소</button>
                  </td><td class="tblFollowBtnSection">
                    <button class="addFavBtn" addFav="${uno}">추가</button>
                  </td>
              </tr>`;     
      }
      // 파일 업로드 시 img태그의 src 변경
    });
    followBody.innerHTML=str;

    document
    .querySelectorAll('.followCancelBtn')
    .forEach(ele=>{
      ele.addEventListener('click',(e)=>{
        let num = e.currentTarget.getAttribute('cancelFollow');
        cancelFollow(num);
      })
    });

    document
    .querySelectorAll('.addFavBtn')
    .forEach(ele=>{
      ele.addEventListener('click',(e)=>{
        let num = e.currentTarget.getAttribute('addFav');
        addFav(num);
      })
    });

  })
  .catch(err=>console.log(err));
}

function getFollowerList(){      // 팔로워 목록을 가져와 화면에 표시해주는 함수
  fetch('/ymj/getFollowerList/'+uno)
  .then(response=>response.json())
  .then(json=>{
    let str = '';
    //console.log(json);
    json.forEach(ele => {
      let nickName = ele.nickname;
      let fvo = ele.fvo;
      let fav = ele.fav;
      let uno = ele.uno;
      
      str+=`<tr>
							<td class="tblImgSection">
                <img src="/resources/img/tag/헬스키퍼.png" class="smallProfileImg" alt="프로필"></td>
							<td class="tblNicknameSection">${nickName}</td>
              <td class="tblBtnSection"><button class="addFollowBtn" addFollow="${uno}">팔로우</button></button></td>
						</tr>`
      // 파일 업로드 시 img태그의 src 변경
    });
    followerBody.innerHTML=str;
    document
    .querySelectorAll('.addFollowBtn')
    .forEach(ele=>{
      ele.addEventListener('click',(e)=>{
        let num = e.currentTarget.getAttribute('addFollow');
        addFollow(num);
      })
    })
  })
  .catch(err=>console.log(err));
}


function cancelFollow(catcher){            // 팔로우 취소
  fetch('/ymj/cancelFollow',{
    method:'delete',
    body:JSON.stringify({
      thrower:uno,
      catcher:catcher
    }),
    headers : {
      'Content-Type' : 'application/json; charset:utf-8'
    }
  })
  .then(res=>res.text())
  .then(text=>{console.log(text)
    getFavList();
    getFollowList();
    getFollowerList();
  })
  .catch(err=>console.log(err));
}

function addFollow(catcher){               // 팔로우 추가
  fetch('/ymj/addFollow',{
    method:'put',
    body:JSON.stringify({
      thrower:uno,
      catcher:catcher
    }),
    headers : {
      'Content-Type' : 'application/json; charset:utf-8'
    }
  })
  .then(res=>res.text())
  .then(text=>{console.log(text);
    if(text=='fail'){
      alert('이미 팔로우 중인 사람입니다.');
    }
    getFavList();
    getFollowList();
    getFollowerList();
  })
  .catch(err=>console.log(err));
}

function removeFav(catcher){               // 즐겨찾기 해제
  fetch('/ymj/removeFav',{
    method:'delete',
    body:JSON.stringify({
      thrower:uno,
      catcher:catcher
    }),
    headers : {
      'Content-Type' : 'application/json; charset:utf-8'
    }
  })
  .then(res=>res.text())
  .then(text=>{console.log(text)
    getFavList();
    getFollowList();
    getFollowerList();
  })
  .catch(err=>console.log(err));
}

function addFav(catcher){                  // 즐겨찾기 추가
  fetch('/ymj/addFav',{
    method:'put',
    body:JSON.stringify({
      thrower:uno,
      catcher:catcher
    }),
    headers : {
      'Content-Type' : 'application/json; charset:utf-8'
    }
  })
  .then(res=>res.text())
  .then(text=>{console.log(text)
    getFavList();
    getFollowList();
    getFollowerList();
  })
  .catch(err=>console.log(err));
}
