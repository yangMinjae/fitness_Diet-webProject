<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>마이페이지</title>
    <link rel="stylesheet" type="text/css" href="/resources/css/myPage.css">
</head>
<body>
<jsp:include page="../layout/header.jsp" />
<div class="container">
    <!-- 왼쪽 리모컨 스타일 사이드바 -->
	<div class="floating-sidebar">
	    <button class="menu-section">내 프로필</button>
	    <button class="menu-section">친구 관리</button>
	    <div class="menu-subgroup">
	        <div class="menu-button">즐겨찾기</div>
	        <div class="menu-button">팔로우</div>
	        <div class="menu-button">팔로워</div>
	    </div>
	</div>
    <!-- 메인 콘텐츠 -->
    <div class="main-content">

        <!-- 내 프로필 영역 -->
        <div class="profile-section">
            <h2>내 프로필</h2>
            <div class="profile-box">
                <div class="profile-left">
                    <img src="img/default-profile.png" class="profile-image" alt="프로필 사진">
                    <div class="profile-nickname">닉네임</div>
                </div>
                <div class="profile-info">
                    <input type="text" value="이메일" readonly>
                    <input type="text" value="전화번호" readonly>
                    <input type="text" value="자기소개" readonly>
                    <input type="text" value="주소" readonly>
                </div>
            </div>
            <div class="edit-button-wrapper">
                <button class="edit-button">프로필 수정</button>
            </div>
        </div>

        <!-- 친구 관리 영역 -->
        <div class="friend-section">
            <h2>친구관리</h2>

            <section class="friend-subsection">
                <h3>즐겨찾기</h3>
                <div class="friend-list">
                    <!-- 반복 영역 시작 -->
                    <table>
                    </table>
                    <!-- 반복 영역 끝 -->
                </div>
            </section>

            <section class="friend-subsection">
                <h3>팔로우</h3>
                <div class="friend-list">
                    <div class="friend-row">
                        <div class="friend-profile">프로필</div>
                        <div class="friend-nickname">닉네임</div>
                        <div class="friend-actions">□ □</div>
                    </div>
                </div>
            </section>

            <section class="friend-subsection">
                <h3>팔로워</h3>
                <div class="friend-list">
                    <div class="friend-row">
                        <div class="friend-profile">프로필</div>
                        <div class="friend-nickname">닉네임</div>
                        <div class="friend-actions">□</div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
<jsp:include page="../layout/footer.jsp" />
</body>
</html>