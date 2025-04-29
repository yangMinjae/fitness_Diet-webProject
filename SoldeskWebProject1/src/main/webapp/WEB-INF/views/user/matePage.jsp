<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>운동메이트 찾기</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />

	<h1 style="align-content: center;">운동메이트 찾기</h1>
	<!-- 왼쪽 리모컨 스타일 사이드바 -->
	<div class="floating-sidebar">
		<button class="menu-section" id="sendTag">동일 태그</button>
		<button class="menu-section" id="difTag">그 외 태그</button>
	<div class="form-group"> 
		<label for="time">운동 시간대</label> 
		<select id="time">
			<option value="::">:시간:</option>
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
	</div>
	<div class="form-group">
		<label for="gender">성별</label> 
		<select id="gender">
			<option value="::">:성별:</option>
			<option value="men">남자</option>
			<option value="women">여자</option>
		</select>
	</div>
	<div class="form-group">
		<label for="age">나이</label> 
		<select id="age">
			<option value="::">:나이:</option>
			<option value="10대">10대</option>
			<option value="20대">20대</option>
			<option value="30대">30대</option>
			<option value="40대">40대</option>
			<option value="50대">50대</option>
			<option value="60대">60대</option>
		</select>
	</div>
	</div>
	<main>

	<section class="sendList">
	<c:set var="check" value="false" />
	<c:forEach var="mate" items="${mateList}">
		<c:if test="${mate.pvo.tag eq user.tag}">
			<c:set var="check" value="true" />
			<div id="eqTag" class="mate-item" data-time="${mate.mvo.time}"
							data-gender="${mate.mvo.gender}" data-age="${mate.mvo.age}">
				<!--"실제 경로로 변경하기 !!!!!!!!!!!!!!!!!!!!!!!! /upload/${mate.dto.fvo.uuid}"-->
				<img
					src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
					class="user-icon" /> <span class="nickname">${mate.dto.nickname}</span>
				<span class="preview">
					<div class="userTag"># ${mate.pvo.tag}</div> 
					<span class="userTime">운동시간대 : </span>${mate.mvo.time} &emsp; 
					<c:if test="${mate.mvo.gender eq 'true'}">
						<span class="title">성별 : </span>
						<span class="userGender">남자</span>	&emsp;
					</c:if> 
					<c:if test="${mate.mvo.gender eq 'false'}">
						<span class="title">성별 : </span>
						<span class="userGender">여자</span>	&emsp;
					</c:if> &emsp; 
					<span class="userArea">지역 : </span>${mate.mvo.area} &emsp; 
					<span class="userAge">나이 : </span>${mate.mvo.age}
				</span>
				<span class="uno" hidden="true">${mate.mvo.uno}</span>
			</div>
		</c:if>
	</c:forEach>
	
	<c:if test="${check eq false}">
		<h1>동일한 태그를 가진 사람이 없습니다.</h1>
	</c:if>
	</section>
	
	<section class="difList">
	<p> 그 외 태그 ----------------------------------------------------------------</p>
	
	<c:forEach var="mate" items="${mateList}">
		<c:if test="${mate.pvo.tag ne user.tag}">
			<div id="neTag" class="mate-item" data-time="${mate.mvo.time}"
							data-gender="${mate.mvo.gender}" data-age="${mate.mvo.age}">
				<!--"실제 경로로 변경하기 !!!!!!!!!!!!!!!!!!!!!!!! /upload/${mate.dto.fvo.uuid}"-->
				<img
					src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
					class="user-icon" /> <span class="nickname">${mate.dto.nickname}</span>
				<span class="preview">
					<div class="userTag"># ${mate.pvo.tag}</div> 
					<span class="userTime">운동시간대 : </span>${mate.mvo.time} &emsp; 
					<c:if test="${mate.mvo.gender eq 'true'}">
						<span class="title">성별 : </span>
						<span class="userGender">남자</span>	&emsp;
					</c:if> 
					<c:if test="${mate.mvo.gender eq 'false'}">
						<span class="title">성별 : </span>
						<span class="userGender">여자</span>	&emsp;
					</c:if> &emsp; 
					<span class="userArea">지역 : </span>${mate.mvo.area} &emsp; 
					<span class="userAge">나이 : </span>${mate.mvo.age}
					<span class="uno" hidden="true">${mate.mvo.uno}</span>
				</span>
			</div>
		</c:if>
	</c:forEach>
	</section>
	</main>
	
	<jsp:include page="profile.jsp" />
	<jsp:include page="../layout/footer.jsp" />
	<script type="text/javascript" src="/resources/js/matePage.js"></script>
</body>
</html>