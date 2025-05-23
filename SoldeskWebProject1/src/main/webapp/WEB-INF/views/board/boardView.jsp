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
		
	<form method="post">
		<c:if test="${not empty bvDTO}">
			<div class="post-container">
			  <div class="post-header">
			    <h1 class="post-title">${bvDTO.title}</h1>
			    <span class="tag">${bvDTO.tag}</span>
			  </div>
			
			  <div class="post-meta-line">
			    <div class="post-meta-left">
			      <span class="post-nickname" id="post-Nickname">${bvDTO.nickname}</span> | <span>${bvDTO.regdate}</span>
			    </div>
			    <div id="nickname-popup" class="nickname-popup hidden">
				    <ul>
				        <li id="show-profile" data-uno="${bvDTO.uno}"><a href="">프로필 보기</a></li>
				        <sec:authorize access="isAuthenticated()">
				        	<li id="send-mail" data-uno="${bvDTO.uno}"><a href="">메일 보내기</a></li>
				        </sec:authorize>
				    </ul>
				</div>
			    <div class="post-meta-right">
			      	조회 : <span>${bvDTO.hit}</span> | 추천 : <span id="love-count">${bvDTO.love}</span>
			    </div>
			  </div>
			  <!--  식단 접었다 펼쳤다 -->
			  <button type="button" id="toggleDietContentBtn" class="toggle-btn">[+ 식단 내용 펼치기]</button>
			  <div class="diet-wrapper collapsed" id="dietContentWrapper">
				  <div class="diet-content">
			  			<div class="post-content"><c:out value="${dietContent}" escapeXml="false" /></div>
				  </div>
			  </div>
			  
			  <div class="user-content">
			  	<div class="post-content">${bvDTO.content}</div>
			  </div>					  			
			  <div class="icon-bar">
				<sec:authorize access="isAuthenticated()">	
					<div id="like-wrapper">
					    <!-- 초기 버튼은 JSP에서 렌더링 -->
					    <c:if test="${isLike == 'true'}">
					        <button type="button" class="icon-btn" id="unlike-btn" title="싫어요">❤싫어요</button>
					    </c:if>
					    <c:if test="${isLike == 'false'}">
					        <button type="button" class="icon-btn" id="like-btn" title="좋아요">❤좋아요</button>	
					    </c:if>
					</div>	
				</sec:authorize>			  				  		
				<button type="button" class="icon-btn" id="list-btn" title="목록" >☰</button>
				<button type="button" class="icon-btn" id="prev-btn" bList='${bList}' bno="${bvDTO.bno}" title="이전 게시글">&lt;</button>
				<button type="button" class="icon-btn" id="next-btn" bList='${bList}' bno="${bvDTO.bno}" title="다음 게시글">&gt;</button>
				<sec:authorize access="isAuthenticated()">						
					<sec:authentication var="uno" property="principal.uno" />
					<c:if test="${bvDTO.uno eq uno}">						
						<button type="button" class="icon-btn" id="edit-btn" title="수정하기">✏️</button>
						<button type="button" class="icon-btn" id="delete-btn" title="삭제">🗑️</button>
					</c:if>
				</sec:authorize>
			  </div>
			</div>
		</c:if>		
		<input type="hidden" name="bno" value="${bvDTO.bno}">
		<sec:authorize access="isAuthenticated()">			
			<sec:authentication var="uno" property="principal.uno" />
			<input type="hidden" name="uno" value="${uno}">
		</sec:authorize>
	</form>	
	
	<jsp:include page="../user/sendMailModal.jsp" />
	<jsp:include page="../user/profileViewModal.jsp" />
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/boardView.js"></script>
	<script type="text/javascript" src="/resources/js/sendMailModal.js"></script>
</html>