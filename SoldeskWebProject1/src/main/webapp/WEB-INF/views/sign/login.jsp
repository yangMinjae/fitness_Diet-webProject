<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<title>로그인</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />
	<div class="login-wrapper">
		<div class="login-container">
			<h1 class="login-title">로그인</h1>

			<form class="login-form" action="/login" method="post">
				<input type="text" name="username" placeholder="아이디" required>
				<input type="password" name="password" placeholder="비밀번호" required>
				<c:if test="${not empty sessionScope.LOGIN_FAIL_MESSAGE}">
				    <div class="login-error" style="color: red; margin-bottom: 10px;">
				        ${sessionScope.LOGIN_FAIL_MESSAGE}
				    </div>
				    <c:remove var="LOGIN_FAIL_MESSAGE" scope="session" />
				</c:if>
				<div class="helper-links">
					<a href="findId">아이디 / 비밀번호 찾기</a> | <a
						href="signup">회원가입</a>
				</div>

				<input type="submit" class="login-submit" value="로그인">
				<input type="hidden" name="${_csrf.parameterName }" value="${_csrf.token }">
			</form>
		</div>
	</div>
	<jsp:include page="findID.jsp" />
	<jsp:include page="resultFindID.jsp" />
	<jsp:include page="../layout/footer.jsp" />
</body>
	<script type="text/javascript" src="/resources/js/login.js"></script>
</html>