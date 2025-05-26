<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="/resources/css/surveyResultPageModal.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<title>Insert title here</title>
</head>
<body>
	<div class="surveyModal hidden" id="surveyModal">
		<div class="surveyModal-content">
			<span class="closeModal-button">&times;</span>

			<!-- 버튼들 -->
			<div class="modal-buttons">
				<button id="printBtn" title="PDF 저장">
					<i class="fa-solid fa-print"></i>
				</button>
			</div>
			<!-- 콘텐츠 -->
			<div id="mainBlock">
				<div class="content"></div>
			</div>
			<div id="pdfContainer" style="display: none;"></div>
		</div>
	</div>
</body>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>	
<script type="text/javascript" src="/resources/js/surveyResultModal.js"></script>
</html>