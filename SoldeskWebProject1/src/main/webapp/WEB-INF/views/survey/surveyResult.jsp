<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="/resources/css/surveyResult.css">
</head>
<body>
	<div id = "mainBlock">
		<c:forEach var="entry" items="${result}">
			<div class="details">
			<div id = "${entry.key}Subheading" class = subheadings></div>
			${entry.value}
			</div>
		</c:forEach>
	</div>
</body>
</html>