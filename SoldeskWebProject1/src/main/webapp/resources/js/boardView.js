// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/boardView.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

const form = document.forms[0];

document.addEventListener('DOMContentLoaded', () => {
	const likeBtn = document.getElementById('like-btn');
	const unLikeBtn = document.getElementById('unlike-btn');
	const updateBtn = document.getElementById('edit-btn');
	const deleteBtn = document.getElementById('delete-btn');
	
	if(likeBtn){
		likeBtn.addEventListener('click', function(){			  
			  fetch('/board/boardView/love',{
				    method : 'post',
				    body:JSON.stringify({
				      uno : form.uno.value,
				      bno : form.bno.value
				    }),
				    headers : {
				      'Content-Type' : 'application/json; charset=utf-8'
				    }
				  })
				  .then(res=>res.text())
				  .then(text=>{
					  location.href="/board/boardView?bno="+form.bno.value;
				  })
		  });
	}
 
	if(unLikeBtn){
		unLikeBtn.addEventListener('click', function(){			  
			  fetch('/board/boardView/unlove',{
				    method : 'post',
				    body:JSON.stringify({
				      uno : form.uno.value,
				      bno : form.bno.value
				    }),
				    headers : {
				      'Content-Type' : 'application/json; charset=utf-8'
				    }
				  })
				  .then(res=>res.text())
				  .then(text=>{
					  location.href="/board/boardView?bno="+form.bno.value;
				  })
		  });
	}
  	
	if(updateBtn){
		updateBtn.addEventListener('click', () => {
			  location.href = '/board/updateBoard?' + 'bno='+ form.bno.value
		 });
	}	
	
	if(deleteBtn){
		deleteBtn.addEventListener('click', () => {	  
		    if (confirm('정말 삭제하시겠습니까?')) {
		    	
		      form.action='/board/boardView/delete';
		      form.submit();
		    }
		 });
	}  
	
  document.getElementById('list-btn').addEventListener('click', () => {
	  location.href = '/boardList';
  }); 

  document.getElementById('prev-btn').addEventListener('click', function(e) {
	  let bList = JSON.parse(e.target.getAttribute("bList"));
	  let bno = e.target.getAttribute("bno");
	  let index = bList.findIndex(b => b.bno == bno);	

	  if(index-1 < 0){
		  alert('이전 글이 없습니다.');
	  }else{
		  location.href="/board/boardView?bno="+(bList[index - 1].bno);
	  }	  	  
  });

  document.getElementById('next-btn').addEventListener('click', function(e) {
	  let bList = JSON.parse(e.target.getAttribute("bList"));
	  let bno = e.target.getAttribute("bno");
	  let index = bList.findIndex(b => b.bno == bno);	
	  
	  if(index+1 >= bList.length){
		  alert('다음 글이 없습니다.');
	  }else{
		  location.href="/board/boardView?bno="+(bList[index + 1].bno);
	  }	 
  });
});
