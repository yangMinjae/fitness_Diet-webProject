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
				<label for="friend-search">받는 사람 :</label> 
				<select id="friend-search">
					<c:forEach var="rmdto" items="${rmdtoList}">					
						<option value="${rmdto.receiver}">${rmdto.nickname}</option>
					</c:forEach>
				</select>
			</div>
			
			<div class="message-box">
				<textarea id="message" name="content" placeholder="전달할 내용"></textarea>
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