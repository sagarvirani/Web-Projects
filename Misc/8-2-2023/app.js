var video = document.getElementById("video");
var images = [];
console.log(video);

video.onloadeddata = function() {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  for (var i = 0; i < video.duration; i=i+0.1) {
    ctx.drawImage(video, 0, 0);
    images.push(canvas.toDataURL("image/png"));
  }
  console.log(images);
};