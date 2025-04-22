<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>운동메이트 찾기</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />

	<h1 style="align-content: center;">운동메이트 찾기</h1>


	<main>
	<section class="mate-list">
		<c:forEach var="mate" items="${mateList}">
			 <div class="mate-item">
				<!--"실제 경로로 변경하기 !!!!!!!!!!!!!!!!!!!!!!!! /upload/${mate.dto.fvo.uuid}"-->
				<img src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
					class="user-icon" /> <span class="nickname">${mate.dto.nickname}</span>
				<span class="preview">
					<span class="title" >운동시간대 : </span>${mate.mvo.time} &emsp;
					
					<c:if test="${mate.mvo.gender eq 'true'}">
					    <span class="title" >성별 : </span><span class="gender">남자</span> &emsp;
					</c:if>
					
					<c:if test="${mate.mvo.gender eq 'false'}">
					    <span class="title" >성별 : </span><span class="gender">여자</span> &emsp;
					</c:if>
					<span class="title" >지역 : </span>${mate.mvo.area} &emsp;
					<span class="title" >나이 : </span>${mate.mvo.age} </span>
			</div>
		</c:forEach>
	</section>

	<!-- 페이징 -->
	<div class="pagination">
		<c:if test="${page > 1}">
			<a href="?page=${page - 1}" class="page-btn">이전</a>
		</c:if>

		<c:forEach begin="1" end="${totalPages}" var="i">
			<a href="?page=${i}" class="page-btn ${i == page ? 'active' : ''}">${i}</a>
		</c:forEach>

		<c:if test="${page < totalPages}">
			<a href="?page=${page + 1}" class="page-btn">다음</a>
		</c:if>
	</div>
	</main>

	<jsp:include page="../layout/footer.jsp" />
	<script type="text/javascript" src="/resources/js/matePage.js"></script>
</body>
</html>