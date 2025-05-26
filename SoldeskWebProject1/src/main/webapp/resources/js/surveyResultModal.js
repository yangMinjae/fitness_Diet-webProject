document.getElementById("printBtn").addEventListener("click", () => {
	  const original = document.querySelectorAll(".details");
	  const pdfContainer = document.getElementById("pdfContainer");
	  pdfContainer.innerHTML = ''; // 초기화
	  pdfContainer.style.display = 'block';

	  original.forEach(detail => {
	    const clone = detail.cloneNode(true);
	    clone.style.pageBreakInside = 'avoid';
	    clone.style.breakInside = 'avoid';
	    clone.style.marginBottom = '30px';
	    clone.style.boxShadow = 'none';
	    pdfContainer.appendChild(clone);
	  });

	  const opt = {
	    margin: 0.3,
	    filename: 'survey-result.pdf',
	    image: { type: 'jpeg', quality: 0.98 },
	    html2canvas: {
	      scale: 2,
	      useCORS: true,
	      scrollY: 0
	    },
	    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
	    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
	  };

	  html2pdf().set(opt).from(pdfContainer).save().then(() => {
	    pdfContainer.style.display = 'none';
	  });
	});

document.querySelector('.closeModal-button').addEventListener('click', () => {
	  document.getElementById('surveyModal').classList.remove('show');
	  document.body.classList.remove('modal-open'); // 다시 허용
	});