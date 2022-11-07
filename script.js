const DEFAULT_COLOR = '#333333';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) { 
    currentColor = newColor
}

function setCurrentMode(newMode) { // mode changer that stores var
    modeChangeClick(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

const grid = document.getElementById('grid');
const colorBtn = document.getElementById('colorBtn');
const randomBtn = document.getElementById('randomBtn');
const sizeBtn = document.getElementById('sizeBtn');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
randomBtn.onclick = () => setCurrentMode('random');

sizeBtn.onclick = (e) => changeSize(e.target.value);

let mouseDown = false; // when page loads you cant draw on grid accidentally
document.body.onmousedown = () => (mouseDown = true); // can draw
document.body.onmouseup = () => (mouseDown = false); // cant draw

function createGrid(gridSize) {
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; 
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < (gridSize * gridSize); i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover' , colorChoice) // both event listeners to update bground colour
        gridElement.addEventListener('mousedown' , colorChoice)
        grid.appendChild(gridElement);
    }
}

function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
}

function updateSizeValue() {
    sizeValue.innerHTML = `${value} x ${value}`
}

function colorChoice(e) { // e is the let value that holds the colour
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'random') {
        let randomR = Math.floor(Math.random() * 255);
        let randomG = Math.floor(Math.random() * 255);
        let randomB = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } 
}

function modeChangeClick(newMode) {
    if (currentMode === 'random') {
        randomBtn.classList.remove('active')
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    } 

    if (newMode === 'random') {
        randomBtn.classList.add('active')
    } else if (newMode === 'color') {
        colorBtn.classList.add('active')
    }
}

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    modeChangeClick(DEFAULT_MODE);
}