<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="layout/header.jsp" />
	<main>
		<section class="section survey-gallery">
		  <div class="image-grid">
		    <div class="image-box">
		      <img src="/resources/img/ditecat.jpg" alt="식단 이미지">
		      <div class="overlay">
		        <h4>식단</h4>
		        <p>사용자의 목표에 맞는 최적의 식단을 추천합니다. <br>
		        	건강한 식습관을 유지하고, 필요한 영양소를 충족할 수 있도록 도와드립니다.</p>
		      </div>
		    </div>
		    <div class="image-box">
		      <img src="/resources/img/healthcat.jpg" alt="운동 이미지">
		      <div class="overlay">
		        <h4>운동</h4>
		        <p>선호하는 운동 종류에 맞춰 운동 계획을 제시합니다. <br>
		        	운동 강도와 빈도를 조정하여 목표 달성을 돕습니다.</p>
		      </div>
		    </div>
		    <div class="image-box">
		      <img src="/resources/img/advicecat.jpg" alt="조언 이미지">
		      <div class="overlay">
		        <h4>조언</h4>
		        <p>건강 관리와 운동에 관한 유용한 팁과 조언을 제공합니다. <br>
		        	올바른 자세와 기술로 더 나은 결과를 얻을 수 있습니다.</p>
		      </div>
		    </div>
		  </div>
		
		  <button class="cta-button">설문 조사 페이지 이동</button>
		</section>


		<section class="section">
		  <!-- 운동메이트 찾기 기능 (왼쪽에 이미지, 오른쪽에 설명) -->
		  <div class="mate-finding">
		    <div class="mate-finding-item">
		      <img src="/resources/img/matecat.jpg" alt="운동메이트 찾기 이미지" class="mate-image left">
		      <div class="mate-text">
		        <h3>운동메이트 찾기</h3>
		        <p>이 기능은 사용자의 사는 지역, 선호하는 운동, 나이대에 맞춰 최적의 운동 메이트를 찾아주는 서비스입니다. <br>
		        	운동을 함께 할 친구를 찾고 싶다면, 이 기능을 통해 적합한 파트너를 만날 수 있습니다.</p>
		      </div>
		    </div>
		  </div>
		
		  <!-- 게시판 설명 (왼쪽에 설명, 오른쪽에 이미지) -->
		  <div class="board-description">
		    <div class="board-item">
		      <div class="board-text">
		        <h3>게시판</h3>
		        <p>게시판은 운동 목적에 따라 구분되어 있습니다. <br>
		        	각 게시글은 회원들이 제공받은 식단을 토대로 한 운동 결과나 반응을 공유하는 공간입니다. <br>
		        	여러분의 경험을 나누고 다른 사람들의 피드백을 받을 수 있습니다.</p>
		      </div>
		      <img src="/resources/img/boardcat.jpg" alt="게시판 이미지" class="board-image right">
		    </div>
		  </div>
		</section>
		
		<section class="interactive-gallery">
		  <div class="thumbnail-row">
		    <img src="/resources/img/tag/다이어터.png" alt="item1" class="thumb" data-title="다이어터" data-desc="둥글둥글했던 시절은 안녕~ <br>건강한 식단과 운동으로 변화 중인 판다, 다이어터!<br>천천히지만 꾸준하게,이제는 몸도 마음도 가벼워지는 중입니다.">
		    <img src="/resources/img/tag/멸치탈출.png" alt="item2" class="thumb" data-title="멸치탈출" data-desc="바람에도 흔들리던 말랐던 시절은 그만! <br>잘 먹고, 제대로 운동하며탄탄한 몸을 향해 달려가는 성장형 캐릭터, 멸치 탈출!">
		    <img src="/resources/img/tag/유지어터.png" alt="item3" class="thumb" data-title="유지어터" data-desc="지금 이 밸런스, 절대 무너지면 안 돼! <br>몸매 유지가 최우선, 완벽한 루틴을 지키는 스마트한 토끼, 유지어터! <br>한 끼의 유혹보단 한 끗의 유지력이 더 중요해요. <br>식단도, 운동도, 마인드도 꾸준히 오늘도 자기 관리 만렙 갱신 중입니다.">
		    <img src="/resources/img/tag/프로득근러.png" alt="item4" class="thumb" data-title="프로득근러" data-desc="근육은 배신하지 않는다! <br>오늘도 단백질과 중량을 챙기는 근육 집착 호랑이, 프로 득근러! <br>운동은 삶의 일부, 식단은 무기! <br>볼 때마다 더 커지는 어깨처럼, 그의 목표는 딱 하나, 득근!">
		    <img src="/resources/img/tag/헬스키퍼.png" alt="item5" class="thumb" data-title="헬스키퍼" data-desc="빠르진 않아도, 매일 꾸준하게. <br>건강한 습관을 지키는 슬로우&스마트 거북이, 헬스 키퍼! <br>무리하지 않고, 포기하지 않고 식단과 운동의 균형을 지키며 <br>자신만의 속도로 진짜 건강을 만들어갑니다.">
		  </div>
		
		  <div class="main-content">
		    <img src="/resources/img/tag/다이어터.png" alt="메인이미지" id="main-image">
		    <div class="main-text">
		      <h3 id="main-title">다이어터</h3>
		      <p id="main-desc">둥글둥글했던 시절은 안녕~ <br>
		      	건강한 식단과 운동으로 변화 중인 판다, 다이어터! <br>
		      	천천히지만 꾸준하게,이제는 몸도 마음도 가벼워지는 중입니다.</p>
		    </div>
		  </div>	
		</section>
		
		<section class="popular-posts">
		  <h2>인기 게시글</h2>
		  <div class="popular-posts-wrapper">
		    <c:forEach var="hbdto" items="${hbList}">
		      <div class="post-card">
		        <h3>${hbdto.title}</h3>
		        <p>${hbdto.tag}</p>
		        <div class="post-meta">
		          <img src="${hbdto.imgPath}" alt="프로필" />
		          <span>${hbdto.nickname}</span> · 
		          <span>${hbdto.regdate}</span>
		        </div>
		          <span class="bno" hidden="true">${hbdto.bno}</span>
		      </div>
		    </c:forEach>
		  </div>
		</section>
	</main>
	
	<jsp:include page="layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/main.js"></script>
</html>