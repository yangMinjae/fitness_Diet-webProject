// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/sendMail.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

const form = document.forms[0];

document.querySelectorAll('button').forEach(button=>{
	button.addEventListener("click", function(e){		
		let name = e.target.getAttribute('class');

		switch(name){
			// 전송 버튼
			case 'btn send' :
				console.log("btn send");
				sendMail();
				break;
			// 목록 버튼
			case 'btn close' :
				console.log("btn close");
				break;
		}
	});
});

function sendMail() {
	
	if(!form.content.value)
		return;

	let select = document.getElementById('friend-search');
	
	let hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "receiver");
    hiddenField.setAttribute("value", select.options[select.selectedIndex].value);
    form.appendChild(hiddenField);
    
    form.action = '/jsh/sendMail';
    form.submit();
}