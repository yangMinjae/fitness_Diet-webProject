<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
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
			<a href="testPage">설문조사</a> <span class="divider">|</span> <a
				href="boardPage">게시판</a> <span class="divider">|</span> <a
				href="matePage">운동메이트</a>
		</nav>

		<div class="right-icons">
			<div class="mate-agree-reject">
				<sec:authorize access="isAuthenticated()">
					<h5>운동 메이트</h5>
					<sec:authentication var="mateChecker" property="principal.mateChecker" />
					<span class="mateCheck">${mateChecker}</span>
				</sec:authorize>
					<button class="mateCheckerBtn" id="agree">동의</button>
					<button class="mateCheckerBtn" id="reject">거부</button>
			</div>
			<div class="mail">
				<img
					src="https://img.icons8.com/material-sharp/24/000000/new-post.png"
					alt="mailPage" />
				<sec:authorize access="isAuthenticated()">
					<sec:authentication var="mailCount" property="principal.mailCount" />
					<span class="count">${mailCount}</span>
				</sec:authorize>
			</div>

			<div class="dropdown user">
				<img src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
					alt="profile" />
				<sec:authorize access="isAuthenticated()">
					<sec:authentication var="nickname" property="principal.nickname" />					
					<span class="nickname">${nickname}</span>
				</sec:authorize>
			</div>
			
			<sec:authorize access="isAuthenticated()">
				<button type="button" class="logout-btn">로그아웃</button>
			</sec:authorize>
			
			<sec:authorize access="isAnonymous()">
				<button type="button" class="login-btn">로그인</button>
			</sec:authorize>
		</div>
	</header>
	<main>