// 쪽지 보내기 버튼

document.addEventListener('click', (e) =>{
	
	// 닫기 버튼
	if (e.target.classList.contains('close-btn')) {
		document.getElementById('mailModal').classList.remove('show')};
	
	// 보내기 버튼
	if (e.target.classList.contains('sendMail')) {
		const uno = document.querySelector('#profile-modal-content .uno').textContent.trim();
		
		let content = document.getElementById('mailInput').value;
		
		if (confirm("쪽지를 보내시겠습니까?")) {
			// uno1 수정 필요!!!!!!
			fetch(`/mate/sendMsg?uno=${uno}&uno1=3&content=${content}`, {
				method : 'POST',
				headers : {'Content-Type': ' application/json'}
			})
			.then(res => res.text())
			.then(data => {
				document.getElementById('mailModal').classList.remove('show');
				document.getElementById('find-profile-modal').classList.remove('show');
			})
		}else{
			return;
		}
		
	}
});

//모달 닫기 (ESC 키)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('mailModal').classList.remove('show');
    }
});


