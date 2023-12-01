/* =*=*=*=*=*=*=*=*=*=*= Initialization =*=*=*=*=*=*=*=*=*=*= */
let count = 0;
let start = new Date().getTime();

/* =*=*=*=*=*=*=*=*=*=*=*= Constants =*=*=*=*=*=*=*=*=*=*=*= */
const design_background = document.querySelector(".design-background");

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

/* =*=*=*=*=*=*=*=*=*= Utility Functions =*=*=*=*=*=*=*=*=*= */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectRandom(items) {
  return items[rand(0, items.length - 1)];
}

function calcDistance(a, b) {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;
  
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

/* =*=*=*=*=*=*=*=*=*=*=*=*=*= Code =*=*=*=*=*=*=*=*=*=*=*=*=*= */
function createStar(position) {
  const star = document.createElement("span");
  const color = selectRandom(config.colors);
  
  star.classList.add("star", "fa-solid", "fa-star");
  
  star.style.left = `${position.x}px`;
  star.style.top = `${position.y}px`;
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = `${config.starAnimationDuration}ms`;
  
  design_background.appendChild(star);

  setTimeout(() => design_background.removeChild(star), config.starAnimationDuration);
}

window.addEventListener("mousemove", e => {
  const mousePosition = { x: e.clientX, y: e.clientY }
  
  if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = mousePosition;
  }
  
  const now = new Date().getTime();
  const hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars;
  const hasBeenLongEnough = now - last.starTimestamp > config.minimumTimeBetweenStars;
  
  if(hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);
    
    last.starTimestamp = new Date().getTime();
    last.starPosition = mousePosition;
  }
  
  last.mousePosition = mousePosition;
});

document.body.addEventListener("mouseleave", () => last.mousePosition = originPosition);
