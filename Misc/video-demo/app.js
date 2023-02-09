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
const frameRate = 24;
const time = { frame: 0 };
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
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;
  TweenMax.to(time, 1, {
    // Mouse catches progress from 10% to 90% of window width
    frame: Math.min(video.duration - 0.5, Math.max(0, map(x, window.innerWidth * options.leftBound, window.innerWidth * options.rightBound, 0, video.duration))),
    ease: Power2.easeOut
  });
  console.log(time.frame, video.currentTime);
}


/*--------------------
♻️ Loop
--------------------*/
const loop = setInterval(() => {
  video.currentTime = time.frame
  console.log('hello');
}, 100);


/*--------------------
⚠️ Events
--------------------*/
window.addEventListener('mousemove', mouseMove);
window.addEventListener('touchstart', mouseMove);
window.addEventListener('touchmove', mouseMove);