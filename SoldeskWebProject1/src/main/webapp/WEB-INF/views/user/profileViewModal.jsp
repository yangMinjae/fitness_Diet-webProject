<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
	<!-- 프로필 모달 -->
	<div id="profileModal" class="profile-modal">
		<div class="modal-content">

			<span class="close">&times;</span>

			<div class="profile-header">
				<img src="" alt="프로필" class="profile-photo">

				<div class="profile-info">
					<h2 class="up-nickname"></h2>
					<div class="badges">
					</div>
					<p class="bio"></p>
					<p class="followers">
						<i class="fa-solid fa-user-group"></i> 팔로워: <span></span>명
					</p>
				</div>
			</div>

			<div class="post-section">
				<h3>작성한 게시글</h3>
				<div class="post-table">
					<div class="post-row header">
						<div>제목</div>
						<div>날짜</div>
						<div>조회수</div>
						<div>추천수</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</body>
<script type="text/javascript" src="/resources/js/profileViewModal.js"></script>
</html>