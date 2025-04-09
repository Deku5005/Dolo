document . getElementById ( "change" ). addEventListener ( "click" , function () {
    const  rightSide  =  document . querySelector ( '#princip' ); 
    const currentColor = window . getComputedStyle ( right ).backgroundColor ;
    if ( currentColor === "rgb(76, 175, 80)" || currentColor === "#4CAF50" ) {
    right.style.backgroundColor  =  "" ;
   } else{
    right.style.backgroundColor  =  "#4CAF50" ;
    }
   }); // Corrected parenthesis
   
   
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


