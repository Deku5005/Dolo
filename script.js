 // Fonction pour générer une couleur aléatoire
 function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
   return color;
}
   // Fonction pour changer la couleur des deux divs
   function changeColor() {
    const color = getRandomColor(); // Générer une couleur aléatoire
    const colorDiv1 = document.getElementById('princip');
    const colorDiv2 = document.getElementById('right');
    const colorDiv3 = document.getElementById('left');
    const colorDiv4 = document.getElementById('ln');

    // Appliquer la même couleur aux deux divs
    colorDiv1.style.backgroundColor = color;
    colorDiv2.style.backgroundColor = color;
    colorDiv3.style.backgroundColor = color;
    colorDiv4.style.backgroundColor = color;
  }

  // Ajouter l'événement de clic pour changer la couleur
  document.getElementById('change').addEventListener('click', changeColor);

   
   document.getElementById("downloadBtn").addEventListener("click", async () => {
   const element = document.getElementById("princip");
   const btn = document.getElementById("annuler");
   const btn1 = document.getElementById("change");
   const btn2 = document.getElementById("downloadBtn");


   btn.style.visibility = "hidden";
   btn1.style.visibility = "hidden";
   btn2.style.visibility = "hidden";

  // Attendre que html2canvas fonctionne
  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: false,
    scale: 2, // qualité
  });

  const imgData = canvas.toDataURL("image/png");

  // Créer le PDF
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pageWidth;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("cv_dolo_oumar.pdf");

  btn.style.visibility = "visible";
  btn1.style.visibility = "visible";
  btn2.style.visibility = "visible";


  
});


