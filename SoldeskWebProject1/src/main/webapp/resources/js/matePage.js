const CSS_FILE_PATH = '/resources/css/matePage.css';
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.href = CSS_FILE_PATH;
document.head.appendChild(linkEle);

// 프로필 선택 시 모달 창
document.querySelectorAll('.mate-item').forEach( a => {
	a.addEventListener('click', b =>{
		console.log('modal');
	});
});

// 필터링
document.addEventListener("DOMContentLoaded", function () {
	  const timeFilter = document.getElementById("time");
	  const genderFilter = document.getElementById("gender");
	  const ageFilter = document.getElementById("age");
	  const mateItems = document.querySelectorAll(".mate-item");
	  function applyFilters() {
	    const selectedTime = timeFilter.value;
	    const selectedGender = genderFilter.value;
	    const selectedAge = ageFilter.value;

	    mateItems.forEach(item => {
	      const itemTime = item.dataset.time;
	      const itemGender = item.dataset.gender;
	      let gender = '';
	      const itemAge = item.dataset.age;
	      if(itemGender === 'true'){
	    	  gender = 'men';
	      }else{
	    	  gender = 'women';
	      }
	      
	      console.log(gender);
	      console.log(selectedGender);
	      const matchTime = (selectedTime === "::" || selectedTime === "" || itemTime === selectedTime);
	      const matchGender = (selectedGender === "::" || selectedGender === "" || gender === selectedGender);
	      const matchAge = (selectedAge === "::" || selectedAge === "" || itemAge === selectedAge);

	      if (matchTime && matchGender && matchAge) {
	        item.style.display = "block";
	      } else {
	        item.style.display = "none";
	      }
	    });
	  }

	  // 이벤트 연결
	  timeFilter.addEventListener("change", applyFilters);
	  genderFilter.addEventListener("change", applyFilters);
	  ageFilter.addEventListener("change", applyFilters);
	});

// // 페이징
// function loadPage(pageNumber) {
// // AJAX 요청을 통해 데이터를 가져옵니다.
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "/your-endpoint?page=" + pageNumber, true);
// xhr.onreadystatechange = function() {
// if (xhr.readyState === 4 && xhr.status === 200) {
// // 서버로부터 데이터를 받았을 때
// var response = JSON.parse(xhr.responseText);
//
// // 페이징 정보 업데이트
// updatePagination(response.totalPages, response.currentPage);
//
// // 콘텐츠 업데이트
// updateContent(response.content);
// }
// };
// xhr.send();
// }
//
// function updatePagination(totalPages, currentPage) {
// var pagination = document.getElementById("pagination");
// var paginationHTML = "";
//
// // 이전 버튼
// if (currentPage > 1) {
// paginationHTML += `<a href="javascript:void(0);" class="page-btn"
// onclick="loadPage(${currentPage - 1})">이전</a>`;
// }
//
// // 페이지 번호들
// for (var i = 1; i <= totalPages; i++) {
// paginationHTML += `<a href="javascript:void(0);" class="page-btn ${i ==
// currentPage ? 'active' : ''}" onclick="loadPage(${i})">${i}</a>`;
// }
//
// // 다음 버튼
// if (currentPage < totalPages) {
// paginationHTML += `<a href="javascript:void(0);" class="page-btn"
// onclick="loadPage(${currentPage + 1})">다음</a>`;
// }
//
// // 페이지 번호 업데이트
// pagination.innerHTML = paginationHTML;
// }
//
// function updateContent(content) {
// var contentContainer = document.getElementById("content-container");
// contentContainer.innerHTML = ""; // 기존 콘텐츠 삭제
//
// content.forEach(function(item) {
// var contentItem = document.createElement("div");
// contentItem.classList.add("content-item");
// contentItem.innerHTML = item; // 서버에서 받은 콘텐츠
// contentContainer.appendChild(contentItem);
// });
// }
