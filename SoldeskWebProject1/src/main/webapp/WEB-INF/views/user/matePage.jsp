<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>운동메이트 찾기</title>
</head>
<body class="mate-page">
	<jsp:include page="../layout/header.jsp" />
	<div id="find-profile-modal"></div>
	
	
	<!-- 왼쪽 리모컨 스타일 사이드바 -->
	<div class="page-wrapper">
		<main class="content-main">
		<h1 class="mate-title">운동메이트 찾기</h1>
		<div id="scrollGuideOverlay" class="scroll-guide-overlay">
		  <div class="scroll-guide-content">
		    <div class="scroll-mouse-icon">
			  <svg width="32" height="50" viewBox="0 0 32 50" fill="none" xmlns="http://www.w3.org/2000/svg">
			    <rect x="1" y="1" width="30" height="48" rx="15" stroke="#4d5a63" stroke-width="2"/>
			    <circle cx="16" cy="12" r="3" fill="#4d5a63">
			      <animate attributeName="cy" values="12;18;12" dur="1.2s" repeatCount="indefinite" />
			    </circle>
			  </svg>
			</div>
		    <p class="scroll-guide-text">휠을 위아래로 움직이면 옆으로 이동할 수 있어요!</p>
		    <button id="scrollGuideConfirm">확인</button>
		  </div>
		</div>
		<div class="filter-container">
		  <div class="filters-row">
		    <select id="time">
		      <option value="::">운동시간대</option>
		      <option value="08:00~09:59">08:00~09:59</option>
		      <option value="10:00~11:59">10:00~11:59</option>
		      <option value="12:00~13:59">12:00~13:59</option>
		      <option value="14:00~15:59">14:00~15:59</option>
		      <option value="16:00~17:59">16:00~17:59</option>
		      <option value="18:00~19:59">18:00~19:59</option>
		      <option value="20:00~21:59">20:00~21:59</option>
		      <option value="22:00~23:59">22:00~23:59</option>
		      <option value="00:00~07:59">00:00~07:59</option>
		    </select>
		
		    <select id="gender">
		      <option value="::">성별</option>
		      <option value="men">남자</option>
		      <option value="women">여자</option>
		    </select>
		
		    <select id="age">
		      <option value="::">나이</option>
		      <option value="10대">10대</option>
		      <option value="20대">20대</option>
		      <option value="30대">30대</option>
		      <option value="40대">40대</option>
		      <option value="50대">50대</option>
		      <option value="60대">60대</option>
		    </select>
		  </div>

  		<div class="reset-btn-wrap">
    		<button type="button" id="resetBtn">초기화</button>
  		</div>
		</div>
		<h2 class="scroll-title">동일 태그</h2>
		
		<div class="mate-slider-wrapper">
			<section class="mate-scroll-section sendList">
			<c:set var="check" value="false" />
			<c:forEach var="mate" items="${mateList}">
				<c:if test="${mate.pvo.tag eq user.tag}">
					<c:set var="check" value="true" />
					<div id="eqTag" class="mate-item" data-time="${mate.mvo.time}"
									data-gender="${mate.mvo.gender}" data-age="${mate.mvo.age}">
						<!--"실제 경로로 변경하기 !!!!!!!!!!!!!!!!!!!!!!!! /upload/${mate.dto.fvo.uuid}"-->
						<img src="/resources/img/tag/헬스키퍼.png" class="user-icon" /> 
						<div class="mate-overlay">
						  <p class="nickname">${mate.dto.nickname}</p>
						  <p class="tag">#${mate.pvo.tag}</p>
						  <p>성별 : ${mate.mvo.gender eq 'true' ? '남자' : '여자'}</p>
						  <p>나이 : ${mate.mvo.age}</p>
						  <p>운동시간대 : ${mate.mvo.time}</p>
						  <p>지역 : ${mate.mvo.area}</p>
						</div>
						<span class="uno" hidden="true">${mate.mvo.uno}</span>
					</div>
				</c:if>
			</c:forEach>
			
			<c:if test="${check eq false}">
				<h1>동일한 태그를 가진 사람이 없습니다.</h1>
			</c:if>
			</section>
		</div>
		
		<h2 class="scroll-title">그 외 태그</h2>
		<div class="mate-slider-wrapper">
			<section class="mate-scroll-section difList">
				<c:forEach var="mate" items="${mateList}">
					<c:if test="${mate.pvo.tag ne user.tag}">
						<div id="eqTag" class="mate-item" data-time="${mate.mvo.time}"
									data-gender="${mate.mvo.gender}" data-age="${mate.mvo.age}">
						<!--"실제 경로로 변경하기 !!!!!!!!!!!!!!!!!!!!!!!! /upload/${mate.dto.fvo.uuid}"-->
						<img src="/resources/img/tag/헬스키퍼.png" class="user-icon" /> 
						<div class="mate-overlay">
						  <p class="nickname">${mate.dto.nickname}</p>
						  <p class="tag">#${mate.pvo.tag}</p>
						  <p>성별 : ${mate.mvo.gender eq 'true' ? '남자' : '여자'}</p>
						  <p>나이 : ${mate.mvo.age}</p>
						  <p>운동시간대 : ${mate.mvo.time}</p>
						  <p>지역 : ${mate.mvo.area}</p>
						</div>
						<span class="uno" hidden="true">${mate.mvo.uno}</span>
					</div>
					</c:if>
				</c:forEach>
			</section>
		</div>
		</main>
	</div>
	<jsp:include page="../layout/footer.jsp" />
	<script type="text/javascript" src="/resources/js/matePage.js"></script>
	<script type="text/javascript" src="/resources/js/profileModal.js"></script>
</body>
</html>