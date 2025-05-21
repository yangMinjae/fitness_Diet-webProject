<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/surveyResultPage.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
	<button id="printBtn" title="PDF 저장"><i class="fa-solid fa-print"></i></button>
	<button id="homeBtn" title="홈으로 이동"> <i class="fa-solid fa-house"></i></button>
	<div id = "mainBlock">
		<c:forEach var="entry" items="${result}">
			<div class="details">
			<div id = "${entry.key}Subheading" class = subheadings></div>
			${entry.value}
			</div>
		</c:forEach>
	</div>
	<sec:authentication property="principal" var="pinfo"/>
	<form>
		<input type="hidden" name="uno" value="${pinfo.uno}">
		<input type="hidden" name="title" value="">
		<input type="hidden" name="tag" value="${goal}">
		<input type="hidden" name="content" value="">
	</form>
	<div id="pdfContainer" style="display: none;"></div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script type="text/javascript" src="/resources/js/surveyResultPage.js"></script>
</html>