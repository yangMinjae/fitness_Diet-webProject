<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />
	<main>
	    <section class="section">
	      <div class="description-box">설문 조사 설명</div>
	      <button class="cta-button">설문 조사 페이지 이동 버튼</button>
	    </section>
	
	    <section class="section">이미지 + 설명</section>
	
	    <section class="popular-posts">
	      <h2>인기 게시글</h2>
			<c:forEach var="hbdto" items="${hbList}">
				<div class="post-card">
			        <h3>${hbdto.title}</h3>
			        <p>${hbdto.tag}</p>
			        <div class="post-meta">
			          <img src="https://img.icons8.com/ios-filled/50/000000/user-female-circle.png" alt="프로필"/>
			          <span>${hbdto.nickname}</span> · <span>${hbdto.regdate}</span>
			        </div>
		        </div>
			</c:forEach>
	    </section>
  	</main>
    <jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/main.js"></script>
</html>