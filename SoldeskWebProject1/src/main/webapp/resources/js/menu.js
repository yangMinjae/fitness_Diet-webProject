document.querySelectorAll('a').forEach(a=>{
	a.addEventListener("click", function(e){
		e.preventDefault();
		
		let href = e.target.getAttribute('href');

		switch(href){
			case 'mainPage' :
				console.log("mainPage");
				//location.href = '/';
				break;
			case 'testPage' :
				console.log("testPage");
				break;
			case 'boardPage' :
				console.log("boardPage");
				break;
			case 'matePage' :
				console.log("matePage");
				break;
		}
	});
});

document.querySelectorAll('p').forEach(p=>{
	p.addEventListener("click", function(e){		
		let id = e.target.getAttribute('id');

		switch(id){
			case 'myPage' :
				console.log("myPage");
				//location.href = '/';
				break;
			case 'modifyPage' :
				console.log("modifyPage");
				break;
			case 'logout' :
				console.log("logout");
				break;
		}
	});
});

document.querySelectorAll('img').forEach(img=>{
	img.addEventListener("click", function(e){		
		let alt = e.target.getAttribute('alt');

		switch(alt){
			case 'mailPage' :
				console.log("mailPage");
				//location.href = '/';
				break;
		}
	});
});

document.querySelectorAll('button').forEach(button=>{
	button.addEventListener("click", function(e){		
		let name = e.target.getAttribute('class');

		switch(name){
			case 'login-btn' :
				console.log("login-btn");
				//location.href = '/';
				break;
		}
	});
});