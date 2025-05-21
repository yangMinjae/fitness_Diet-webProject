<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Serofit 게시글 작성</title>
</head>
<body class="writeBoard-body">
	<jsp:include page="../layout/header.jsp" />
	
	<!-- 콘텐츠 전체 컨테이너 -->
	<div class="content-container">
		<!-- 카테고리 선택 -->
		<form method="post">
			<div class="form-group">
				<label for="category">식단 선택</label> 
				<select id="diet" name="diet"
					<c:if test="${not empty board}">disabled</c:if>>
					<option value="">식단을 선택하세요</option>
					<c:forEach var="dvo" items="${dietList}">
						<option value='${dvo.title}' data-content='${dvo.content}'
							data-dno='${dvo.dno}' data-tag='${dvo.tag}' data-uno='${dvo.uno}'
							<c:if test="${not empty board && board.tag eq dvo.tag}">selected="selected"</c:if>>
							${dvo.title}</option>
					</c:forEach>
				</select>
			</div>

			<!--  태그 -->
			<div class="form-group">
				<label for="tag">태그</label> <input type="text" id="tag" name="tag"
					placeholder="식단을 선택하면 태그가 정해집니다" readonly
					value='${board.tag != null ? board.tag : "" }' />
			</div>

			<!-- 제목 입력 -->
			<div class="form-group">
				<label for="title">제목 :</label> <input type="text" id="title"
					name="title" placeholder="제목을 입력하세요"
					value='${board.title != null ? board.title : "" }' />
			</div>
			<!-- 식단 내용 들어가는 곳 -->
			<div class="form-group">
				<label for="dietContent">식단 내용</label>
				<div class="form-group">
					<div id="dietContent" name="dietContent" class="content-input" contenteditable="false">
						<c:out value='${dietContent}' escapeXml="false" />
					</div>
				</div>
				<textarea id="hiddenContent" name="content" style="display: none;"><c:out value='${diet.content}' escapeXml="false" /></textarea>
			</div>
			<!-- 유저가 직접 입력하는 영역 -->
			<div class="input-group">
				<label for="content">본문 내용</label>
				<div class="form-group">
					<div id="content" name="content" class="content-input" contenteditable="true">
						 <c:out value='${board.content}' escapeXml="false" />
					</div>
				</div>
				<textarea id="hiddenContent" name="content" style="display: none;">
					<c:out value='${board.content}' escapeXml="false" />
				</textarea>
			</div>

			<!-- 이미지 업로드 버튼 영역 -->
			<div class="button-group">
				<button type="button" class="upload-button">이미지 업로드</button>
			</div>
			
			<input type="file" id="imageInput" accept="image/*">
			<!-- 이미지 버튼이 생길 영역 -->
			<div class="image-wrapper">
				<div id="imageButton"></div>
			</div>
			<!-- 사용법 및 주의사항 입력 -->
			<div class="form-group">
  				<label for="descriptionBox">사용 방법 설명 및 주의 사항</label>
 				<div id="descriptionBox" class="readonly-box">☆ 이미지 파일만 업로드 할수 있습니다. <br>☆ 이미지 업로드 버튼 클릭  >  이미지 선택  >  생성된 이미지버튼 클릭<br>☆ 이미지는 키보드커서 위치에 삽입됩니다.<br>☆ 10MB 이상의 이미지를 삽입 시 이미지의 화질이 저하될수 있습니다.</div>
			</div>

			<!-- 하단 액션 버튼 영역 -->
			<div class="action-buttons">
				<button type="button" class="boardList-btn">목록</button>
				<button type="button" class="register-btn">작성 완료</button>
			</div>
			<!--  식단선택할때 dno 가져오는 용도 -->
			<c:if test="${empty board}">				
				<input type="hidden" id="dno" name="dno">
				<input type="hidden" id="uno" name="uno">
			</c:if>
			
			<c:if test="${not empty board}">				
				<input type="hidden" id="bno" name="bno" value="${board.bno}">
				<input type="hidden" id="dno" name="dno" value="${board.dno}">
				<input type="hidden" id="uno" name="uno" value="${board.uno}">
			</c:if>
			<input type="hidden" id="hiddenDietContent" name="dietContent" />
		</form>
	</div>

	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/writeBoard.js"></script>
</html>