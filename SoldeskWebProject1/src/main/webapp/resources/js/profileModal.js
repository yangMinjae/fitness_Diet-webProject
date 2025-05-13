document.addEventListener("DOMContentLoaded", function () {
	document.addEventListener('click', (e) =>{
			
		// 닫기 버튼
		if (e.target.classList.contains('close-btn')) {
			document.getElementById('sendmailModal').classList.remove('show')};
		
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
					document.getElementById('sendmailModal').classList.remove('show');
					
					const profileModal = document.getElementById("find-profile-modal");
					
					if(!profileModal || !profileModal.classList.contains('show')){
						document.getElementById('mailModal').classList.remove('show');	
					}else{
						profileModal.classList.remove('show');
					}
				})
			}else{
				return;
			}
			
		}
	});
});

