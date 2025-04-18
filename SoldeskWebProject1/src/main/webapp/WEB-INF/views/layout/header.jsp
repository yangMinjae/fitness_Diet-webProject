<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/resources/css/menu.css">
<title>MemberBoard</title>
</head>
<body>
	<header>
	    <div class="logo">
	    <a href="mainPage">SeroFit</a>
	    </div>
	    <nav class="nav">
	      <a href="testPage">테스트</a>
	      <span>|</span>
	      <a href="boardPage">게시판</a>
	      <span>|</span>
	      <a href="matePage">운동메이트</a>
	    </nav>
	    <div class="right-icons">
	      <img src="https://img.icons8.com/material-sharp/24/000000/new-post.png" alt="mailPage"/>
	      <c:if test="${not empty mCount}">
	        	${mCount}
	      </c:if>	
	      <div class="dropdown">
	        <img src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png" alt="프로필"/>
	        <c:if test="${not empty nickname}">
	        	${nickname}
	        </c:if>	        
	        <div class="dropdown-content">
	          <p id="myPage">My page</p>
	          <p id="modifyPage">회원 정보 수정</p>
	          <p id="logout">로그아웃</p>
	        </div>
	      </div>
	      <button class="login-btn">로그인버튼</button>
	    </div>
  	</header>