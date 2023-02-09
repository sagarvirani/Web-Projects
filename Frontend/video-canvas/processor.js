const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const video = document.querySelector("video");
const btn_play_pause = document.getElementById("btn-play-pause");
const btn_left = document.getElementById("btn-left");
const btn_right = document.getElementById("btn-right");
const btn_reset = document.getElementById("btn-reset");
const mouse_input = document.getElementById("mouse-input");
const icon = btn_play_pause.querySelector("i");
var totalImages = 51;
var videoImages = [];  

video.addEventListener('loadeddata', ()=> {
    icon.classList.add('fa-play');
    for (var i = 0; i < video.duration; i=i+0.1) {
        video.currentTime = video.currentTime + 0.1;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        videoImages.push(canvas.toDataURL("image/png"));
        console.log(videoImages);
      }
    updateCanvas();
 
});

function updateCanvas() { // update the canvas when a video proceeds to next frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    video.requestVideoFrameCallback(updateCanvas);
}

btn_play_pause.addEventListener('click', ()=> {
    if(video.paused){
        video.play();
        video.loop = true;
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        video.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }    
});

btn_left.addEventListener('click', ()=> {
    if(video.play())
        video.pause();

    if(video.currentTime > 0.5){
        video.currentTime = video.currentTime - 0.5;
    } else {
        video.loop = true;
        video.currentTime = video.duration - 0.5;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

btn_right.addEventListener('click', ()=> {
    if(video.play())
        video.pause();
    
    if(video.currentTime != video.duration){
        video.currentTime = video.currentTime + 0.5;
    } else {
        video.loop = true;
        video.currentTime = 0.5;
    }
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

btn_reset.addEventListener('click', ()=> {
    
    video.pause();
    video.currentTime = video.duration;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});
var videoFrames = [];
var oldValue = 1;
var currentImage = 1;
  $("#mouse-input").on("input", function(event) {
    if(event.target.value > oldValue) {
        currentImage = event.target.value;
        console.log(videoImages[currentImage]);
    }
    else {
        currentImage = event.target.value;
        console.log(videoImages[currentImage]);
    }
    oldValue = event.target.value;
    //var currentImage = videoImages[event.target.value + 1];
    //console.log(currentImage);
    //ctx.drawImage(currentImage, 0, 0);
  });



// let oldX = 0;
// let oldY = 0;

// canvas.addEventListener('mousemove', (e)=> {
//     if(e.clientX > oldX || e.clientY > oldY) {
//         // console.log('left', e.clientX, e.clientY);
//         // currentImage = videoImages[0] + 1;
//         mouse_input.value +=1;
//         ctx.drawImage(videoImages[1], 0, 0, canvas.width, canvas.height); 
//     }
//     else {
//         //console.log('right', e.clientX, e.clientY);
//     }
//     oldX = e.clientX;
//     oldY = e.clientY;
// });

// let oldX = 0;
// let oldY = 0;

// canvas.addEventListener('mousemove', (e)=> {
//     if(e.clientX < oldX || e.clientY < oldY) {
//         if(video.currentTime > 0.05){
//             video.currentTime = video.currentTime - 0.05;
//         } else {
//             video.loop = true;
//             video.currentTime = video.duration - 0.05;
//         }
//         console.log(video.currentTime);
//     //    console.log('left', e.clientX, e.clientY);
//     }
//     else {
//         if(video.currentTime != video.duration){
//             video.currentTime = video.currentTime + 0.05;
//         } else {
//             video.loop = true;
//             video.currentTime = 0.05;
//         }
//         console.log(video.currentTime);
//         // console.log('right', e.clientX, e.clientY);
//     }
//     oldX = e.clientX;
//     oldY = e.clientY;
    
// });

// video.addEventListener("timeupdate", function() {
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     requestAnimationFrame(updateCanvas);
//   });

