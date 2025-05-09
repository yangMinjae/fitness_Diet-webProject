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
		
	<form method="post">
		<c:if test="${not empty bvDTO}">
			<div class="post-container">
			  <div class="post-header">
			    <h1 class="post-title">${bvDTO.title}</h1>
			    <span class="tag">${bvDTO.tag}</span>
			  </div>
			
			  <div class="post-meta-line">
			    <div class="post-meta-left">
			      <span>${bvDTO.nickname}</span> | <span>${bvDTO.regdate}</span>
			    </div>
			    <div class="post-meta-right">
			      	조회 : <span>${bvDTO.hit}</span> | 추천 : <span>${bvDTO.love}</span>
			    </div>
			  </div>			
			  <div class="post-content">${bvDTO.content}</div>			  			
			  <div class="icon-bar">
			    <button type="button" class="icon-btn" id="like-btn" bno="${bvDTO.bno}" title="좋아요">❤️</button>
					<button type="button" class="icon-btn" id="list-btn" title="목록" >☰</button>
					<button type="button" class="icon-btn" id="prev-btn" bList='${bList}' bno="${bvDTO.bno}" title="이전 게시글">&lt;</button>
					<button type="button" class="icon-btn" id="next-btn" bList='${bList}' bno="${bvDTO.bno}" title="다음 게시글">&gt;</button>
					<button type="button" class="icon-btn" id="edit-btn" bno="${bvDTO.bno}" title="수정하기">✏️</button>
					<button type="button" class="icon-btn" id="delete-btn" bno="${bvDTO.bno}" title="삭제">🗑️</button>
			  </div>
			</div>
		</c:if>		
		<input type="hidden" name="bno" value="${bvDTO.bno}">
	</form>	
	
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/boardView.js"></script>
</html>