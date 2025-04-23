<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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

			<form class="login-form" action="loginProcess.jsp" method="post">
				<input type="text" name="username" placeholder="아이디" required>
				<input type="password" name="password" placeholder="비밀번호" required>

				<div class="helper-links">
					<a href="findId">아이디 찾기</a> | <a href="findPw">비밀번호 찾기</a> | <a
						href="signup">회원가입</a>
				</div>

				<input type="button" class="login-submit" value="로그인">
			</form>
		</div>
	</div>
	<jsp:include page="../jsh/findID.jsp" />
	<jsp:include page="../jsh/resultFindID.jsp" />
	<jsp:include page="../layout/footer.jsp" />
</body>
	<script type="text/javascript" src="/resources/js/login.js"></script>
</html>