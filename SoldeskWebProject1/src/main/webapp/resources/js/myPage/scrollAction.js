let profileSection = document.querySelector('.profile-section')
let friendSection = document.querySelector('.friend-section');
let favSection = document.querySelector('#favList');
let followSection = document.querySelector('#followList');
let followerSection = document.querySelector('#followerList');

document.querySelectorAll('button')
.forEach(ele=>{
  ele.addEventListener('click',(e)=>{
    let btnId = e.currentTarget.getAttribute('id');
    
    // 스크롤 액션
    if(btnId=='goMyProfile'){
      scrollToTarget(profileSection);
    }else if(btnId=='goMyFriendsMng'){
      scrollToTarget(friendSection);
    }else if(btnId=='goFavList'){
      scrollToTarget(favSection);
    }else if(btnId=='goFollowList'){
      scrollToTarget(followSection);
    }else if(btnId=='goFollowerList'){
      scrollToTarget(followerSection);
    //----------------------------------------------
    }
  })
})

function scrollToTarget(ele) {
  const top = ele.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: top,
    behavior: "smooth"
  });
}