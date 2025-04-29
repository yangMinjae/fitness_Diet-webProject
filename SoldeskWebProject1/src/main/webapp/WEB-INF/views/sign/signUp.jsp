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
			<!-- 회원가입 타이틀 독립 배치 -->
			<div class="text-center mb-5">
				<h2 class="join-title">회원가입</h2>
			</div>

			<form class="needs-validation" novalidate>
				<div class="form-group">
					<label class="form-label mt-4" for="mId">아이디</label>
				</div>
				<div class="input-group">
					<input type="text" class="form-control" id="mId" name="mId"
						placeholder="영어 소문자로 시작, 영어 + 숫자 조합 3~12 글자" maxlength="12">
					<div class="form-group text-center mt-2">
						<button class="btn btn-primary btn-lg" type="button"
							id="duplicateCkIdBtn">중복확인</button>
					</div>
				</div>
				<!-- 중복확인 버튼을 아래로 내리고 큰 버튼 스타일 적용 -->

				<div class="form-group">
					<label class="form-label mt-4" for="mPw">비밀번호</label> <input
						type="password" class="form-control" id="mPw" name="mPw"
						placeholder="영어 소문자, 대문자, 숫자 8~16 글자">
				</div>

				<div class="form-group">
					<label class="form-label mt-4" for="mPwRe">비밀번호 재확인</label> <input
						type="password" class="form-control" id="mPwRe" name="mPwRe">
				</div>

				<div class="form-group">
					<label class="form-label mt-4" for="mName">닉네임</label> <input
						type="text" class="form-control" id="mNickname" name="mNickname"
						maxlength="12" placeholder="한글, 영어 2~12 글자">
				</div>

				<!-- 중복확인 버튼을 아래로 내리고 큰 버튼 스타일 적용 -->
				<div class="form-group text-center mt-2">
					<button class="btn btn-primary btn-lg" type="button"
						id="duplicateCkNnBtn">중복확인</button>
				</div>

				<div class="form-group">
					<label class="form-label mt-4" for="mEmail">이메일</label> <input
						type="text" class="form-control" id="mEmail" name="mEmail"
						placeholder="@ 포함 전체 이메일"> 
				</div>

				<!-- 중복확인 버튼을 아래로 내리고 큰 버튼 스타일 적용 -->
				<div class="form-group text-center mt-2">
					<button class="btn btn-primary btn-lg" type="button"
						id="duplicateCkEmBtn">중복확인</button>
				</div>

				<!-- 버튼들 중앙 정렬 -->
				<div class="form-group mb-2 text-center mt-5">
					<button type="button" class="btn btn-primary btn-lg" id="joinBtn">회원가입</button>
					<button type="button" class="btn btn-primary btn-lg" id="resetBtn">다시작성</button>
					<button type="button" class="btn btn-primary btn-lg" id="mainBtn">로그인</button>
				</div>

				<input type="hidden" name="cmd" value="join">
			</form>
		</div>
	</section>
	<jsp:include page="../layout/footer.jsp" />
	<script type="text/javascript" src="/resources/js/signup.js"></script>
</body>
</html>
