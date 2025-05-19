const closeBtn = document.querySelector(".profile-modal .close");
const profilemodal = document.getElementById("profileModal");

// 게시글 클릭 시 해당 ID로 이동
document.querySelectorAll('.post-row.clickable').forEach(row => {
  row.addEventListener('click', () => {
	  console.log('boardView!');
  });
});

closeBtn.addEventListener("click", () => {
	profilemodal.classList.remove("show");
});
