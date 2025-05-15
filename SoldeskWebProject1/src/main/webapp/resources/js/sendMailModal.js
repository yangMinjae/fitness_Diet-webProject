	document.addEventListener('click', (e) =>{
			
		// 닫기 버튼
		if (e.target.classList.contains('close-btn')) {
			document.getElementById('sendmailModal').classList.remove('show');
		};
		
		// 보내기 버튼
		if (e.target.classList.contains('sendMail')) {
			const uno = document.querySelector('.uno').textContent.trim();
			const userUno = document.querySelector('.userUno').textContent.trim();
			
			let content = document.getElementById('mailInput').value;
			
			if (confirm("쪽지를 보내시겠습니까?")) {
				fetch(`/mate/sendMsg?uno=${uno}&userUno=${userUno}&content=${content}`, {
					method : 'POST',
					headers : {'Content-Type': ' application/json'}
				})
				.then(res => res.text())
				.then(data => {
					if (data === 'true') {
						document.getElementById('sendmailModal').classList.remove('show');
						
						const profileModal = document.getElementById("find-profile-modal");
						
						if(!profileModal || !profileModal.classList.contains('show')){
							document.getElementById('sendmailModal').classList.remove('show');	
						}else{
							profileModal.classList.remove('show');
						}
					}else{
						alert("오류 발생!! 다시 시도하세요.");
						return;
					}
				})
			}else{
				return;
			}
			
		}
	});

//esc 누를 시 모달 스타일 제거 (sendmailModal이 열려 있을 시에만)
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape"){
	document.getElementById('sendmailModal').classList.remove('show')
	}
});

//글자 수 초기화 함수
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