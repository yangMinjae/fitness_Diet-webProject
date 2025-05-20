//-----CSS 파일 추가
const CSS_FILE_PATH = ['/resources/css/boardView.css', '/resources/css/profileView.css'];
CSS_FILE_PATH.forEach(css => {
	let linkEle = document.createElement('link');
	linkEle.rel = 'stylesheet';
	linkEle.href = css;
	document.head.appendChild(linkEle);
});

const form = document.forms[0];

document.addEventListener('DOMContentLoaded', () => {
	const likeBtn = document.getElementById('like-btn');
	const unLikeBtn = document.getElementById('unlike-btn');
	const updateBtn = document.getElementById('edit-btn');
	const deleteBtn = document.getElementById('delete-btn');	  
	const nickname = document.getElementById('post-Nickname');
	const popup = document.getElementById('nickname-popup');
	const profileModal = document.getElementById("profileModal");
	
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

  nickname.addEventListener('click', (event) => {
      const rect = nickname.getBoundingClientRect();
      popup.style.top = `${rect.bottom + window.scrollY}px`;
      popup.style.left = `${rect.left + window.scrollX}px`;
      popup.classList.toggle('hidden');
      event.stopPropagation();
  });

  document.addEventListener('click', () => {
      popup.classList.add('hidden');
  });

  popup.addEventListener('click', (e) => e.stopPropagation());
  
 document.querySelectorAll("#nickname-popup li").forEach(function(li) {
	    li.addEventListener('click', function(e) {
	        const id = e.currentTarget.id;  // 더 정확하게는 this.id 도 가능

	        switch(id){
	        case "show-profile" :
	        	console.log("show-profile");
	        	setSelectUno(e.currentTarget.dataset.uno);
	        	profileModal.classList.add("show");
	        	break;
	        case "send-mail" :
	        	console.log("send-mail");
	        	break;
	        }
	        
	    });
  });
  
});
