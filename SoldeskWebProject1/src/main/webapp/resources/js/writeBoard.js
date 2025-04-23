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
        // 파일 업로드는 아직 
        case 'upload-button' :
            console.log("upload-button");
            break;
        // 구상이 제대로 되지 않았으니
        case 'upload-button' : 
            console.log("upload-button");
            break;
        // 정리 후에 어떻게든 해야지
        case 'upload-final' : 
            console.log("upload-final");
            break;
        // 목록 페이지로 이동
        case 'list-btn' : 
            console.log("list-btn");
            location.href = '/cjs/boardList';
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

  console.log("본문:", content);
  console.log("태그:", tag);

  // 본문 
  document.getElementById("content").value = content;
  // 태그 
  document.getElementById("tag").value = tag;
});

// 업로드 버튼 클릭시 내용 있는지 검증
function register(){
  if(!f.title.value){
    alert("제목을 입력해주세요");
    return;
  }
  if(!f.diet.value){
    alert("식단을 선택해주세요");
    return;
  }
  console.log(f.dno.value);
  console.log(f.uno.value);
  console.log(f.title.value);
  console.log(f.content.value);

  
  
//  f.action= '/cjs/writeBoard';
//  f.submit();
}