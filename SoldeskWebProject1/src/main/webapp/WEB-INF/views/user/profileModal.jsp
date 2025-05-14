<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
</head>
<body>
	<div id="profile-modal">
		<div class="profile-modal-content" id="profile-modal-content">
		    <h2 class="profile-title">
		        <span class="profile-nickname" id="profile-nickname"></span>
		    </h2>
		    <div class="profile-body">
		        <div class="profile-left">
		            <div class="profile-img-box">
		            	<!-- 이미지 경로 설정 !!!!!!!!!! profile.dto.fvo.등등 --> 
		                <img src="/resources/img/tag/헬스키퍼.png" class="profile-image" id="myProfileImg" alt="프로필 사진">
		            </div>
		            <div id="checkFollow"></div>
		        </div>
		        <div class="profile-right">
					<ul class="profile-info-list">
					    <li data-label="태그 " id="profile-tag"></li>
					    <li data-label="성별 " id="profile-gender"></li>
					    <li data-label="나이 " id="profile-age"></li>
					    <li data-label="운동 시간대 " id="profile-time"></li>
					    <li data-label="지역 " id="profile-area"></li>
					</ul>
		        </div>
		    </div>
		    <div class="modal-actions">
		        <button class="send-msg-btn">메일 보내기</button>
		        <button class="close-modal-btn">닫기</button>
		    </div>
		</div>
	</div>
</body>
</html>