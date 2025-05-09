<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>	
	<!-- 모달 -->
	<div class="modal" id="regionModal">
	  <div class="modal-content">
	    <button id="closeBtn" class="close-btn">X</button>
	    <div class="modal-inner">
	      <div class="column" id="doList">
	        <p class="column-title">목록</p>
	      </div>
	      <div class="column right-column">
	        <input type="text" id="searchInput" placeholder="도 또는 검색어를 입력하세요." />
	        <div id="siList"></div>
	      </div>
	    </div>
	  </div>
	</div>
</body>
</html>