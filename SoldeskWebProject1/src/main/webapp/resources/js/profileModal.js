// 팔로우 버튼 및 모달 동작
document.addEventListener('click', (e) => {
	
	// 닫기 버튼 클릭 시 닫기
	if (e.target.classList.contains('close-modal-btn')) {
		document.getElementById('profile-modal').classList.remove('show');
	}
	
	// 메일 보내기 버튼 클릭시 모달 키면서 mailmodal 초기화
	if (e.target.classList.contains('send-msg-btn')) {
		const mailInput = document.getElementById('mailInput');
		const charCount = document.getElementById('charCount');
		initMailModalContent();
		initMailModalEvent();
		document.getElementById('sendmailModal').classList.add('show');
		document.getElementById('profile-modal').classList.remove('show');
	}
	
	// 팔로우 버튼 클릭 시 팔로우, 팔로잉 확인 및 추가
	if (e.target.classList.contains('follow-btn')) {
		const uno = e.target.dataset.uno;
		const userUno = document.querySelector('.userUno').textContent.trim();
		const isFollowing = e.target.id === 'following';
		
		fetch(`/mate/${isFollowing ? 'unfollow' : 'follow'}?uno=${uno}&userUno=${userUno}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
		.then(res => res.text())
		.then(data => {
			const bool = data.trim() === '<Boolean>true</Boolean>';
			if (isFollowing && bool) {
				e.target.id = 'follow';
				e.target.textContent = '팔로우';
				e.target.classList.remove('following');
				e.target.classList.add('follow');
			} else {
				e.target.id = 'following';
				e.target.textContent = '팔로잉';
				e.target.classList.remove('follow');
				e.target.classList.add('following');
			}
		});
	}
});

// 글자 수 초기화 함수
function initMailModalContent() {
	mailInput.value = '';
	charCount.textContent = `${mailInput.value.length} / 300`;
}

// 글자 수 실시간 함수
function initMailModalEvent() {
	if (mailInput && charCount) {
		mailInput.addEventListener('input', () => {
			const length = mailInput.value.length;
			charCount.textContent = `${length} / 300`;
		});
	}
}

// esc 누를 시 모달 스타일 제거
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape")	document.getElementById('profile-modal').classList.remove('show');
});