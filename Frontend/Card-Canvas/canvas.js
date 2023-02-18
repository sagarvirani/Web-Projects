
//Code to load image by user in the card canvas
const canvas = document.getElementById("card-canvas"); // Creates a canvas object
const ctx = canvas.getContext("2d"); // Creates a contect object
const imgInput = document.getElementById('imgInput');

  imgInput.addEventListener('change', (e) => {
    if(e.target.files) {
        let imageFile = e.target.files[0]; //Gets the image file
      var reader = new FileReader();
      // console.log(imageFile);
      if(imageFile) {
      reader.readAsDataURL(imageFile);
      reader.onloadend = (e) => {
        var myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = () => {
          ctx.drawImage(myImage,0,0); // Draws the image on canvas
          //let imgData = canvas.toDataURL("image/jpeg",0.75); // Assigns image base64 string in jpeg format to a variable
        }
      }
    }
}
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