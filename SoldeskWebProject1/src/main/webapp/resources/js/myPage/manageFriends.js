let favBody = document.querySelector('#favBody');
let followBody = document.querySelector('#followBody');
let followerBody = document.querySelector('#followerBody');

let uno = f.elements['uVO.uno'].value;      // 시큐리티 구현시 수정

initFriendsList();							// 최초 로드시 목록 초기화

function getList(type) { 					// 매개변수에 따라 즐겨찾기, follow, follower의
											// 목록을 가져오는 함수
	  const bodyMap = {
	    fav: favBody,
	    follow: followBody,
	    follower: followerBody
	  };

	  const urlMap = {
	    fav: `/myPage/getFavList/${uno}`,
	    follow: `/myPage/getFollowList/${uno}`,
	    follower: `/myPage/getFollowerList/${uno}`
	  };

	  const bodyTarget = bodyMap[type];
	  const url = urlMap[type];

	  fetch(url)
	    .then(res => res.json())
	    .then(json => {
	      let str = '';
	      json.forEach(ele => {
	    	console.log(ele);
			let result = ele.fvo.path.substring(ele.fvo.path.indexOf("\\profile"))+'\\'+ele.fvo.uuid+'_'+ele.fvo.fileName;
			result = result.replace(/\\/g, "/");
	        const { nickname, fav, uno: targetUno } = ele;

	        // 즐겨찾기 된 사람은 팔로우 목록에서 제외
	        if (type === 'follow' && (fav === true || fav === 'true' || fav === 1 || fav === '1')) return;

	        str += `<tr class="hover-card-row clickable-profile">	     
		        		<td class="tblImgSection">
					    	<img src="${result}" class="smallProfileImg" alt="프로필">
					    </td>
					    <td class="tblNicknameSection">
					    	${nickname}
					    </td>`;
	        
	        if (type === 'fav') {
	          str += `<td class="tblFollowBtnSection">
	                    <button class="followCancelBtn" data-catcher="${targetUno}">취소</button>
	                  </td>
	                  <td class="tblBtnSection">
	                    <button class="favRemoveBtn" data-catcher="${targetUno}">해제</button>
	                  </td>`;
	        } else if (type === 'follow') {
	          str += `<td class="tblFollowBtnSection">
	                    <button class="followCancelBtn" data-catcher="${targetUno}">취소</button>
	                  </td>
	                  <td class="tblFollowBtnSection">
	                    <button class="addFavBtn" data-catcher="${targetUno}">추가</button>
	                  </td>`;
	        } else if (type === 'follower') {
	          str += `<td class="tblBtnSection">
	                    <button class="addFollowBtn" data-catcher="${targetUno}">팔로우</button>
	                  </td>`;
	        }

	        str += `</tr>`;
	      });

	      bodyTarget.innerHTML = str;

	      // 버튼 클릭 바인딩 (data-catcher 속성 사용)
	      const bindClick = (selector, action) => {
	        document.querySelectorAll(selector).forEach(ele => {
	          ele.addEventListener('click', e => {
	            const num = e.currentTarget.dataset.catcher;
	            updateFollowOrFav(num, action);
	          });
	        });
	      };

	      if (type !== 'follower') bindClick('.followCancelBtn', 'cancelFollow');
	      if (type === 'fav')       bindClick('.favRemoveBtn', 'removeFav');
	      if (type === 'follow')    bindClick('.addFavBtn', 'addFav');
	      if (type === 'follower')  bindClick('.addFollowBtn', 'addFollow');
	    })
	    .catch(err => console.log(err));
	}

function initFriendsList(){							// 목록을 초기화
	  getList('fav');
	  getList('follow');
	  getList('follower');
}

function updateFollowOrFav(catcher, action) {		// 현재 로그인 중인 사람의 uno와,
													// action(팔로우 추가/취소, 즐찾
													// 추가/해제) 입력시 해당 동작을 처리
	  const url = `/myPage/${action}`;
	  const methodMap = {
	    addFollow: 'put',                           // 팔로우 추가
	    cancelFollow: 'delete',                     // 팔로우 취소
	    addFav: 'put',                              // 즐겨찾기 추가
	    removeFav: 'delete'                         // 즐겨찾기 해제
	  };
	  const method = methodMap[action];

	  if (!method) {
	    console.error('Invalid action:', action);
	    return;
	  }

	  fetch(url, {
	    method: method,
	    body: JSON.stringify({
	      thrower: uno,
	      catcher: catcher
	    }),
	    headers: {
	      'Content-Type': 'application/json; charset=utf-8'
	    }
	  })
	  .then(res => res.text())
	  .then(text => {
	    console.log(text);
	    
	    if (action === 'addFollow' && text === 'fail') {
	      alert('이미 팔로우 중인 사람입니다.');
	    }

      initFriendsList();
	  })
	  .catch(err => console.log(err));
	}

function setupSearch(inputId, tableBodyId) {
	const input = document.getElementById(inputId);
	const tableBody = document.getElementById(tableBodyId);

	if (!input || !tableBody) return;

	input.addEventListener('input', function () {
		const filter = this.value.toLowerCase();
		const rows = tableBody.getElementsByTagName('tr');

		Array.from(rows).forEach(row => {
			const nicknameCell = row.querySelector('td:nth-child(2)');
			const nickname = nicknameCell ? nicknameCell.textContent.toLowerCase() : '';
			row.style.display = nickname.includes(filter) ? '' : 'none';
		});
	});
}

document.addEventListener('DOMContentLoaded', function () {
	setupSearch('searchFav', 'favBody');
	setupSearch('searchFollow', 'followBody');
	setupSearch('searchFollower', 'followerBody');
});

document.addEventListener('DOMContentLoaded', function () {
	  document.querySelectorAll('.listTable').forEach(table => {
	    table.addEventListener('click', function (e) {
	      const clickedRow = e.target.closest('tr');
	      if (!clickedRow) return;

	      const isProfileClick =
	        e.target.closest('.tblImgSection') || e.target.closest('.tblNicknameSection');

	      if (isProfileClick) {
	        const nickname = clickedRow.querySelector('.tblNicknameSection').innerText.trim();
	        alert(`프로필 클릭됨: ${nickname}`);
	      }
	    });
	  });
});