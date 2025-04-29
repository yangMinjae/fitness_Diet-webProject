<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!-- 프로필 모달 -->
	<div class="modal" id="find-profile-modal">
		<div class="profile-section">
			<h2>내 프로필</h2>
			<div class="profile-box">
				<div class="profile-left">
					<img src="/resources/img/tag/헬스키퍼.png" class="profile-image" id="myProfileImg" alt="프로필 사진">
					<!-- 추후 수정 -->
					<div class="profile-nickname">닉네임</div>
					<span id="nickname">${profile.dto.nickname}]</span>
				</div>
				<form class="profile-form" method="post">
					<div class="form-group">
						<label for="favSport">좋아하는 운동</label>
						<span id="fav">${profile.pvo.fav}</span>
					</div>
					<div class="form-group">
						<label>지역</label>
						<div id="area">${profile.mvo.area}</div>
					</div>
					<div class="form-group">
						<label for="time">운동 시간대</label> 
						<span id="time">${profile.mvo.time}</span>
					</div>
					<div class="form-group">
						<label for="intro">자기소개</label>
						<span id="self">${profile.pvo.self}</span>
					</div>
				</form>
			</div>
			<div class="edit-button-wrapper">
				<button class="follow-button" id="follow">팔로우</button>
				<button class="mail-button" id="mail">메일 발송</button>
			</div>
		</div>
	</div>
</body>
</html>