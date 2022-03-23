💛 노마드코더 - 바닐라 JS 그림판
===========================================


📅  2022.03.24 

⏰. 강의 1시간 / 소요시간 2시간

[바닐라 JS로 그림판 만들기 - 노마드 코더 Nomad Coders](https://nomadcoders.co/javascript-for-beginners-2)

## HTML / CSS

🤍  HTML

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

🤍 Css

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

### 1. Canvas 설정

```jsx
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const CANVAS_SIZR = 700; // 공통 사이즈 상수처리 

// 캔버스 크기 설정
canvas.width = CANVAS_SIZR;
canvas.height = CANVAS_SIZR;
```

- context : canvas 픽셀을 다루는것. 우리가 픽셀에 접근할 수 있는 방법

### 2. Canvas에 안에서 마우스 라인 그리기

```jsx
// strokeStyle 과 LineWidth 초기값 설정 ----- 하단 .stroke로 선그림
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

// painting이 false면 path만 가져오고, true면 line이 그려지게 하기위한 상수처리
let painting = false;

function startPainting() {
  painting  = true;
}

function stopPainting(){
  painting = false;
}

function onMounseMove(event){
  const x = event.offsetX; // 캔버스내에서 마우스 x 값
  const y = event.offsetY; // 캔버스내에서 마우스 y 값
  if( !painting ){ 
    ctx.beginPath();  // Path 시작
    ctx.moveTo(x, y); // path를 x y 값으로 옮김
  } else {
    ctx.lineTo(x, y); // sub-path의 마지막 점을 특정 좌표와 직선으로 연결
    ctx.stroke();     // 선 그림
  }
}

// canvas 안에서 event 처리
if( canvas ){
  canvas.addEventListener("mousemove", onMounseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
```

### 

- .addEventListener("mousemove", fnc) : 해당 영역 마우스 이동 시
- .addEventListener("mousedown", fnc) : 해당 영역 마우스 버튼 누를 때
- .addEventListener("mouseup", fnc) : 해당 영역 마우스 버튼 뗄 때
- .addEventListener("mouseleave", fnc) : 해당 영역 마우스 떠날 시

- ctx.beginPath() : path를 시작
- ctx.moveTo(x, y) : path를 x y 값으로 옮김
- ctx.lineTo(x, y) : sub-path의 마지막 점을 특정 좌표와 직선으로 연결
- ctx.stroke() : 선 그림

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fdcd1bae-d555-4ae1-ac44-2f40836bc7b0/Untitled.png)

### 3. 컬러변경

```jsx
// 컬러값 선언 -- 화면 하단의 컬러 팔레트
const colors = document.getElementsByClassName("jsColor");

// 컬러 초기값 
const INITIAL_COLOR = "#2c2c2c";

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // strokeStyle 값을 해당 컬러 색으로 변경 - 라인 그릴 때
  ctx.fillStyle = color;   // fill 값을 해당 컬러 색으로 변경 - 채우기 할 때
}

if( colors ){
  Array.from(colors).forEach(color => // color 는 그 array 안에 있는 각가의 아이템을 대표
    color.addEventListener("click", handleColorClick)
  );
}
```

### 4. 브러쉬 사이즈 변경

```jsx
// input range 선언
const range = document.getElementById("jsRange");

function hadleRangeChange(event){
  const size = event.target.value; // range의 값 가져와서
  ctx.lineWidth = size; // 위에서 선언한 lineWidth 의 사이즈 수정
}

if( range ){
  range.addEventListener("input", hadleRangeChange);
}
```

### 5. Fill 채우기 & 채우기 ↔ 라인 전환

```jsx
// fill 버튼 선언
const mode = document.getElementById("jsMode");

// 채우기 초기값
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZR, CANVAS_SIZR);

let filling = false;

function hadleModeClick(event){
  if( filling === true ){
    filling = false;
    mode.innerText = "Fill"; // 버튼 텍스트 변경
  } else {
    filling = true;
    mode.innerText = "Paint"; // 버튼 텍스트 변경
  }
}

function handleCanvasClick() {
	// hadleModeClick 에서 변경된 filling 값 체크하여
  if( filling ){ 
		// canvas context 사각형으로 채우기 (x, y, width, height)
		// ctx.fillStyle 으로 설정한 컬러값으로 채워짐
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

- ctx.fillStyle = "#fff"  : context fill 색상 지정
- ctx.fillRect(0, 0, 700, 700) : context 안에, (x, y, width, height) 값으로 fill 색으로 그려짐
    
     → *색을 정하고 > 해당 색으로 그려짐  == 뒤에서 색을 다시 설정해도 이미 그려진 색은 변경되지 않음*
    

### 6. 그림 저장하기

```jsx
// Save 버튼 선언
const saveBtn = document.getElementById("jsSave");

function handleCM(event) {
  event.preventDefault(); // 사용자의 동작 막기 = 우클릭 막기
}

function hadleSaveClick() {
  const image = canvas.toDataURL("image/png"); // canvas 의 내용을 데이터로 반환
  const link = document.createElement("a");    // 가상의 a버튼 생성
  link.href = image;             // 가상의 a에 href 이미지데이터로 변경
  link.download = "PaintJS[🎨]"; // 저장될 파일명
  link.click();                  // 가상의 a 클릭하여 파일 저장 유도
}

if( canvas ){
  // ~~~
  canvas.addEventListener("contextmenu", handleCM);// 항목 클릭시 뜨는 팝업메뉴
}

if( saveBtn ){
  saveBtn.addEventListener("click", hadleSaveClick);
}
```

- .addEventListener("contextmenu", fnc) : 항목 클릭시 뜨는 팝업메뉴 (마우스 우클릭시 뜨는 메뉴 등)
- event.preventDefault() : 사용자의 동작을 실행하지 않도록 지정 (ex. 우클릭 방지)

- **HTM. CanvasElement**
    
    : canvas.toDataURL("image/jpeg"); 를 사용하면 canvas 의 내용을 데이터로 반환 
    
    - 이미지/jpg, png 등등 설정 가능
    

### 👑 최종본

(스크롤 하면 팔레트랑 버튼 등이 나옵니다)

[https://codepen.io/gyuri-v/pen/abEBjWO](https://codepen.io/gyuri-v/pen/abEBjWO)

### 📝 그외 기억하기

- 코드 작성시, 해당 변수가 잘 정의 되어 있는지 체크하고 내용을 작성하면 좋다
    
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e601093f-bde3-48c6-af7f-23a018c538d4/Untitled.png)
    

- GIT
    - code .    해당 폴더로 vscode 열기
    - rm -rf   해당 폴더 삭제
