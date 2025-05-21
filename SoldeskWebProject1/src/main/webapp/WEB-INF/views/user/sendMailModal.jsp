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
		<div class="send-modal" id="sendmailModal">
			<div class="modal-content">
				<span class="close-btn">&times;</span>
		
				<!-- 상단: 프로필 이미지 + 이름 -->
				<div class="modal-header">
					<h2 id="senderName">메일 보내기</h2>
				</div>
				
				<!-- 메일 본문 -->
				<div class="modal-body">
					<p id="mailContent"></p>
					<textarea id="mailInput" class="mail-input" maxlength="300" placeholder="최대 300자까지 입력 가능합니다."></textarea>
					<div class="char-counter" id="charCount">0 / 300</div>
				</div>
		
				<!-- 보내기 버튼 -->
				<div class="modal-footer">
					<button class="sendMail" id="replyBtn">✉️ 보내기</button>
				</div>
			</div>
		</div>
</body>
</html>