<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>	
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
<link rel="icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAACAAQAAAAAA">

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SeroFit 게시판</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />
	
	<div class="board-container">	
		<!-- 필터 버튼 -->
		<div class="filter-buttons">
			<button class="allList">전체</button>
			<button class="dieter">다이어터</button>
			<button class="escapeAnchovy">멸치탈출</button>
			<button class="maintenance">유지어터</button>
			<button class="Professional">프로득근러</button>
			<button class="healthKeeper">헬스키퍼</button>
			<sec:authorize access="isAuthenticated()">
				<button class="listByLike">추천한 글</button>
			</sec:authorize>
				
			
			<button class="writePostBtn">게시글 작성</button>
		</div>

		<!-- 게시글 테이블 -->
		<div class="table-wrapper">
			<table class="post-table">
				<thead>
					<tr>
						<th>제목</th>				
						<th>글쓴이</th>
						<th>등록일</th>
						<th>조회</th>
						<th>추천</th>
					</tr>
				</thead>
				<c:choose>
					<c:when test="${not empty list}">
						<tbody id="postList">

						</tbody>
					</c:when>
					<c:otherwise>
						<tbody id="noPostList">
							<!-- 데이터가 없는 상태로 비워둠 -->
							<tr>
								<td colspan="5" class="empty">게시글이 없습니다.</td>
							</tr>
						</tbody>
					</c:otherwise>
				</c:choose>		
			</table>
			<sec:authorize access="isAuthenticated()"> 
				<input type="hidden" id="isLogin">
			</sec:authorize>		
		</div>
				<c:set var="prePage" value="${page-1}"/>
				<c:set var="nextPage" value="${page+1}"/>
				<c:set var="totalPages" value="${(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)}" />
		<div class="page-btn"> </div>
		<div class="search-container">
			<select id="searchType">
				<option value="title"> 제목 </option>
				<option value="nickname"> 닉네임 </option>
			</select>
			<div class="search-input-wrapper">
				<input type="text" id="searchBox" class="search-box" placeholder="검색 내용 입력">
				<span class="clear-btn" id="clearSearch">X</span>
			</div>

			<button type="button" id="search-btn">
				<img alt=검색 src="https://cdn-icons-png.flaticon.com/512/13/13267.png">
			</button>
		</div>
	</div>
	
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/boardList.js"></script>
</html>
