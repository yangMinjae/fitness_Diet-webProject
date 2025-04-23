<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<!-- 아이디 찾기 모달 -->
	<div class="modal" id="findIdModal">
		<div class="modal-content">
			<span class="close-btn">&times;</span>
	
			<h2>이메일로 아이디 찾기</h2>
	
			<div class="modal-body">
				<input type="email" id="findIdEmail" placeholder="이메일 입력" required>
				<button id="findIdSubmit">아이디 찾기</button>
				<p id="findIdResult"></p>
			</div>
		</div>
	</div>	
</body>
</html>