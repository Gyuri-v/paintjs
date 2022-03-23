const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"; // 
const CANVAS_SIZR = 700; // 

canvas.width = CANVAS_SIZR;
canvas.height = CANVAS_SIZR;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZR, CANVAS_SIZR);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting() {
  painting  = true;
}

function onMounseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if( !painting ){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMounseDown(event){
  painting = true;
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function hadleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function hadleModeClick(event){
  if( filling === true ){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if( filling ){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}


if( canvas ){
  canvas.addEventListener("mousemove", onMounseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

if( colors ){
  Array.from(colors).forEach(color =>   // color 는 그 array 안에 있는 각가의 아이템을 대표
    color.addEventListener("click", handleColorClick)
  );
}

if( range ){
  range.addEventListener("input", hadleRangeChange);
}

if( mode ){
  mode.addEventListener("click", hadleModeClick);
}