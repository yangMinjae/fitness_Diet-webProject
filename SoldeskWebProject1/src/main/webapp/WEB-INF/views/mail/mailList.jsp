<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
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
					<input type="text" class="search-input" placeholder="제목 + 내용 으로 검색..." />
					<button class="search-btn">🔍</button>
				</div>
			</div>
		</div>
		
		<div class="mail-type-buttons">
		  <button id="loadSenderBtn">받은 메일</button>
		  <button id="loadRecevierBtn">보낸 메일</button>
		</div>
		
		<sec:authentication var="uno" property="principal.uno" />
		<!-- 메일 리스트 -->
			<ul class="mail-list">
				<c:forEach var="mvo" items="${mList}">
					<li class="mail-item ${mvo.hit == 1 ? 'read' : ''}"
					    data-name="${mvo.nickname}"
					    data-photo="${mvo.imgPath}"
					    data-content="${mvo.content}"
					    data-regdate="${mvo.regdate}"
					    data-selectuno="${mvo.uno}"
					    data-myuno="${uno}"
					    data-mno="${mvo.mno}">
						<div class="mail-info">
							<span class="sender">${mvo.nickname}</span> 
							<span class="preview">${mvo.preview}</span>
							<span class="regdate">${mvo.regdate}</span>
						</div>
					</li>
				</c:forEach> 
			</ul>
			
			<!-- ✅ 페이징 위치는 여기 -->
			<div id="pagination" class="pagination-container"></div>
			
			<!-- 숨겨진 내 uno -->
			<span id="myUno" hidden="true">${uno}</span>

	</div>
	
	<jsp:include page="mailModal.jsp" />	
	<jsp:include page="../user/sendMailModal.jsp" />
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/mailList.js"></script>
<script type="text/javascript" src="/resources/js/sendMailModal.js"></script>
</html>