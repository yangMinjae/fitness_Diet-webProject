<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<title>마이페이지</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp" />
	<jsp:include page="../survey/surveyPageModal.jsp" />
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
			<div class="profile-wrapper" style="position: relative;">
				<div class="profile-section" id="profileSection">
					<h2>내 프로필</h2>
					<button class="diet-button" id="dietButton">식 단</button>
					<div class="profile-box">
						<div class="profile-left">
							<div class="profile-image-wrapper">
								<img src="" class="profile-image" id="myProfileImg" alt="프로필 사진">
								<button type="button" class="img-edit-btn hidden"
									id="imgEditBtn">
									<img src="/resources/img/icon/gear.svg" alt="수정" />
								</button>
							</div>
							<div class="profile-nickname">닉네임</div>
						</div>
						<form class="profile-form" method="post"
							enctype="multipart/form-data">
							<input type="file" name="uploadFile" hidden="hidden"> <input
								type="text" name="basicImg" hidden="hidden" value=""> <input
								type="text" name="fVO.uuid" hidden="hidden" value="">
							<div class="form-group">
								<label for="favSport">좋아하는 운동</label> <input type="text"
									name="upVO.fav" id="favSport">
							</div>
							<div class="form-group">
								<label>지역</label>
								<div id="showArea">충청도</div>
								<button class="hidden" type="button" name="searchAreaBtn"
									id="searchArea">지역 검색</button>
							</div>
							<div class="form-group">
								<label for="time">운동 시간대</label> <select name="mVO.time"
									id="time">
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
								</select>
								<sec:authentication var="uno" property="principal.uno" />
								<input type="hidden" name="uVO.uno" value="${uno}">
							</div>
							<div class="form-group">
								<label for="intro">자기소개</label>
								<textarea rows="9" cols="30" name="upVO.self" maxlength="300"
									placeholder="300자 이내 작성" id="self" oninput="updateCharCount()"></textarea>
							</div>
							<div style="text-align: right; font-size: 0.9em; color: #555;">
								<span id="charCount">0</span>/300
							</div>
						</form>
					</div>
					<div class="edit-button-wrapper">
						<button class="edit-button" id="editProfile">프로필 수정</button>
						<button class="cancel-button hidden" id="cancelEdit">취소</button>
					</div>

				</div>
				<div class="diet-panel hidden" id="dietPanel">
					<h3>내 식단</h3>
					<table class="diet-table">
						<thead>
							<tr>
								<th>식단 제목</th>
								<th>태그</th>
								<th>날짜</th>
							</tr>
						</thead>

						<c:choose>
							<c:when test="${not empty dList}">
								<tbody id="dietList">
									<c:forEach var="diet" items="${dList}">
										<tr class="myTooltip-wrapper" data-tooltip="${diet.title}">
											<td content='${diet.content}'>${diet.title}</td>
											<td>${diet.tag}</td>
											<td>${diet.regDate}</td>
										</tr>
									</c:forEach>
								</tbody>
							</c:when>

							<c:otherwise>
								<tbody id="noDietList">
									<tr>
										<td colspan="3" class="empty">식단이 없습니다.</td>
									</tr>
								</tbody>
							</c:otherwise>
						</c:choose>
					</table>
				</div>
			</div>
			<span id="global-tooltip" class="myCustom-tooltip"></span>

			<!-- 친구 관리 영역 -->
			<div class="friend-section">
				<h2>친구관리</h2>

				<section class="friend-subsection">
					<div class="section-header fav">
						<h3>즐겨찾기</h3>
						<div class="search-wrapper"> 
							<input type="text" id="searchFav" placeholder="닉네임 검색"
								class="search-box">
	  						<button type="button" class="clear-btn" data-target="searchFav">×</button>
						</div>
					</div>
					<div class="friend-list">
						<!-- 반복 영역 시작 -->
						<table id="favList" class="listTable">
							<thead>
								<tr>
									<th class="tblImgHeader">프로필</th>
									<th class="tblNicknameHeader">닉네임</th>
									<th class="tblBtnHeader">팔로우</th>
									<th class="tblBtnHeader">즐겨찾기</th>
								</tr>
							</thead>
							<tbody id="favBody">
								<tr>
									<td colspan=4>대상이 없습니다.</td>
								</tr>
							</tbody>
						</table>
						<!-- 반복 영역 끝 -->
					</div>
				</section>

				<section class="friend-subsection follow">
					<div class="section-header">
						<h3>팔로우</h3>
						<div class="search-wrapper">  
							<input type="text" id="searchFollow" placeholder="닉네임 검색"
								class="search-box">							
	  						<button type="button" class="clear-btn" data-target="searchFollow">×</button>
						</div>
					</div>
					<div class="friend-list">
						<div class="friend-row">
							<!-- 반복 영역 시작 -->
							<table id="followList" class="listTable">
								<thead>
									<tr>
										<th class="tblImgHeader">프로필</th>
										<th class="tblNicknameHeader">닉네임</th>
										<th class="tblBtnHeader">팔로우</th>
										<th class="tblBtnHeader">즐겨찾기</th>
									</tr>
								</thead>
								<tbody id="followBody">
									<tr>
										<td colspan=4>대상이 없습니다.</td>
									</tr>
								</tbody>
							</table>
							<!-- 반복 영역 끝 -->
						</div>
					</div>
				</section>

				<section class="friend-subsection follower">
					<div class="section-header">
						<h3>팔로워</h3>
						<div class="search-wrapper"> 
							<input type="text" id="searchFollower" placeholder="닉네임 검색"
								class="search-box">
	  						<button type="button" class="clear-btn" data-target="searchFollower">×</button>
						</div>
					</div>
					<div class="friend-list">
						<div class="friend-row">
							<!-- 반복 영역 시작 -->
							<table id="followerList" class="listTable">
								<thead>
									<tr>
										<th class="tblImgHeader">프로필</th>
										<th class="tblNicknameHeader">닉네임</th>
										<th class="tblBtnHeader">팔로우</th>
									</tr>
								</thead>
								<tbody id="followerBody">
									<tr>
										<td colspan=4>대상이 없습니다.</td>
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
	<!-- 모달 오버레이 -->
	<div class="modal-overlay" id="modalOverlay" style="display: none;">
		<div class="modal-content">

			<!-- 상단 텍스트 + 수평선 -->
			<div class="modal-header">기본 제공 이미지</div>
			<div class="modal-header-border"></div>

			<!-- 이미지 버튼 그리드 -->
			<div class="button-grid">
				<button id="basic1">
					<img src="/resources/img/basicProfileImg/basic1.png" alt="기본1">
				</button>
				<button id="basic2">
					<img src="/resources/img/basicProfileImg/basic2.png" alt="기본2">
				</button>
				<button id="basic3">
					<img src="/resources/img/basicProfileImg/basic3.png" alt="기본3">
				</button>
				<button id="basic4">
					<img src="/resources/img/basicProfileImg/basic4.png" alt="기본4">
				</button>
				<button id="basic5">
					<img src="/resources/img/basicProfileImg/basic5.png" alt="기본5">
				</button>
				<button id="basic6">
					<img src="/resources/img/basicProfileImg/basic6.png" alt="기본6">
				</button>
				<button id="basic7">
					<img src="/resources/img/basicProfileImg/basic7.png" alt="기본7">
				</button>
				<button id="basic8">
					<img src="/resources/img/basicProfileImg/basic8.png" alt="기본8">
				</button>
			</div>

			<!-- 하단 버튼 -->
			<div class="modal-footer">
				<button id="directUp">직접 업로드</button>
				<button id="close">닫기</button>
			</div>
		</div>
	</div>
	<jsp:include page="../user/region.jsp" />
	<jsp:include page="profileViewModal.jsp" />
	<jsp:include page="../layout/footer.jsp" />
</body>
<script type="text/javascript" src="/resources/js/region.js"></script>
<script type="text/javascript" src="/resources/js/myPage/myProfile.js"></script>
<script type="text/javascript"
	src="/resources/js/myPage/manageFriends.js"></script>
<script type="text/javascript"
	src="/resources/js/myPage/scrollAction.js"></script>
</html>