<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />

	<!-- 콘텐츠 전체 컨테이너 -->
	<div class="content-container">		
		<!-- 카테고리 선택 -->
		<form>
			<div class="form-group">
				<label for="category">식단 선택</label> <select id="diet">
					<option value="">식단을 선택하세요</option>
					<c:forEach var="dvo" items="${ dietList}">					
						<option value="${dvo.title }" data-content="${dvo.content }"
							data-tag="${dvo.tag }">${dvo.title }</option>
					</c:forEach>
				</select>
			</div>
			
			<!--  태그 -->
			<div class="form-group">
	    		<label for="tag">태그</label>
	    		<input type="text" id="tag" name="tag" placeholder="식단을 선택하면 태그가 정해집니다"  readonly/>
			</div>
			
			<!-- 제목 입력 -->
			<div class="form-group">
				<label for="title">제목 :</label> 
				<input type="text" id="title" placeholder="제목을 입력하세요" />
			</div>
		
			<!-- 본문 입력 -->
			<div class="form-group">
				<label for="content">본문</label>
				<textarea id="content" class="content-input" rows="10" placeholder="식단을 선택하세요">
				</textarea>
			</div>
			
			<!-- 이미지 업로드 버튼 영역 -->
			<div class="button-group">
				<button type="button" class="upload-button">업로드 이미지 버튼</button>
				<button type="button" class="upload-button">업로드 이미지 버튼</button>
			</div>
	
			<!-- 사용법 및 주의사항 입력 -->
			<div class="form-group">
				<label for="description">사용 방법 설명 및 주의 사항</label>
				<textarea id="description" rows="5" placeholder="설명을 입력하세요"></textarea>
			</div>
	
			<!-- 하단 액션 버튼 영역 -->
			<div class="action-buttons">
				<button type="button" class="upload-final">⭐ 업로드</button>
				<button type="button" class="boardList-btn">목록</button>
				<button type="button" class="register-btn">작성 완료</button>
			</div>		
	 	<input type="hidden" name="dno" value="${dvo.dno }">
		<input type="hidden" name="uno" value="${dvo.uno }"> 
		</form>	
	</div>
	
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/writeBoard.js"></script>
</html>