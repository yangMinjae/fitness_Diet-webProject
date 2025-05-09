<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
</head>
<body>
	<div class="profile-modal-content" id="profile-modal-content">
	    <h2 class="profile-title">
	        <span class="nickname">${profile.dto.nickname}</span>
	    </h2>
	    <div class="profile-body">
	        <div class="profile-left">
	            <div class="profile-img-box">
	            	<!-- 이미지 경로 설정 !!!!!!!!!! profile.dto.fvo.등등 --> 
	                <img src="/resources/img/tag/헬스키퍼.png" class="profile-image" id="myProfileImg" alt="프로필 사진">
	            </div>
	            <c:choose>
				    <c:when test="${result == 1}">
				        <button class="follow-btn following" id="following">팔로잉</button>
				    </c:when>
				    <c:otherwise>
				        <button class="follow-btn follow" id="follow">팔로우</button>
				    </c:otherwise>
				</c:choose>
	        </div>
	        <div class="profile-right">
				<ul class="profile-info-list">
				    <li data-label="성별 ">${profile.mvo.gender ? '남자' : '여자'}</li>
				    <li data-label="운동 시간대 ">${profile.mvo.time}</li>
				    <li data-label="연령대 ">${profile.mvo.age}</li>
				    <li data-label="지역 ">${profile.mvo.area}</li>
				    <li data-label="태그 ">${profile.pvo.tag}</li>
				    <span class="uno" hidden="true">${profile.mvo.uno}</span>
				</ul>
	        </div>
	    </div>
	    <div class="modal-actions">
	        <button class="send-msg-btn">쪽지보내기</button>
	        <button class="close-modal-btn">닫기</button>
	    </div>
	</div>
	<jsp:include page="sendMailModal.jsp" />
</body>
	<script type="text/javascript" src="/resources/js/matePage.js"></script>
</html>