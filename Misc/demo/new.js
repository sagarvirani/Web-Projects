
const frame = new Scene.Frame({
    width: "250px",
    height: "200px",
    left: "0px",
    top: "0px",
    transform: {
      rotate: "0deg",
      scaleX: 1,
      scaleY: 1,
      matrix3d: [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ],
    },
  });
  
  const moveableElement = document.querySelector(".moveable");
  const moveable = new Moveable(moveableElement.parentElement, {
    target: moveableElement,
    origin: false,
    draggable: true,
    rotatable: true,
    scalable: true,
    pinchable: true,
    keepRatio: false,
    throttleDrag: 1,
    throttleScale: 0.01,
    throttleRotate: 0.2,
    throttleResize: 1,
  }).on("pinch", ({ clientX, clientY }) => {
    setTimeout(() => {
      setLabel(clientX, clientY, `X: ${frame.get("left")}
  <br/>Y: ${frame.get("top")}
  <br/>W: ${frame.get("width")}
  <br/>H: ${frame.get("height")}
  <br/>S: ${frame.get("transform", "scaleX").toFixed(2)}, ${frame.get("transform", "scaleY").toFixed(2)}
  <br/>R: ${parseFloat(frame.get("transform", "rotate")).toFixed(1)}deg
  `);
    });
  }).on("drag", ({ target, left, top, clientX, clientY, isPinch }) => {
    frame.set("left", `${left}px`);
    frame.set("top", `${top}px`);
    setTransform(target);
    !isPinch && setLabel(clientX, clientY, `X: ${left}px<br/>Y: ${top}px`);
  
  }).on("scale", ({ target, delta, clientX, clientY, isPinch }) => {
    const scaleX = frame.get("transform", "scaleX") * delta[0];
    const scaleY = frame.get("transform", "scaleY") * delta[1];
    frame.set("transform", "scaleX", scaleX);
    frame.set("transform", "scaleY", scaleY);
    setTransform(target);
    !isPinch && setLabel(clientX, clientY, `S: ${scaleX.toFixed(2)}, ${scaleY.toFixed(2)}`);
  
  }).on("rotate", ({ target, beforeDelta, clientX, clientY, isPinch }) => {
    const deg = parseFloat(frame.get("transform", "rotate")) + beforeDelta;
  
    frame.set("transform", "rotate", `${deg}deg`);
    setTransform(target);
    !isPinch && setLabel(clientX, clientY, `R: ${deg.toFixed(1)}`);
  }).on("resize", ({ target, width, height, clientX, clientY, isPinch }) => {
    frame.set("width", `${width}px`);
    frame.set("height", `${height}px`);
    setTransform(target);
    !isPinch &&  setLabel(clientX, clientY, `W: ${width}px<br/>H: ${height}px`);
  }).on("warp", ({ target, multiply, delta, clientX, clientY }) => {
    frame.set("transform", "matrix3d", multiply(frame.get("transform", "matrix3d"), delta));
    setTransform(target);
    setLabel(clientX, clientY, `X: ${clientX}px<br/>Y: ${clientY}px`);
  }).on("dragEnd", () => {
    labelElement.style.display = "none";
  }).on("scaleEnd", () => {
    labelElement.style.display = "none";
  }).on("rotateEnd", () => {
    labelElement.style.display = "none";
  }).on("resizeEnd", () => {
    labelElement.style.display = "none";
  }).on("warpEnd", () => {
    labelElement.style.display = "none";
  });
  
  
  window.addEventListener("resize", () => {
      moveable.updateRect();
  });
  const labelElement = document.querySelector(".label");
  
  function setTransform(target) {
    target.style.cssText = frame.toCSS();
  }
  function setLabel(clientX, clientY, text) {
    labelElement.style.cssText = `
  display: block; transform: translate(${clientX}px, ${clientY - 10}px) translate(-100%, -100%);`;
    labelElement.innerHTML = text;
  }
  
  document.querySelector(`.able [data-able="scalable"]`).addEventListener("click", e => {
    document.querySelector(`.able .selected`).classList.remove("selected");
     e.target.classList.add("selected");
    moveable.scalable = true;
    moveable.resizable = false;
    moveable.warpable = false;
  });
  document.querySelector(`.able [data-able="resizable"]`).addEventListener("click", e => {
    document.querySelector(`.able .selected`).classList.remove("selected");
     e.target.classList.add("selected");
    moveable.scalable = false;
    moveable.resizable = true;
    moveable.warpable = false;
  });
  document.querySelector(`.able [data-able="warpable"]`).addEventListener("click", e => {
    document.querySelector(`.able .selected`).classList.remove("selected");
     e.target.classList.add("selected");
    moveable.scalable = false;
    moveable.resizable = false;
    moveable.warpable = true;
  });