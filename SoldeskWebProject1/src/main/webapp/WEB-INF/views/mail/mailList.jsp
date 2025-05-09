<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />

	<div class="mailbox-container">
		<!-- 상단 컨트롤 -->
		<div class="top-bar">
			<button class="send-mail-btn">메일 보내기</button>
			<div class="search-box">
				<div class="input-wrapper">
					<input type="text" class="search-input" placeholder="검색어 입력..." />
					<button class="search-btn">🔍</button>
				</div>
			</div>
		</div>

		<!-- 메일 리스트 -->
		<ul class="mail-list">
			<c:forEach var="mvo" items="${mList}">
				<li class="mail-item"
				    data-name="${mvo.nickname}"
				    data-photo="${mvo.imgPath}"
				    data-content="${mvo.content}"
				    data-regdate="${mvo.regdate}"
				    data-uno="${mvo.uno}">
					<div class="profile-icon">
						<img src="/resources/img/tag/다이어터.png" alt="프로필" />
					</div>
					<div class="mail-info">
						<span class="sender">${mvo.nickname}</span> 
						<span class="sender">${mvo.imgPath}</span> 
						<span class="preview">${mvo.preview}</span>
						<span class="regdate">${mvo.regdate}</span>
					</div>
				</li>
			</c:forEach>
		</ul>			
	</div>
	
	<jsp:include page="mailModal.jsp" />
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/mail.js"></script>
</html>