<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>AI API 테스트</title>
<style>
body {
	font-family: Arial, sans-serif;
	background-color: #f5f5f5;
	margin: 0;
	padding: 0;
}

.container {
	max-width: 700px;
	margin: 80px auto;
	padding: 30px;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
	text-align: center;
	margin-bottom: 30px;
	font-size: 24px;
}

form {
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
}

.prompt-input {
	height: 150px;
	padding: 15px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 8px;
	resize: vertical;
	margin-bottom: 20px;
}

.submit-btn {
	background-color: #4CAF50;
	color: white;
	padding: 15px;
	font-size: 16px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.submit-btn:hover {
	background-color: #45a049;
}

.result-box {
	padding: 20px;
	background-color: #f0f0f0;
	border-radius: 8px;
	min-height: 100px;
	white-space: pre-wrap;
	font-size: 16px;
}

.result-title {
	font-size: 20px;
	margin-bottom: 10px;
}
</style>
</head>
<body>
	<div class="container">
		<h1>AI API 테스트</h1>
		<form id="promptForm">
			<textarea id="promptInput" name="prompt" class="prompt-input"
				placeholder="프롬프트를 입력하세요..."></textarea>
			<button type="submit" class="submit-btn">전송</button>
		</form>

		<div class="result">
			<div class="result-title">결과</div>
			<div id="resultBox" class="result-box">결과가 여기에 표시됩니다.</div>
		</div>
	</div>

	<script>
        document.getElementById("promptForm").addEventListener("submit", function(e) {
            e.preventDefault(); // form 기본 submit 막기

            const prompt = document.getElementById("promptInput").value;

            fetch("/ymj/send", {
                method: "POST",
                headers: {
                	"Content-Type": "text/plain; charset=UTF-8"
                },
                body: encodeURIComponent(prompt)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("서버 응답 실패");
                }
                return response.text(); // 서버에서 응답 텍스트 받기
            })
            .then(data => {
                document.getElementById("resultBox").innerText = data; // 결과창에 표시
            })
            .catch(error => {
                document.getElementById("resultBox").innerText = "오류 발생: " + error.message;
            });
        });
    </script>
</body>
</html>