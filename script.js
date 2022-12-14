const DEFAULT_COLOR = '#333333';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let promptCurrentSize = currentSize;

function setCurrentColor(newColor) { 
    currentColor = newColor
}

function setCurrentMode(newMode) { // mode changer that stores var
    modeChangeClick(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) { // size var storage currently unused code
    currentSize = newSize
}

const grid = document.getElementById('grid');
const colorBtn = document.getElementById('colorBtn');
const randomBtn = document.getElementById('randomBtn');
const sizeBtn = document.getElementById('sizeBtn');
const clearBtn = document.getElementById('clearBtn');

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
randomBtn.onclick = () => setCurrentMode('random');
clearBtn.onclick = () => refreshGrid();
deleteBtn.onclick = () => setCurrentMode('eraser');

function updateSize() { // size update and window alert limiting grid number
    let promptCurrentSize = prompt('size');
    let currentSize = parseInt(promptCurrentSize, 10);
    if (isNaN(currentSize)) {
        window.alert("You must enter a positive integer. (Maximum 100)");
        return
    } else if (currentSize <= 0) {
        window.alert("You must enter a positive integer. (Maximum 100)");
        return
    } else if (currentSize > 100) {
        window.alert("You must enter a positive integer. (Maximum 100)");
        return
    }
    createGrid(currentSize)
}

let mouseDown = false; // when page loads you cant draw on grid accidentally
document.body.onmousedown = () => (mouseDown = true); // can draw
document.body.onmouseup = () => (mouseDown = false); // cant draw

function createGrid(gridSize) {
    grid.style.gridTemplateColumns = `repeat(${gridSize || currentSize}, 1fr)`; 
    grid.style.gridTemplateRows = `repeat(${gridSize || currentSize}, 1fr)`;
    for (let i = 0; i < (gridSize * gridSize || currentSize * currentSize); i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover' , colorChoice) // both event listeners to update bground colour
        gridElement.addEventListener('mousedown' , colorChoice)
        grid.appendChild(gridElement);
    }
}

function refreshGrid() {
    clearGrid()
    //createGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
    //console.log(currentSize)
    createGrid(promptCurrentSize)
    console.log(promptCurrentSize)
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
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'lightgrey';
    }
}

function modeChangeClick(newMode) { // this stores all the modes and allows me to create more options with ease
    if (currentMode === 'random') {
        randomBtn.classList.remove('active')
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
        deleteBtn.classList.remove('active')
    }

    if (newMode === 'random') {
        randomBtn.classList.add('active')
    } else if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        deleteBtn.classList.add('active')
    }
}

window.onload = () => {
    createGrid(DEFAULT_SIZE);
    modeChangeClick(DEFAULT_MODE);
}