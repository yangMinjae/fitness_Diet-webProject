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
<div id="headerArea">
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
			<div class="mate-toggle">
				<sec:authorize access="isAuthenticated()">
					<sec:authentication var="mateChecker" property="principal.mateChecker" />
					<span hidden="true" id="mateChecker">${mateChecker}</span>
					<div class="tooltip-wrapper">
					  <input type="checkbox" id="mateToggle" <c:if test="${mateChecker == 1}">checked</c:if> />
					  <label for="mateToggle" class="mate-switch">
					    <span class="handle-text on">YES</span>
					    <span class="handle-text off">NO</span>
					  </label>
					  <span class="custom-tooltip">운동 메이트 추천 여부</span>
					</div>
				</sec:authorize>
			</div>
			<div class="mail">
				<img
					src="https://img.icons8.com/material-sharp/24/000000/new-post.png"
					alt="mailPage" />
				<sec:authorize access="isAuthenticated()">
					<sec:authentication var="mailCount" property="principal.mailCount" />
				<span class="count" id="mailCount">${mailCount}</span>
				</sec:authorize>
			</div>

			<div class="dropdown user">
				<img src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
					alt="profile" />
				<sec:authorize access="isAuthenticated()">
					<sec:authentication var="nickname" property="principal.nickname" />					
					<span class="nickname" id="nickname">${nickname}</span>
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
</div>
<main>