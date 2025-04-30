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
  document.getElementById('like-btn').addEventListener('click', function(e){
	  let bno = e.target.getAttribute("bno");
	  
	  fetch('/board//boardView/love',{
		    method : 'post',
		    body:JSON.stringify({
		      uno : 3,
		      bno : bno
		    }),
		    headers : {
		      'Content-Type' : 'application/json; charset=utf-8'
		    }
		  })
		  .then(res=>res.text())
		  .then(text=>{
			  location.href="/board/boardView?bno="+bno;
		  })
  });

  document.getElementById('edit-btn').addEventListener('click', () => {
    alert('수정 페이지로 이동합니다.');
  });
  
  document.getElementById('list-btn').addEventListener('click', () => {
	  location.href = '/boardList';
  });


  document.getElementById('delete-btn').addEventListener('click', () => {	  
    if (confirm('정말 삭제하시겠습니까?')) {
    	
    	console.log(form.bno.value);
      form.action='/board/boardView/delete';
      form.submit();
    }
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
