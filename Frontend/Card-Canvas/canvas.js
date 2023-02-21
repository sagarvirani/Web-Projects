//Constants
const svgState = {};
const bgUrl = 'images/card.jpg';
const inputFile = document.getElementById('imgInput');
const reader = new FileReader();

//Initialize the canvas
const initCanvas = (id) => {
  return new fabric.Canvas(id, {
      width: 488,
      height: 488
  });
}

//Set the background image in canvas
const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, (img) => {
      canvas.backgroundImage = img;
      canvas.renderAll();
  });
}

//Clearing the canvas
const clearCanvas = (canvas) => {
  
  canvas.getObjects().forEach((obj) => {
      if(obj !== canvas.backgroundImage) {
          canvas.remove(obj);
      }
  });
}

//Saving the canvas
const saveCanvas = (canvas, state) => {
  state.val = canvas.toSVG();
  //sent the state to server with user info
}

//Restoring the canvas
const restoreCanvas = (canvas, state) => {
  if (state.val) {
      fabric.loadSVGFromString(state.val, objects => {
          //console.log(objects);
          canvas.add(...objects);
          canvas.requestRenderAll();
      });
  }
  return canvas;
}

//Adding User Image to Card

const imgAdded = () => {
  const file = inputFile.files[0];
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    fabric.Image.fromURL(reader.result, (img) => {
      img.crossOrigin="anonymous";
      clearCanvas(canvas);
      canvas.add(img);
      canvas.centerObject(img);
      //saveCanvas(canvas, svgState);
      canvas.requestRenderAll();
    },
    {
      cornerColor: 'black',
      scaleX:0.3,
      scaleY:0.3,
      selectable: 1
    });
    
  });
  
}

inputFile.addEventListener('change', imgAdded, false);


//Generate PDF from the canvas
function saveImage(e) {
  this.href = canvas.toDataURL({
      format: 'png',
      quality: 0.8
  });
  this.download = 'canvas.png'
}

const imgPdf = document.getElementById('btn-download');
imgPdf.addEventListener('click', saveImage, false);





// imgPdf.addEventListener('click', () => { 
  
//   //let imgData = canvas.toDataURL("image/jpeg", 1.0); generates crossorigin errror
  
//   let imgData = restoreCanvas(canvas, svgState); //working but restrores the canvas as svg
//   const doc = new jsPDF("p", "px", "a4");
//   svg2pdf(imgData, doc, {
//     xOffset: 0,
// 	  yOffset: 0,
// 	  scale: 1
//   });
//   doc.save('card.pdf');


//   // var pdf = new jsPDF();
//   // pdf.addImage(imgData, 0, 0);
  
//   // pdf.save("card.pdf");
// });

const canvas = initCanvas('card-canvas');
setBackground(bgUrl, canvas);