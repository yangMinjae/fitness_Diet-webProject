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
						<img src="/resources/img/tag/헬스키퍼.png" class="profile-image"
							id="myProfileImg" alt="프로필 사진">
						<div class="profile-nickname">닉네임</div>
					</div>
					<form class="profile-form" method="post">
						<div class="form-group">
							<label>메이트 추천 여부</label>
							<div class="radio-group">
								<label title="Yes 선택시 이용자님이 다른 유저의 운동메이트로 추천됩니다."><input
									type="radio" name="mate" value="1" id="yesRadio"> Yes</label> <label
									title="No 선택시 이용자님이 다른 유저의 운동메이트로 추천되지 않습니다."><input
									type="radio" name="mate" value="0" id="noRadio"> No</label>
							</div>
						</div>
						<div class="form-group">
							<label for="favSport">좋아하는 운동</label> <input type="text"
								name="fav" id="favSport">
						</div>
						<div class="form-group">
							<label>지역</label>
							<div id="showArea">충청도</div>
							<button type="button" name="searchAreaBtn">지역 검색</button>
						</div>
						<div class="form-group">
							<label for="time">운동 시간대</label> <select name="time">
								<option value="::">::</option>
								<option value="08:00~09:59">08:00~09:59</option>
								<option value="10:00~11:59">10:00~11:59</option>
								<option value="12:00~13:59">12:00~13:59</option>
								<option value="14:00~15:59">14:00~15:59</option>
								<option value="16:00~17:59">16:00~17:59</option>
								<option value="18:00~19:59">18:00~19:59</option>
								<option value="20:00~21:59">20:00~21:59</option>
								<option value="22:00~23:59">22:00~23:59</option>
								<option value="00:00~07:59">00:00~07:59</option>
							</select> <input type="hidden" name="uno" value="1">
							<!-- 추후수정 -->
						</div>
						<div class="form-group">
							<label for="intro">자기소개</label>
							<textarea rows="9" cols="30" name="self" maxlength="300"
								placeholder="300자 이내 작성" id="self"></textarea>
						</div>
					</form>
				</div>
				<div class="edit-button-wrapper">
					<button class="edit-button" id="editProfile">프로필 수정</button>
					<button class="cancel-button" id="cancelEdit">취소</button>
				</div>
			</div>

			<!-- 친구 관리 영역 -->
			<div class="friend-section">
				<h2>친구관리</h2>

				<section class="friend-subsection">
					<h3>즐겨찾기</h3>
					<div class="friend-list">
						<!-- 반복 영역 시작 -->
						<table id="favList" class="listTable">
							<thead>
								<tr>
									<th class="tblImgHeader">프로필</th>
									<th class="tblNicknameHeader"></th>
									<th class="tblBtnHeader">팔로우 취소</th>
									<th class="tblBtnHeader">즐겨찾기 해제</th>
								</tr>
							</thead>
							<tbody id="favBody">
								<tr>
									<td class="tblImgSection"><img
										src="/resources/img/tag/헬스키퍼.png" class="smallProfileImg"
										alt="프로필"></td>
									<td class="tblNicknameSection">닉네임</td>
									<td class="tblBtnSection"><button class="favRemoveBtn">해제</button></td>
								</tr>
							</tbody>
						</table>
						<!-- 반복 영역 끝 -->
					</div>
				</section>

				<section class="friend-subsection">
					<h3>팔로우</h3>
					<div class="friend-list">
						<div class="friend-row">
							<!-- 반복 영역 시작 -->
							<table id="followList" class="listTable">
								<thead>
									<tr>
										<th class="tblImgHeader">프로필</th>
										<th class="tblNicknameHeader"></th>
										<th class="tblBtnHeader">팔로우 취소</th>
										<th class="tblBtnHeader">즐겨찾기 추가</th>
									</tr>
								</thead>
								<tbody id="followBody">
									<tr>
										<td class="tblImgSection"><img
											src="/resources/img/tag/헬스키퍼.png" class="smallProfileImg"
											alt="프로필"></td>
										<td class="tblNicknameSection">닉네임</td>
										<td class="tblFollowBtnSection">
											<button class="followCancelBtn">취소</button>
										</td>
										<td class="tblFollowBtnSection">
											<button class="addFavBtn">추가</button>
										</td>
									</tr>
								</tbody>
							</table>
							<!-- 반복 영역 끝 -->
						</div>
					</div>
				</section>

				<section class="friend-subsection">
					<h3>팔로워</h3>
					<div class="friend-list">
						<div class="friend-row">
							<!-- 반복 영역 시작 -->
							<table id="followerList" class="listTable">
								<thead>
									<tr>
										<th class="tblImgHeader">프로필</th>
										<th class="tblNicknameHeader"></th>
									</tr>
								</thead>
								<tbody id="followerBody">
									<tr>
										<td class="tblImgSection"><img
											src="/resources/img/tag/헬스키퍼.png" class="smallProfileImg"
											alt="프로필"></td>
										<td class="tblNicknameSection">닉네임</td>
									</tr>
								</tbody>
							</table>
							<!-- 반복 영역 끝 -->
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/myPage/myProfile.js"></script>
<script type="text/javascript" src="/resources/js/myPage/manageFriends.js"></script>
<script type="text/javascript" src="/resources/js/myPage/scrollAction.js"></script>
</html>