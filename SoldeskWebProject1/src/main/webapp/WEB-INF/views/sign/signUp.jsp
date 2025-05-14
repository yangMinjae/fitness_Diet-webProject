<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />

	<section class="bg-light">
		<div class="container-sm">
			<!-- 타이틀 -->
			<div class="text-center mb-5">
				<h2 class="join-title">회원가입</h2>
			</div>

			<form class="needs-validation" novalidate>
				<!-- 아이디 -->
				<div class="form-row">
					<label for="mId" class="form-label">아이디</label> <input type="text"
						class="form-control" id="mId" name="mId"
						placeholder="영어 소문자 + 숫자, 3~12자" maxlength="12">
					<button type="button" class="duplicate-btn" id="duplicateCkIdBtn">중복확인</button>
				</div>

				<!-- 비밀번호 -->
				<div class="form-row">
					<label for="mPw" class="form-label">비밀번호</label> <input
						type="password" class="form-control input-no-btn" id="mPw" name="mPw"
						placeholder="영문 대소문자+숫자 8~16자">
				</div>

				<!-- 비밀번호 확인 -->
				<div class="form-row">
					<label for="mPwRe" class="form-label">비번 확인</label> <input
						type="password" class="form-control input-no-btn" id="mPwRe" name="mPwRe">
				</div>

				<!-- 닉네임 -->
				<div class="form-row">
					<label for="mNickname" class="form-label">닉네임</label> <input
						type="text" class="form-control" id="mNickname" name="mNickname"
						maxlength="12" placeholder="한글/영문 2~12자">
					<button type="button" class="duplicate-btn" id="duplicateCkNnBtn">중복확인</button>
				</div>

				<!-- 이메일 -->
				<div class="form-row">
					<label for="mEmail" class="form-label">이메일</label> <input
						type="text" class="form-control" id="mEmail" name="mEmail"
						placeholder="example@domain.com">
					<button type="button" class="duplicate-btn" id="duplicateCkEmBtn">중복확인</button>
				</div>

				<!-- 버튼 영역 -->
				<div class="form-group text-center">
					<button type="button" class="btn-primary" id="joinBtn">회원가입</button>
					<button type="button" class="btn-primary" id="resetBtn">다시작성</button>
					<button type="button" class="btn-primary" id="mainBtn">로그인</button>
				</div>
			</form>
		</div>
	</section>

	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/signup.js"></script>
</html>
