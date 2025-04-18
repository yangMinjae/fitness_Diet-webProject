<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<!DOCTYPE html>
<html>
<head>
<title>마이페이지</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />
	<div class="container">
		<!-- 왼쪽 리모컨 스타일 사이드바 -->
		<div class="floating-sidebar">
			<button class="menu-section" id="goMyProfile">내 프로필</button>
			<button class="menu-section" id="goMyFriendsMng">친구 관리</button>
			<div class="menu-subgroup">
				<button class="menu-button" id="goFavList">즐겨찾기</button>
				<button class="menu-button" id="goFollowList">팔로우</button>
				<button class="menu-button" id="goFollowerList">팔로워</button>
			</div>
		</div>
		<!-- 메인 콘텐츠 -->
		<div class="main-content">

			<!-- 내 프로필 영역 -->
			<div class="profile-section">
				<h2>내 프로필</h2>
				<div class="profile-box">
					<div class="profile-left">
						<img src="img/default-profile.png" class="profile-image"
							alt="프로필 사진">
						<div class="profile-nickname">닉네임</div>
					</div>
					<form class="profile-form">
						<div class="form-group">
							<label>메이트 추천 여부</label>
							<div class="radio-group">
								<label title="Yes 선택시 이용자님이 다른 유저의 운동메이트로 추천됩니다."><input type="radio" name="mate" value="true" id="yesRadio">
									Yes</label>
								<label  title="No 선택시 이용자님이 다른 유저의 운동메이트로 추천되지 않습니다."><input type="radio" name="mate"
									value="false"id="noRadio"> No</label>
							</div>
						</div>
						<div class="form-group">
							<label for="favSport">좋아하는 운동</label> 
							<input type="text" name="favSport" id="favSport">
						</div>
						<div class="form-group">
							<label>지역</label>
							<div id="showArea">충청도</div>
							<button type="button" name="searchAreaBtn">지역 검색</button>
						</div>
						<div class="form-group">
							<label for="time">운동 시간대</label> <input type="text" name="time" id="time">
						</div>
						<div class="form-group">
							<label for="intro">자기소개</label>
							<textarea rows="9" cols="30" name="intro" maxlength="300"
								placeholder="300자 이내 작성" id="intro"></textarea>
						</div>
						<input type="hidden" name="area">
					</form>
				</div>
				<div class="edit-button-wrapper">
					<button class="edit-button" id="editProfile">프로필 수정</button>
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
<script type="text/javascript" src="/resources/js/myPage.js"></script>
</html>