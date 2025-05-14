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
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', e => {
    let type = btn.getAttribute('class');

    switch (type) {
      // 파일 업로드
      case 'upload-button':
        openFile();
        break;
      // 목록 페이지로 이동
      case 'boardList-btn':
        location.href = '/boardList';
        break;
      // 작성완료
      case 'register-btn':
        register();
        break;
    }
  })
})


// 선택된 식단의 정보 가져오기
document.getElementById("diet").addEventListener("change", function () {
  const selectDiet = this.value;
  console.log("식단 이름:" + selectDiet);

  const selectedOption = this.options[this.selectedIndex];

  const content = selectedOption.getAttribute("data-content");
  const tag = selectedOption.getAttribute("data-tag");
  const dno = selectedOption.getAttribute("data-dno");
  const uno = selectedOption.getAttribute("data-uno");
  
  // 본문
  document.getElementById("content").innerHTML = content;
  // 태그
  document.getElementById("tag").value = tag;
  // dno
  document.getElementById("dno").value = dno;
  // uno
  document.getElementById("uno").value = uno;
});

// 업로드 버튼 클릭시 내용 있는지 검증 + 게시글 작성 완료
function register() {
  const html = document.getElementById('content').innerHTML;
  document.getElementById('hiddenContent').value = html;
  
  if (!f.diet.value) {
	    alert("식단을 선택해주세요");
	    return;
	  }
  if (!f.title.value) {
	  	alert("제목을 입력해주세요");
	  	return;
  }
  
 if(f.bno != null){
	 f.action = '/board/updateBoard';
 }else{
	 f.action = '/board/writeBoard';
 }
  f.submit();
}

// 이미지 업로드 버튼 클릭시 파일 탐색기 연결
function openFile() {
  document.getElementById('imageInput').click();
}

// 이미지 리사이즈 후 base64로 변환
function resizeImage(file, maxWidth, maxHeight, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      // 리사이즈된 canvas 생성
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 이미지 비율 계산
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // 이미지를 canvas에 그리기
      ctx.drawImage(img, 0, 0, width, height);

      // 리사이즈된 이미지를 Base64로 변환
      const resizedBase64 = canvas.toDataURL(file.type);
      callback(resizedBase64);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}


// 파일 선택 시 이미지버튼 생성
function createImageButton(event) {
  const files = event.target.files;
  const container = document.getElementById('imageButton');

  Array.from(files).forEach((file) => {
    // 리사이즈 후 Base64로 변환
    resizeImage(file, 500, 500, function (resizedBase64) {
      // 이미지 버튼 만들기
      const button = document.createElement('img');
      button.src = resizedBase64;  // 리사이즈된 이미지의 Base64 사용
      button.className = 'imageButton';
      button.dataset.img = resizedBase64;  // Base64 이미지 저장

      button.addEventListener('click', function () {
        const imgUrl = this.dataset.img;
        insertImgAtCursor(imgUrl);
      });

      container.appendChild(button);
    });
  });
}


// 커서 위치에 이미지 삽입함수
function insertImgAtCursor(imgUrl) {
  const selection = document.getSelection();
  if (!selection || !selection.rangeCount) return;
  const range = selection.getRangeAt(0);

  const contentDiv = document.getElementById('content');
  
  // content 안에만 이미지 삽입
  if (!contentDiv.contains(range.startContainer)) return;

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "이미지";
  img.className= "uploadedImg"

   range.insertNode(img);
  // 이미지 삽입 후 커서 위치 변경
  range.setStartAfter(img);
  range.setEndAfter(img);
  selection.removeAllRanges();
  selection.addRange(range);
}

document.getElementById('imageInput').addEventListener('change', createImageButton);


