// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/boardList.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

//버튼 이벤트 추가
document.querySelectorAll('button').forEach(button=>{
	button.addEventListener("click", function(e){		
		let type = e.target.getAttribute('class');
		
		if (type === 'allList') {            // 전체 게시글

		    fetch('/board/getAllBoardList')
		        .then(response => {
		            if (!response.ok) {
		                throw new Error(`HTTP 오류! 상태: ${response.status}`);
		            }
		            return response.json();
		        })
		        .then(data => {
		            console.log("전체 게시글:", data); 
		            getAllBoardList(data); 
		        })
		        .catch(error => {
		            console.error("게시글 불러오기 실패:", error);
		        });
	
		}else if(type === 'dieter'){	
			console.log("dieter");
			getBoardListByTag("다이어터");
		}else if(type === 'escapeAnchovy'){
			console.log("escapeAnchovy");
			getBoardListByTag("멸치탈출");
		}else if(type === 'maintenance'){
			console.log("maintenance");
			getBoardListByTag("유지어터");
		}else if(type === 'Professional'){
			console.log("Professional");
			getBoardListByTag("프로득근러");
		}else if(type === 'healthKeeper'){
			console.log("healthKeeper");
			getBoardListByTag("헬스키퍼");
		}else if(type === 'listByLike'){
			console.log("listByLike");
			getBoardListByLove();
		}else if(type === 'writePostBtn'){
			console.log("writePostBtn");
			
			//const sessionUno = sessionStorage.getItem('uno'); //세션에서 받아온 uno
				
				
			//let senddata = 'uno=' + sessionUno; 
			
		   location.href ='/board/writeBoard?uno=3';
		}
		
	});
});

// 전체리스트보여주기 (버튼눌렀을때 비동기로)
function getAllBoardList(posts) {
	const allList = document.getElementById("postList");
	allList.innerHTML = ""; // 기존 내용 초기화
	
	let str = '';  

	posts.forEach(post => {
		const formattedDate = new Date(post.regdate).toLocaleDateString('ko-KR');
		str += 
			`
				<tr>
					<td>
						<a href="/board/${post.title}">${post.title}</a> [#${post.tag}]
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

// 태그에 맞춰서 보여주기
function getBoardListByTag(tag) {
	fetch(`/board/boardList/${tag}`)  
			.then(response => {
					if (!response.ok) {
							throw new Error(`HTTP 오류! 상태: ${response.status}`);
					}
					return response.json();
			})
			.then(data => {
					console.log(`#${tag} 게시글:`, data);
					getAllBoardList(data); 
			})
			.catch(error => {
					console.error(`#${tag} 게시글이 없습니다:`, error);
			});
}


// 좋아요 누른 게시글 
function getBoardListByLove(uno){
	   fetch(`/board/boardList/love`)
       .then(response => {
           if (!response.ok) {
               throw new Error(`HTTP 오류! 상태: ${response.status}`);
           }
           return response.json();
       })
       .then(data => {
           console.log("좋아요 누른 게시글:", data);
           getAllBoardList(data);  
       })
       .catch(error => {
           console.error("좋아요 누른 게시글 불러오기 실패:", error);
       });
}

document.querySelectorAll('a').forEach(a=>{
	a.addEventListener("click", function(e){
		e.preventDefault();
		
		let href = e.target.getAttribute('href');

		location.href="/board/boardView?bno="+href;
	});
});
