// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/writeBoard.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

const f = document.forms[0];

// 버튼 클릭 이벤트
document.querySelectorAll('button').forEach(btn=>{
	  btn.addEventListener('click', e=>{
	    let type =btn.getAttribute('class');
	    
      switch(type) {
        // 파일 업로드
        case 'upload-button' :
            console.log("upload-button");
            openFile();
            break;
        // 
        case 'upload-final' : 
            console.log("upload-final");
            break;
        // 목록 페이지로 이동
        case 'list-btn' : 
            console.log("list-btn");
            location.href = '/board/boardList';
            break;
        // 작성완료
        case 'register-btn' : 
            console.log("upload-btn");
            register();
            break;
      }
	  })
	})


// 선택된 식단의 정보 가져오기
document.getElementById("diet").addEventListener("change", function() {
  const selectDiet = this.value;
  console.log("선택한 식단 번호 (dno):" + selectDiet);
  
  const selectedOption = this.options[this.selectedIndex];

  const content = selectedOption.getAttribute("data-content");
  const tag = selectedOption.getAttribute("data-tag");
  const dno = selectedOption.getAttribute("data-dno");
  
  console.log("본문:", content);
  console.log("태그:", tag);
  console.log("식단번호:", dno);
 
  // 본문
  document.getElementById("content").innerHTML = content;
  // 태그
  document.getElementById("tag").value = tag;
  // dno
  document.getElementById("dno").value = dno;
});
	
	

// 업로드 버튼 클릭시 내용 있는지 검증
function register(){
 
  const html = document.getElementById('content').innerHTML;
  document.getElementById('hiddenContent').value = html;
  
  if(!f.title.value){
    alert("제목을 입력해주세요");
    return;
  }
  if(!f.diet.value){
    alert("식단을 선택해주세요");
    return;
  }
  
  f.method= "post";
  f.action= '/board/writeBoard';
  f.submit();
}
// 이미지 업로드 버튼 클릭시 파일 탐색기 연결
function openFile(){
  document.getElementById('imageInput').click();
}

// 파일 선택 시 이미지버튼 생성
function createImageButton(event){
  const files = event.target.files;
  const container = document.getElementById('imageButton');

  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageSrc = e.target.result;

      // 이미지 버튼 만들기
      const button = document.createElement('img');
      button.src = imageSrc;
      button.className = 'imageButton';
      button.dataset.img = imageSrc;


      button.addEventListener('click', function () {
    	  const contentDiv = document.getElementById('content');
    	  contentDiv.innerHTML += `<img src="${this.dataset.img}" alt="이미지">`;
    	  console.log("이미지 버튼 눌림")
      });

      container.appendChild(button);
    };

    reader.readAsDataURL(file);
  });
  
} 
document.getElementById('imageInput').addEventListener('change', createImageButton);
