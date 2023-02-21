var canvas = new fabric.Canvas('imageCanvas', {
    backgroundColor: 'rgb(240,240,240)'
});
canvas.setWidth(300);
canvas.setHeight(300);

canvas.setBackgroundImage('image1.jpg', canvas.renderAll.bind(canvas), {
    opacity: 1,
    strech: false
});



var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    var objects = canvas.getObjects();
    console.log(objects);
    for (var i in objects) {
        
        objects[i].remove();
    }
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            var imgInstance = new fabric.Image(img, {
               selectable: 2
            })
            canvas.add(imgInstance);
            canvas.deactivateAll().renderAll();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}



var imageSaver = document.getElementById('lnkDownload');
imageSaver.addEventListener('click', saveImage, false);

function saveImage(e) {
    this.href = canvas.toDataURL({
        format: 'png',
        quality: 0.8
    });
    this.download = 'canvas.png'
}