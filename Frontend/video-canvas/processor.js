let animation_handle;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const video = document.querySelector("video");
const btn_play_pause = document.getElementById("btn-play-pause");
const btn_left = document.getElementById("btn-left");
const btn_right = document.getElementById("btn-right");
const btn_reset = document.getElementById("btn-reset");
const icon = btn_play_pause.querySelector("i");

video.addEventListener('loadeddata', video_load_callback);

function video_load_callback() {
    icon.classList.add('fa-play');
    step();
}
function step() { // update the canvas when a video proceeds to next frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    animation_handle = video.requestVideoFrameCallback(step);
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


btn_reset.addEventListener('click', ()=> {
    
    video.currentTime = video.duration;
    video.pause();
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

let oldX = 0;
let oldY = 0;

canvas.addEventListener('mousemove', (e)=> {
    if(e.clientX < oldX || e.clientY < oldY) {
        console.log('left');
    }
    else {
        console.log('right');
    }
    oldX = e.clientX;
    oldY = e.clientY;
    
});

canvas.addEventListener('mouseleave', (e)=> {
    
});
