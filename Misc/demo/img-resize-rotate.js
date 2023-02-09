console.log('hello how are you?');
////// Functions ///////

// Rotate canvas based on image orientation
const rotateCanvas = (canvas, orientation, width, height) => {
    const canvasContext = canvas.getContext("2d");
  
    // Rotate image in canvas, if nessecairy
    if (orientation > 4) {
      canvas.width = height;
      canvas.height = width;
    }
    switch (orientation) {
      case 2:
        // horizontal flip
        canvasContext.translate(width, 0);
        canvasContext.scale(-1, 1);
        break;
      case 3:
        // 180° rotate left
        canvasContext.translate(width, height);
        canvasContext.rotate(Math.PI);
        break;
      case 4:
        // vertical flip
        canvasContext.translate(0, height);
        canvasContext.scale(1, -1);
        break;
      case 5:
        // vertical flip + 90 rotate right
        canvasContext.rotate(0.5 * Math.PI);
        canvasContext.scale(1, -1);
        break;
      case 6:
        // 90° rotate right
        canvasContext.rotate(0.5 * Math.PI);
        canvasContext.translate(0, -height);
        break;
      case 7:
        // horizontal flip + 90 rotate right
        canvasContext.rotate(0.5 * Math.PI);
        canvasContext.translate(width, -height);
        canvasContext.scale(-1, 1);
        break;
      case 8:
        // 90° rotate left
        canvasContext.rotate(-0.5 * Math.PI);
        canvasContext.translate(-width, 0);
        break;
      default:
    }
  };
  
  // Get image orientation from exif data
  const getImageOrientation = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function(e) {
        const view = new DataView(e.target.result);
        if (view.getUint16(0, false) !== 0xffd8) {
          resolve(-2);
        }
        const length = view.byteLength;
        let offset = 2;
        while (offset < length) {
          if (view.getUint16(offset + 2, false) <= 8) resolve(-1);
          const marker = view.getUint16(offset, false);
          offset += 2;
          if (marker === 0xffe1) {
            if (view.getUint32((offset += 2), false) !== 0x45786966) {
              resolve(-1);
            }
  
            const little = view.getUint16((offset += 6), false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;
            for (let i = 0; i < tags; i++) {
              if (view.getUint16(offset + i * 12, little) === 0x0112) {
                resolve(view.getUint16(offset + i * 12 + 8, little));
              }
            }
          } else if ((marker & 0xff00) !== 0xff00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }
        resolve(-1);
      };
    });
  };
  
  // Draw resized image to canvas and crop to dimensions
  const drawImageResizedAndCropped = (image, width, height, orientation) => {
    // Set Vars
    let offsetX = 0.5;
    let offsetY = 0.5;
    let imageWidth = image.width;
    let imageHeight = image.height;
    
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");
   
    // Swap width & height based on orientation
    if (orientation > 4) {
      [width, height] = [height, width];
    }
    
    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;
    
    const ratio = Math.min(width / imageWidth, height / imageHeight);
  
    let newWidth = imageWidth * ratio;   // new prop. width
    let newHeight = imageHeight * ratio;   // new prop. height
    let aspectRatio = 1;
  
    // decide which gap to fill
    if (newWidth < width) aspectRatio = width / newWidth;
    if (Math.abs(aspectRatio - 1) < 1e-14 && newHeight < height) aspectRatio = height / newHeight;  // updated
    newWidth *= aspectRatio;
    newHeight *= aspectRatio;
  
    // Calc source rectangle
    let canvasWidth = imageWidth / (newWidth / width);
    let canvasHeight = imageHeight / (newHeight / height);
    
    // Set positioning
    let canvasX = (imageWidth - canvasWidth) * offsetX;
    let canvasY = (imageHeight - canvasHeight) * offsetY;
  
    // Make sure source rectangle is valid
    if (canvasX < 0) canvasX = 0;
    if (canvasY < 0) canvasY = 0;
    if (canvasWidth > imageWidth) canvasWidth = imageWidth;
  
    // Fill image in dest. rectangle
    canvas.width = width;
    canvas.height = height;
  
    // Store current state
    canvasContext.save();
  
    // Rotate canvas, if nessacairy
    rotateCanvas(canvas, orientation, width, height);
  
    // Draw image to canvas
    canvasContext.drawImage(
      image,
      canvasX,
      canvasY,
      canvasWidth,
      canvasHeight,
      0,
      0,
      width,
      height
    );
  
    // Restore state
    canvasContext.restore();
  
    return canvas;
  };
  
  // Draw resized image to canvas
  const drawImageResized = (image, maxWidth, maxHeight, orientation) => {
    // Get original dimensions
    let width = image.width;
    let height = image.height;
  
    // Create canvas
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");
    
    // Calculate new dimensions
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }
  
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
  
    // Save current state
    canvasContext.save();
  
    // Rotate canvas, if nessacairy
    rotateCanvas(canvas, orientation, width, height);
  
    // Draw image with calculated dimensions to canvas
    canvasContext.drawImage(
      image,
      0,
      0,
      width,
      height
    );
  
    return canvas;
  };
  
   const resizeImage = (imgFile, options) => {
    return new Promise(async (resolve, reject) => {
      let orientation = await getImageOrientation(imgFile);
  
      // Check if's an image and reject promise if it's not
      if (!imgFile.type.match(/image.*/)) {
        reject('Error: The uploaded file is not an image');
      }
  
      const defaultOptions = {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.92,
        mimeType: 'image/jpeg',
        returnDataUrl: false,
        crop: true
      };
  
      // Merge options
      options = Object.assign({}, defaultOptions, options);
  
      // Create new elements
      const reader = new FileReader();
      const sourceImg = document.createElement('img');
  
      // Load file to reader as DataUrl
      reader.readAsDataURL(imgFile);
  
      // When file is loaded
      reader.onload = event => {
        // Set file as img src
        sourceImg.src = event.target.result;
  
        // When new img src is loaded
        sourceImg.onload = function() {
          // const canvas = undefined;
  
          const canvas = options.crop
            ? drawImageResizedAndCropped(
              sourceImg,
              options.maxWidth,
              options.maxHeight,
              orientation
            )
            : drawImageResized(
              sourceImg,
              options.maxWidth,
              options.maxHeight,
              orientation
            );
          // Return resized Image
          if (options.returnDataUrl) {
            // Return data url
            resolve(canvas.toDataURL(options.mimeType, options.quality));
          } else {
            // return blob
            canvas.toBlob(
              blob => resolve(blob),
              options.mimeType,
              options.quality
            );
          }
        };
      };
    });
  };
  
  
  
  
  
  /////// Example  ////////
  
  const input = document.getElementById("file");
  const targetImg = document.createElement("img");
  
  const asyncFunc = async (imgFile) => {
    const resizedImage = await resizeImage(imgFile, {
      maxWidth: 1400,
      maxHeight: 784,
      quality: 0.92,
      mimeType: "image/jpeg",
      returnDataUrl: false,
      crop: true
    })
    
    console.log(resizedImage);
    
    const resizedImageDataURI = await resizeImage(imgFile, {
      maxWidth: 1400,
      maxHeight: 784,
      quality: 0.92,
      mimeType: "image/jpeg",
      returnDataUrl: true,
      crop: true
    })
    
    console.log(resizedImageDataURI);
  };
    
  // On new input file
  input.addEventListener("change", event => {
    // Get file input
    const imgFile = event.target.files[0];
    
    asyncFunc(imgFile);
     
  //   // Get resized image file as blob and log it to the console
  //   resizeImage(image => {
  //     console.log(image);
  //   },imgFile, {
  //     maxWidth: 1400,
  //     height: 784,
  //     quality: 0.92,
  //     mimeType: "image/jpeg",
  //     returnDataUrl: false,
  //     crop: true
  //   })
    
  //   // Get resized image file as dataUrl and render it into an <img/>
  //   resizeImage(image => {
  //     targetImg.src = image;
  //     input.parentNode.insertBefore(targetImg, input.nextSibling)
  //   },imgFile, {
  //     maxWidth: 1400,
  //     maxHeight: 784,
  //     quality: 0.8,
  //     mimeType: "image/jpeg",
  //     returnDataUrl: true,
  //     crop: true
  //   })
  });
  

