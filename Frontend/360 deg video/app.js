/*--------------------
⚙️ Options
--------------------*/
const options = {
  leftBound: '0.1', // => 10% of window width
  rightBound: '0.9' // => 90% of window width
};


/*--------------------
📌 Vars
--------------------*/
const video = document.getElementById('video');
const cursor = document.getElementById('cursor');
const progress = document.getElementById('progress');
const btn_play_pause = document.getElementById("btn-play-pause");
const btn_left = document.getElementById("btn-left");
const btn_right = document.getElementById("btn-right");
const btn_reset = document.getElementById("btn-reset");
const icon = btn_play_pause.querySelector("i"); 
const frameRate = 24;
const time = { frame: 0 };
let flag = false;
video.pause();


/*--------------------
📏 Map
--------------------*/
const map = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


/*--------------------
💨 Mousemove
--------------------*/
const mouseMove = (e) => {
  flag = true;
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;
  TweenMax.to(time, 1, {
    // Mouse catches progress from 10% to 90% of window width
    frame: Math.min(video.duration - 0.5, Math.max(0, map(x, window.innerWidth * options.leftBound, window.innerWidth * options.rightBound, 0, video.duration))),
    ease: Power2.easeOut
  });
  //console.log(time.frame, video.currentTime);
}


/*--------------------
♻️ Loop
--------------------*/
const loop = setInterval(() => {
  if(flag) {
    video.currentTime = time.frame;
  }
}, 100);


/*--------------------
⚠️ Events
--------------------*/
window.addEventListener('mousemove', mouseMove);
window.addEventListener('touchstart', mouseMove);
window.addEventListener('touchmove', mouseMove);


video.addEventListener('loadeddata', ()=> {
  icon.classList.add('fa-play');
});

btn_play_pause.addEventListener('click', ()=> {
  flag = false;
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
  flag = false;
  if(video.play())
      video.pause();

  if(video.currentTime > 0.5){
      video.currentTime = video.currentTime - 0.5;
  } else {
      video.loop = true;
      video.currentTime = video.duration - 0.5;
  }
});

btn_right.addEventListener('click', ()=> {
  flag = false;
  if(video.play())
      video.pause();
  
  if(video.currentTime != video.duration){
      video.currentTime = video.currentTime + 0.5;
  } else {
      video.loop = true;
      video.currentTime = 0.5;
  }
});

btn_reset.addEventListener('click', ()=> {
  flag = false;
  video.pause();
  video.currentTime = video.duration;
});
