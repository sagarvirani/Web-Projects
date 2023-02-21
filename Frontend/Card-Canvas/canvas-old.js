
const canvas = new fabric.Canvas("card-canvas");
const imgInput = document.getElementById('imgInput');

imgInput.addEventListener('change', (event) => {
  if(event.target.files) {
    let imageFile = event.target.files[0]; //Gets the image file

    var reader = new FileReader();
 
    if(imageFile) {
      reader.readAsDataURL(imageFile);
      reader.addEventListener('load', (e) => {
        var originalImage = new Image(); // Creates image object
        originalImage.src = e.target.result; // Assigns converted image to image object
        
        var scaledImage = new fabric.Image(originalImage, {
          centeredRotation:true,
        });
        console.log(scaledImage.url);
        // Rendering the image to canvas
        canvas.add(scaledImage,);
        canvas.centerObject(scaledImage);
        canvas.requestRenderAll();
      });
    }
  }
});


//Generate PDF from the canvas

const imgPdf = document.getElementById('btn-download');
  imgPdf.addEventListener('click', () => {
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
   
    var pdf = new jsPDF();
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("card.pdf");
    });














// const imgInput = document.getElementById("imgInput");
// const canvas = document.getElementById("card-canvas");
// const canvasCtx = canvas.getContext('2d');

// let activeImage;

// imgInput.addEventListener("change", (e) => {
//     if(e.target.files) {
//         const reader = new FileReader();
//         reader.addEventListener("load", () => {
//             openImage(reader.result);
//         });
//     reader.readAsDataURL(e.target.files[0]);
//     }
// });

// function openImage(imageSrc) {
//   activeImage = new Image();
//   activeImage.src = imageSrc;
//   activeImage.addEventListener("load", () => {
//     canvasCtx.drawImage(activeImage, 0, 0);
//   });
// }