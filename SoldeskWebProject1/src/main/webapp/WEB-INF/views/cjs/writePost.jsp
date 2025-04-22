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
		<div class="form-group">
			<label for="category">태그</label> <select id="category">
				<option value="다이어터">다이어터</option>
				<option value="멸치탈출">멸치탈출</option>
				<option value="유지어터">유지어터</option>
				<option value="프로득근러">프로득근러</option>
				<option value="헬스키퍼">헬스키퍼</option>
			</select>
		</div>

		<!-- 제목 입력 -->
		<div class="form-group">
			<label for="title">제목 :</label> <input type="text" id="title"
				placeholder="제목을 입력하세요" />
		</div>

		<!-- 전달할 내용 입력 -->
		<div class="form-group">
			<label for="content">전달할 내용</label>
			<textarea id="content" class="content-input" rows="10"
				placeholder="내용을 입력하세요"></textarea>
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
			<button class="upload-final">⭐ 업로드</button>
			<button class="list-btn">목록</button>
			<button class="complete-btn">작성 완료</button>
		</div>

	</div>
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/writePost.js"></script>
</html>