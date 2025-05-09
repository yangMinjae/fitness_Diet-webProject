<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!-- 모달 -->
		<div class="modal" id="mailModal">
			<div class="modal-content">
				<span class="close-btn">&times;</span>
		
				<!-- 상단: 프로필 이미지 + 이름 -->
				<div class="modal-header">
				  <img id="profilePhoto" src="/resources/img/tag/다이어터.png" alt="프로필 사진">
				  <div class="header-main">
				    <h2 id="senderName"></h2>
				  </div>
				  <div class="header-date">
				    <p id="regdate"></p>
				  </div>
				</div>

		
				<!-- 메일 본문 -->
				<div class="modal-body">
					<p id="mailContent"></p>
				</div>
		
				<!-- 답장 버튼 -->
				<div class="modal-footer">
					<button id="replyBtn">✉️ 답장하기</button>
				</div>
			</div>
		</div>
</body>
</html>