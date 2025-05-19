// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/boardList.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

let allPosts = [];  
let filteredPosts =[];  
let currentPage = 1;
const pageSize = 10;
//버튼 이벤트 추가
document.querySelectorAll('button').forEach(btn => {
	  btn.addEventListener('click', e => {
	    let type = btn.getAttribute('class');

	    switch (type) {
	      // 파일 업로드
	      case 'allList':
	    	  fetch('/board/getAllBoardList')
				.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP 오류! 상태: ${response.status}`);
					}
					return response.json();
				})
				.then(data => {
					getAllBoardList(data);
				})
				.catch(error => {
					console.error("게시글 불러오기 실패:", error);
				});
	        break;
	      case 'dieter':
	    	  getBoardListByTag("다이어터");
	        break;
	      case 'escapeAnchovy':
	    	  getBoardListByTag("멸치탈출");
	        break;
	      case 'maintenance':
	    	  getBoardListByTag("유지어터");
	        break;
	      case 'Professional':
	    	  getBoardListByTag("프로득근러");
	        break; 
	      case 'healthKeeper':
	    	  getBoardListByTag("헬스키퍼");
	        break; 
	      case 'listByLike':
				console.log("listByLike");
				getBoardListByLove();
	        break; 
	      case 'writePostBtn':
	    	  checkHasDiet();
	        break;  
	    }
	  })
	})
// 전체리스트보여주기 (버튼눌렀을때 비동기로)
	function getAllBoardList(posts) {
   allPosts = posts;
	 filteredPosts = [...allPosts]; 
   currentPage = 1;
   renderPage(currentPage);      // 현재 페이지 렌더
   renderPagination();           // 페이지 버튼 렌더
}


// 태그에 맞춰서 보여주기(비동기)
function getBoardListByTag(tag) {
	   fetch(`/board/boardList/${tag}`)
	      .then(response => {
	         if (!response.ok) {
	            throw new Error(`HTTP 오류! 상태: ${response.status}`);
	         }
	         return response.json();
	      })
	      .then(data => {
	         allPosts = data;
	         filteredPosts = [...allPosts];
	         currentPage = 1;
	         renderPage(currentPage);
	         renderPagination();
	      })
	      .catch(error => {
	         console.error(`#${tag} 게시글이 없습니다:`, error);
	      });
	}



// 좋아요 누른 게시글  (비동기)
function getBoardListByLove() {
	   fetch(`/board/boardList/love`)
	      .then(response => {
	         if (!response.ok) {
	            throw new Error(`HTTP 오류! 상태: ${response.status}`);
	         }
	         return response.json();
	      })
	      .then(data => {
	         allPosts = data;
	         filteredPosts = [...allPosts];
	         currentPage = 1;
	         renderPage(currentPage);
	         renderPagination();
	      })
	      .catch(error => {
	         console.error("좋아요 누른 게시글 불러오기 실패:", error);
	      });
	}

// 날짜 형식 바꾸기
function formatDateToYMD(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	return `${year}-${month}-${day}`;
}


// 게시글 작성 하러 갈때 dno 있는지 확인하고 없으면 설문하러 갈건지 confirm
function checkHasDiet() {
	fetch("/board/writeBoard/checkHasDiet", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(res => res.json())
		.then(length => {
			if(length == 0){				
				if(document.querySelector('#isLogin')) {
					if(confirm("설문을 진행해야 게시글을 작성할 수 있습니다.\n설문을 진행하시겠습니까?")) {
						location.href = "/survey";
						return;
					}
					else{
						location.href = "/boardList";
						return;
					}
				}
			}

			location.href = "/board/writeBoard";
		})
		.catch(err => {
			console.log(err);
		});

}

// --------------------페이징 ----------------------------
function movePageByNum(pageNum) {
    console.log("비동기 페이지 번호:", pageNum);
    currentPage = pageNum;
    renderPage(currentPage);
    renderPagination(); // 버튼 갱신
}

// 페이지 기준으로 뿌리기
function renderPage(pageNum) {
	   const start = (pageNum - 1) * pageSize;
	   const end = start + pageSize;
	   const pagePosts = filteredPosts.slice(start, end);

	   const allList = document.getElementById("postList");
	   allList.innerHTML = "";

	   let str = '';
	   pagePosts.forEach(post => {
	      const formattedDate = formatDateToYMD(post.regdate);
	      str += `
	         <tr>
	            <td>
	               <a href="/board/boardView?bno=${post.bno}" class="title-cell" >${post.title}</a> [#${post.tag}]
	            </td>
	            <td>${post.nickname}</td>
	            <td>${formattedDate}</td>
	            <td>${post.hit}</td>                  
	            <td>${post.love}</td>
	         </tr>
	      `;
	   });

	   allList.innerHTML = str;
	}
// 페이지 이동 버튼 생성
function renderPagination() {
	   const totalPages = Math.ceil(filteredPosts.length / pageSize);
	   const paginationDiv = document.querySelector(".page-btn");

	   let html = '';

	   if (currentPage > 1) {
	      html += `<button class="movePageByNum" data-page="${currentPage - 1}">< 이전 </button>`;
	   }

	   for (let i = 1; i <= totalPages; i++) {
	      html += `<button class="movePageByNum ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
	   }

	   if (currentPage < totalPages) {
	      html += `<button class="movePageByNum" data-page="${currentPage + 1}">다음 ></button>`;
	   }

	   paginationDiv.innerHTML = html;

	   document.querySelectorAll(".movePageByNum").forEach(btn => {
	        btn.addEventListener("click", function () {
	            const page = parseInt(btn.dataset.page); 
	            movePageByNum(page);  
	        });
	    });
	}
// 페이지 로드 되었을때 자동으로 전체버튼 누르게하기
document.addEventListener("DOMContentLoaded", () => {

    const allBtn = document.querySelector("button.allList");
    if (allBtn) {
        allBtn.click(); 
    }
});


//--------------------검색--------------

function search() {
	const searchType = document.getElementById("searchType");
	const searchInput = document.getElementById("searchBox");
	const searchBtn = document.getElementById("search-btn");

	if (!searchInput || !searchBtn || !searchType) return;
	searchBtn.addEventListener("click", () => {
		const type = searchType.value;  
		const keyword = searchInput.value.trim().toLowerCase();

		// 필터링 수행
		filteredPosts = allPosts.filter(post => {
			const value = post[type].toLowerCase();
			return value.includes(keyword);
		});

		currentPage = 1;
		renderPage(currentPage);
		renderPagination();
	});
}
document.addEventListener("DOMContentLoaded", () => {
	const allBtn = document.querySelector("button.allList");
	if (allBtn) allBtn.click();

	search(); 
});




