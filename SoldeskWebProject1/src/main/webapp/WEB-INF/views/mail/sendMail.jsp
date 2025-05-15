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
	<jsp:include page="../layout/header.jsp" />
	
	<form method="post">
		<div class="container">
			<div class="receiver">
			  <label for="friend-input">받는 사람 :</label>
			  <div class="custom-dropdown">
			    <input type="text" id="friend-input" placeholder="닉네임 검색" autocomplete="off">
			    <ul id="dropdown-list" class="dropdown-list hidden">
			      <c:forEach var="rmdto" items="${rmdtoList}">
			        <li data-value="${rmdto.receiver}">${rmdto.nickname}</li>
			      </c:forEach>
			    </ul>
			    <input type="hidden" name="receiver" id="receiver-hidden">
			  </div>
			</div>
			
			<div class="message-box">
				<textarea id="message" name="content" placeholder="전달할 내용"></textarea>
			</div>
			
			<div class="text-limit-info">
			  <span id="char-count">0</span>/300자
			</div>
	
			<div class="btn-group">
				<button type="button" class="btn send">전송</button>
				<button type="button" class="btn close">목록</button>
			</div>
		</div>
		<input type="hidden" name="sender" value="${sender}">
	</form>	

	<jsp:include page="../layout/footer.jsp" />
</body>

<script type="text/javascript" src="/resources/js/sendMail.js"></script>
</html>