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
	
	<div class="scroll-end-overlay" id="scrollEndOverlay">
	  <div class="scroll-end-message">마지막 데이터입니다.</div>
	</div>
	
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
		    <div class="scroll-guide-buttons">
			  <button id="scrollGuideNever">다시 보지 않기</button>
			  <button id="scrollGuideConfirm">확인</button>
			</div>
		  </div>
		</div>
		<div class="filter-container">
		  <div class="filters-row">
		  
		    <select id="fileterTag">
		      <option value="::">태그</option>
		      <option value="헬스키퍼">헬스키퍼</option>
		      <option value="멸치탈출">멸치탈출</option>
		      <option value="프로득근러">프로득근러</option>
		      <option value="유지어터">유지어터</option>
		      <option value="다이어터">다이어터</option>
		    </select>
		    
		    <select id="fileterTime">
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
		
		    <select id="fileterGender">
		      <option value="::">성별</option>
		      <option value="men">남자</option>
		      <option value="women">여자</option>
		    </select>
		
		    <select id="fileterAge">
		      <option value="::">나이</option>
		      <option value="10대">10대</option>
		      <option value="20대">20대</option>
		      <option value="30대">30대</option>
		      <option value="40대 이상">40대 이상</option>
		    </select>
		    
	  		<div class="reset-btn-wrap">
	    		<button type="button" id="resetBtn">초기화</button>
	  		</div>
		  </div>
		</div>
		<h2 class="scroll-title"></h2>
		<div id="sendEmptyMessage" class="empty-message">
		  조건에 만족하는 사람이 없습니다.
		</div>
		<div id="sendWrapper" class="mate-slider-wrapper">
			<section class="mate-scroll-section sendList">
				<c:forEach var="mate" items="${mateList}">
					<div class="mate-item" 
					data-selectuno="${mate.mvo.uno}"
					data-myuno="${user.uno}">
															
					<div class="mate-info" data-selectuno="${mate.mvo.uno}">					
					  <!--"실제 경로로 변경하기 !!!!!!!!!!!!!!!!!!!!!!!! /upload/${mate.dto.fvo.uuid}"-->
					  <img src="" src-data="${mate.dto.fvo.path}${'\\'}${mate.dto.fvo.uuid}_${mate.dto.fvo.fileName}" class="user-icon" />
					  <p class="nickname">${mate.dto.nickname}</p>
					  <p class="tag">#${mate.pvo.tag}</p>
					  <p class="gender">성별 : ${mate.mvo.gender eq 'true' ? '남자' : '여자'}</p>
					  <p class="age">나이 : ${mate.mvo.age}</p>
					  <p class="time">운동시간대 : ${mate.mvo.time}</p>
					  <p class="area">지역 : ${mate.mvo.area}</p>
					</div>
					
					<div class="mate-buttons">
					
					  <c:if test="${mate.checker eq '1'}">
					    <button class="follow-btn following" id="following" data-uno="${mate.mvo.uno}">팔로잉</button>
					  </c:if>
					  <c:if test="${mate.checker eq '0'}">
					    <button class="follow-btn follow" id="follow" data-uno="${mate.mvo.uno}">팔로우</button>
					  </c:if>
							
							
					<button class="send-msg-btn">메일 보내기</button>
					</div>
					
					<!-- 숨김 데이터 -->
					<span class="tag" hidden="true">${mate.pvo.tag}</span>
					<span class="userTag" hidden="true">${user.tag}</span>
					</div>
				</c:forEach>
			</section>
		</div>
		</main>
	</div>
	<jsp:include page="sendMailModal.jsp" />
	<jsp:include page="profileViewModal.jsp" />
	<jsp:include page="../layout/footer.jsp" />
	<script type="text/javascript" src="/resources/js/matePage.js"></script>
	<script type="text/javascript" src="/resources/js/sendMailModal.js"></script>
</body>
</html>