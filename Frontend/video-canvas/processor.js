let animation_handle;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const video = document.querySelector("video");
const btn_rotate = document.getElementById("btn-rotate");
const btn_left = document.getElementById("btn-left");
const btn_right = document.getElementById("btn-right");

video.addEventListener('loadeddata', video_load_callback);

function video_load_callback() {
    step();
}
function step() { // update the canvas when a video proceeds to next frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    animation_handle = video.requestVideoFrameCallback(step);
}

btn_rotate.addEventListener('click', ()=> {
    if(video.paused){
        video.play();
        video.loop = true;
    }else{
        video.pause();
    }    
});
let video_remainingTime;
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


