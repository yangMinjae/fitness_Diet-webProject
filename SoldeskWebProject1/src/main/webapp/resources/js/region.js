// 1. 파일 경로 설정
const CSS_FILE_PATH_REGION = '/resources/css/region.css';
// 2. link 태그 생성
let linkEleRegion = document.createElement('link');
linkEleRegion.rel = 'stylesheet';
linkEleRegion.href = CSS_FILE_PATH_REGION;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEleRegion);

const regionData = {
	"경기도" : [
	    "서울특별시", "인천광역시", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시",
	    "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시",
	    "안양시", "양주시", "여주시", "오산시", "용인시", "의왕시", "의정부시", "이천시",
	    "파주시", "평택시", "포천시", "하남시", "화성시",
	    "가평군", "양평군", "연천군"
	  ],
	  "강원도" : [
	    "강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시",
	    "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"
	  ],
	  "충청북도" : [
	    "제천시", "청주시", "충주시",
	    "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군"
	  ],
	  "충청남도" : [
	    "대전광역시", "세종시", "계룡시", "공주시", "논산시", "당진시", "보령시", "서산시", "아산시", "천안시",
	    "금산군", "부여군", "서천군", "예산군", "청양군", "태안군", "홍성군"
	  ],
	  "전라북도" : [
	    "군산시", "김제시", "남원시", "익산시", "전주시", "정읍시",
	    "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"
	  ],
	  "전라남도" : [
	    "광주광역시", "광양시", "나주시", "목포시", "순천시", "여수시",
	    "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군",
	    "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"
	  ],
	  "경상북도" : [
	    "대구광역시", "경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시",
	    "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"
	  ],
	  "경상남도" : [
	    "부산광역시", "울산광역시", "거제시", "김해시", "밀양시", "사천시", "양산시", "진주시", "창원시", "통영시",
	    "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"
	  ],
	  "제주특별자치도" : [
	    "서귀포시", "제주시"
	  ]
};

const doListElem = document.getElementById("doList");
const siListElem = document.getElementById("siList");
const resultDisplay = document.getElementById("result");
const closeBtnRegoin = document.getElementById("closeBtn");
const modal = document.getElementById("regionModal");
const searchInput = document.getElementById("searchInput");

let selectedDo = '';

// 모달 열기 함수
function openModal() {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // ✨ body 스크롤 방지
  
  // ✅ 초기화 처리
  searchInput.value = "";
  siListElem.innerHTML = "";
  document.querySelectorAll("#doList .item").forEach(i => i.classList.remove("active"));
  selectedDo = "";
}
// 모달 닫기 함수
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = ""; // ✨ 원상복구
}

Object.keys(regionData).forEach(doName => {
  const item = document.createElement("div");
  item.textContent = doName;
  item.className = "item";
  item.onclick = () => {
    selectedDo = doName;
    searchInput.value = "";
    renderSiList(regionData[doName], selectedDo);
    document.querySelectorAll("#doList .item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  };
  doListElem.appendChild(item);
});

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();
  const results = [];

  Object.entries(regionData).forEach(([doName, siList]) => {
    siList.forEach(si => {
      if (si.toLowerCase().includes(keyword)) {
        results.push({ doName, si });
      }
    });
  });

  renderGlobalResults(results);
});

function renderSiList(siList, doName) {
  siListElem.innerHTML = "";
  siListElem.scrollTop = 0;

  siList.forEach(si => {
    const siItem = document.createElement("div");
    siItem.textContent = si;
    siItem.className = "item";
    siItem.onclick = () => {
        document.getElementById("showArea").textContent = `${doName} ${si}`;
        closeModal();
    };
    siListElem.appendChild(siItem);
  });
}

function renderGlobalResults(list) {
	  siListElem.innerHTML = "";
	  siListElem.scrollTop = 0;

	  if (list.length === 0) {
	    siListElem.textContent = "검색 결과가 없습니다.";
	    return;
	  }

	  list.forEach(({ doName, si }) => {
	    const item = document.createElement("div");
	    item.textContent = `${doName} ${si}`;
	    item.className = "item";
	    item.onclick = () => {
	        document.getElementById("showArea").textContent = `${doName} ${si}`;
	        closeModal();
	    };
	    siListElem.appendChild(item);
	  });
}

// 모달 닫기
closeBtnRegoin.onclick = () => {
	closeModal();
};
