๐ ๋ธ๋ง๋์ฝ๋ - ๋ฐ๋๋ผ JS ๊ทธ๋ฆผํ
===========================================


๐ย  2022.03.24 

โฐ.ย ๊ฐ์ 1์๊ฐ / ์์์๊ฐ 2์๊ฐ

[๋ฐ๋๋ผ JS๋ก ๊ทธ๋ฆผํ ๋ง๋ค๊ธฐ - ๋ธ๋ง๋ ์ฝ๋ Nomad Coders](https://nomadcoders.co/javascript-for-beginners-2)

## HTML / CSS

๐คย  HTML

```jsx
<canvas id="jsCanvas" class="canvas"></canvas>
<div class="controls">
  <div class="controls__range">
    <input type="range" id="jsRange" min="0.1" max="5" value="2.5" step="0.1" >
  </div>
  <div class="controls__btns">
    <button id="jsMode">Fill</button>
    <button id="jsSave">Save</button>
  </div>
  <div id="jsColors" class="controls__colors">
    <div class="controls__color jsColor" style="background-color: #2c2c2c;"></div>
    <div class="controls__color jsColor" style="background-color: white;"></div>
    <div class="controls__color jsColor" style="background-color: #ff3b30;"></div>
    <div class="controls__color jsColor" style="background-color: #ff9500;"></div>
    <div class="controls__color jsColor" style="background-color: #ffcc00;"></div>
    <div class="controls__color jsColor" style="background-color: #4cd963;"></div>
    <div class="controls__color jsColor" style="background-color: #5ac8fa;"></div>
    <div class="controls__color jsColor" style="background-color: #0579ff;"></div>
    <div class="controls__color jsColor" style="background-color: #5856d6;"></div>
  </div>
</div>
```

๐คย Css

```jsx
body{
  background-color: #f6f9fc;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
}

.canvas{ 
  width: 700px;
  height: 700px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.controls{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
}

.controls .controls__btns{
  margin-bottom: 30px;
}
.controls__btns button{
  cursor: pointer;
  all: unset;
  width: 80px;
  padding: 5px 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 2px solid rgba(0, 0, 0, 0.2);
  font-size: 12px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  text-transform: uppercase;
}

.controls__btns button:active{
  transform: scale(0.98);
}

.controls .controls__colors{
  display: flex;
}

.controls__colors .controls__color{
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.controls .controls__range{
  margin-bottom: 30px;
}
```

## Javascript

### 1. Canvas ์ค์ 

```jsx
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const CANVAS_SIZR = 700; // ๊ณตํต ์ฌ์ด์ฆ ์์์ฒ๋ฆฌ 

// ์บ๋ฒ์ค ํฌ๊ธฐ ์ค์ 
canvas.width = CANVAS_SIZR;
canvas.height = CANVAS_SIZR;
```

- context : canvas ํฝ์์ ๋ค๋ฃจ๋๊ฒ. ์ฐ๋ฆฌ๊ฐ ํฝ์์ ์ ๊ทผํ  ์ ์๋ ๋ฐฉ๋ฒ

### 2. Canvas์ ์์์ ๋ง์ฐ์ค ๋ผ์ธ ๊ทธ๋ฆฌ๊ธฐ

```jsx
// strokeStyle ๊ณผ LineWidth ์ด๊ธฐ๊ฐ ์ค์  ----- ํ๋จ .stroke๋ก ์ ๊ทธ๋ฆผ
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

// painting์ด false๋ฉด path๋ง ๊ฐ์ ธ์ค๊ณ , true๋ฉด line์ด ๊ทธ๋ ค์ง๊ฒ ํ๊ธฐ์ํ ์์์ฒ๋ฆฌ
let painting = false;

function startPainting() {
  painting  = true;
}

function stopPainting(){
  painting = false;
}

function onMounseMove(event){
  const x = event.offsetX; // ์บ๋ฒ์ค๋ด์์ ๋ง์ฐ์ค x ๊ฐ
  const y = event.offsetY; // ์บ๋ฒ์ค๋ด์์ ๋ง์ฐ์ค y ๊ฐ
  if( !painting ){ 
    ctx.beginPath();  // Path ์์
    ctx.moveTo(x, y); // path๋ฅผ x y ๊ฐ์ผ๋ก ์ฎ๊น
  } else {
    ctx.lineTo(x, y); // sub-path์ ๋ง์ง๋ง ์ ์ ํน์  ์ขํ์ ์ง์ ์ผ๋ก ์ฐ๊ฒฐ
    ctx.stroke();     // ์  ๊ทธ๋ฆผ
  }
}

// canvas ์์์ event ์ฒ๋ฆฌ
if( canvas ){
  canvas.addEventListener("mousemove", onMounseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
```

### 

- .addEventListener("mousemove", fnc) : ํด๋น ์์ญ ๋ง์ฐ์ค ์ด๋ ์
- .addEventListener("mousedown", fnc) : ํด๋น ์์ญ ๋ง์ฐ์ค ๋ฒํผ ๋๋ฅผ ๋
- .addEventListener("mouseup", fnc) : ํด๋น ์์ญ ๋ง์ฐ์ค ๋ฒํผ ๋ ๋
- .addEventListener("mouseleave", fnc) : ํด๋น ์์ญ ๋ง์ฐ์ค ๋ ๋  ์

- ctx.beginPath() : path๋ฅผ ์์
- ctx.moveTo(x, y) : path๋ฅผ x y ๊ฐ์ผ๋ก ์ฎ๊น
- ctx.lineTo(x, y) : sub-path์ ๋ง์ง๋ง ์ ์ ํน์  ์ขํ์ ์ง์ ์ผ๋ก ์ฐ๊ฒฐ
- ctx.stroke() : ์  ๊ทธ๋ฆผ

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fdcd1bae-d555-4ae1-ac44-2f40836bc7b0/Untitled.png)

### 3. ์ปฌ๋ฌ๋ณ๊ฒฝ

```jsx
// ์ปฌ๋ฌ๊ฐ ์ ์ธ -- ํ๋ฉด ํ๋จ์ ์ปฌ๋ฌ ํ๋ ํธ
const colors = document.getElementsByClassName("jsColor");

// ์ปฌ๋ฌ ์ด๊ธฐ๊ฐ 
const INITIAL_COLOR = "#2c2c2c";

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // strokeStyle ๊ฐ์ ํด๋น ์ปฌ๋ฌ ์์ผ๋ก ๋ณ๊ฒฝ - ๋ผ์ธ ๊ทธ๋ฆด ๋
  ctx.fillStyle = color;   // fill ๊ฐ์ ํด๋น ์ปฌ๋ฌ ์์ผ๋ก ๋ณ๊ฒฝ - ์ฑ์ฐ๊ธฐ ํ  ๋
}

if( colors ){
  Array.from(colors).forEach(color => // color ๋ ๊ทธ array ์์ ์๋ ๊ฐ๊ฐ์ ์์ดํ์ ๋ํ
    color.addEventListener("click", handleColorClick)
  );
}
```

### 4. ๋ธ๋ฌ์ฌ ์ฌ์ด์ฆ ๋ณ๊ฒฝ

```jsx
// input range ์ ์ธ
const range = document.getElementById("jsRange");

function hadleRangeChange(event){
  const size = event.target.value; // range์ ๊ฐ ๊ฐ์ ธ์์
  ctx.lineWidth = size; // ์์์ ์ ์ธํ lineWidth ์ ์ฌ์ด์ฆ ์์ 
}

if( range ){
  range.addEventListener("input", hadleRangeChange);
}
```

### 5. Fill ์ฑ์ฐ๊ธฐ & ์ฑ์ฐ๊ธฐ โย ๋ผ์ธ ์ ํ

```jsx
// fill ๋ฒํผ ์ ์ธ
const mode = document.getElementById("jsMode");

// ์ฑ์ฐ๊ธฐ ์ด๊ธฐ๊ฐ
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZR, CANVAS_SIZR);

let filling = false;

function hadleModeClick(event){
  if( filling === true ){
    filling = false;
    mode.innerText = "Fill"; // ๋ฒํผ ํ์คํธ ๋ณ๊ฒฝ
  } else {
    filling = true;
    mode.innerText = "Paint"; // ๋ฒํผ ํ์คํธ ๋ณ๊ฒฝ
  }
}

function handleCanvasClick() {
	// hadleModeClick ์์ ๋ณ๊ฒฝ๋ filling ๊ฐ ์ฒดํฌํ์ฌ
  if( filling ){ 
		// canvas context ์ฌ๊ฐํ์ผ๋ก ์ฑ์ฐ๊ธฐ (x, y, width, height)
		// ctx.fillStyle ์ผ๋ก ์ค์ ํ ์ปฌ๋ฌ๊ฐ์ผ๋ก ์ฑ์์ง
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if( mode ){
  mode.addEventListener("click", hadleModeClick);
}

if( canvas ){
	// ~~~ 
  canvas.addEventListener("click", handleCanvasClick);
}
```

- ctx.fillStyle = "#fff"  : context fill ์์ ์ง์ 
- ctx.fillRect(0, 0, 700, 700) : context ์์, (x, y, width, height) ๊ฐ์ผ๋ก fill ์์ผ๋ก ๊ทธ๋ ค์ง
    
     โ *์์ ์ ํ๊ณ  > ํด๋น ์์ผ๋ก ๊ทธ๋ ค์ง  == ๋ค์์ ์์ ๋ค์ ์ค์ ํด๋ ์ด๋ฏธ ๊ทธ๋ ค์ง ์์ ๋ณ๊ฒฝ๋์ง ์์*
    

### 6. ๊ทธ๋ฆผ ์ ์ฅํ๊ธฐ

```jsx
// Save ๋ฒํผ ์ ์ธ
const saveBtn = document.getElementById("jsSave");

function handleCM(event) {
  event.preventDefault(); // ์ฌ์ฉ์์ ๋์ ๋ง๊ธฐ = ์ฐํด๋ฆญ ๋ง๊ธฐ
}

function hadleSaveClick() {
  const image = canvas.toDataURL("image/png"); // canvas ์ ๋ด์ฉ์ ๋ฐ์ดํฐ๋ก ๋ฐํ
  const link = document.createElement("a");    // ๊ฐ์์ a๋ฒํผ ์์ฑ
  link.href = image;             // ๊ฐ์์ a์ href ์ด๋ฏธ์ง๋ฐ์ดํฐ๋ก ๋ณ๊ฒฝ
  link.download = "PaintJS[๐จ]"; // ์ ์ฅ๋  ํ์ผ๋ช
  link.click();                  // ๊ฐ์์ a ํด๋ฆญํ์ฌ ํ์ผ ์ ์ฅ ์ ๋
}

if( canvas ){
  // ~~~
  canvas.addEventListener("contextmenu", handleCM);// ํญ๋ชฉ ํด๋ฆญ์ ๋จ๋ ํ์๋ฉ๋ด
}

if( saveBtn ){
  saveBtn.addEventListener("click", hadleSaveClick);
}
```

- .addEventListener("contextmenu", fnc) : ํญ๋ชฉ ํด๋ฆญ์ ๋จ๋ ํ์๋ฉ๋ด (๋ง์ฐ์ค ์ฐํด๋ฆญ์ ๋จ๋ ๋ฉ๋ด ๋ฑ)
- event.preventDefault() : ์ฌ์ฉ์์ ๋์์ ์คํํ์ง ์๋๋ก ์ง์  (ex. ์ฐํด๋ฆญ ๋ฐฉ์ง)

- **HTM. CanvasElement**
    
    : canvas.toDataURL("image/jpeg"); ๋ฅผ ์ฌ์ฉํ๋ฉด canvas ์ ๋ด์ฉ์ ๋ฐ์ดํฐ๋ก ๋ฐํ 
    
    - ์ด๋ฏธ์ง/jpg, png ๋ฑ๋ฑ ์ค์  ๊ฐ๋ฅ
    

### ๐ย ์ต์ข๋ณธ

(์คํฌ๋กค ํ๋ฉด ํ๋ ํธ๋ ๋ฒํผ ๋ฑ์ด ๋์ต๋๋ค)

[https://codepen.io/gyuri-v/pen/abEBjWO](https://codepen.io/gyuri-v/pen/abEBjWO)

### ๐ย ๊ทธ์ธ ๊ธฐ์ตํ๊ธฐ

- ์ฝ๋ ์์ฑ์, ํด๋น ๋ณ์๊ฐ ์ ์ ์ ๋์ด ์๋์ง ์ฒดํฌํ๊ณ  ๋ด์ฉ์ ์์ฑํ๋ฉด ์ข๋ค
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e601093f-bde3-48c6-af7f-23a018c538d4/Untitled.png)
    

- GIT
    - code .    ํด๋น ํด๋๋ก vscode ์ด๊ธฐ
    - rm -rf   ํด๋น ํด๋ ์ญ์ 
