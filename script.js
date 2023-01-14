
/* PSUEDO

    create DOM objects holding: 
        canvas 
        color picker 
        grid slider 
        draw button 
        eraser button 
        clear button 

    create a color object, like stencil to hold color value; 
    createa row / col object from the slider 

    create a gird with a function accepting rows and columns;
        builds a grid of divs 

        fix here was having added 
            box-sizing: border-box
            to the gridBox style as this accounts for padding and 
            border pixel sizing when trying to fit in the canvas

    styling object holding 
        grid box style 
            we can specify the width and height 
            given the grid slider size

    
*/


// consts 
const CANVAS_COLOR = 'rgba(246, 235, 235, 0.938)'

// DOM elements 
const canvas = document.querySelector('.canvas'); 

const colorSelector = document.querySelector('#colorSelector');
const gridSelector = document.querySelector(`#gridSelector`) 
    const gridText = document.querySelector('.g-text');

const btnDraw = document.querySelector('#b-draw');
const btnErase = document.querySelector('#b-erase');
    btnErase.classList.toggle('btnOn');
const btnClear = document.querySelector('#b-clear');

// function parameters 
let paintMode = false;
    document.body.onmousedown = () => (paintMode = true);
    document.body.onmouseup = () => (paintMode = false);
let brush = colorSelector.value;
let lastGrid = gridSelector.value;
let rowSelect = gridSelector.value;
let colSelect = rowSelect;
makeGrid(rowSelect, colSelect);

// functions 
function makeGrid(rows, cols) { 
    
    let area = rows * cols; 
    let width = (100 / cols);
    let height = (100 / rows);
    for (let i = 0; i < (area); i++) { 
        const box = document.createElement("div");
        box.classList.add("gridBox");
        box.style['width'] = `${width}%`;
        box.style['height'] = `${height}%`;
        box.addEventListener('mousedown', (e) => {
            box.style['background-color'] = brush;
        });
        box.addEventListener('mouseover', (e) => {
            if (!paintMode) return;
            box.style['background-color'] = brush;
        });
        canvas.appendChild(box);
    }
  
}

function slideChange(value) { 
    rowSelect = value;
    colSelect = value;
    gridText.textContent = `grid size: ${value} x ${value}`;

    while (canvas.firstChild) { 
        canvas.removeChild(canvas.firstChild);
    }
    makeGrid(rowSelect, colSelect);
}

function clearGrid() { 
    const grid = document.querySelectorAll(".gridBox");
    grid.forEach(box => { 
        box.style['background-color'] = CANVAS_COLOR;
    });
}


// event listeners 

colorSelector.addEventListener("input", (e) => {
    brush = e.target.value;
    
});

btnDraw.addEventListener("click", (e) => {
    brush = colorSelector.value;

    if (!btnDraw.className) {btnDraw.classList.toggle('btnOn');}
    if (btnErase.className) {btnErase.classList.toggle('btnOn');}
});

btnErase.addEventListener("click", () => { 
    brush = CANVAS_COLOR;

    if (!btnErase.className) {btnErase.classList.toggle('btnOn');}
    if (btnDraw.className) {btnDraw.classList.toggle('btnOn');}
});

btnClear.addEventListener("click", clearGrid);

gridSelector.addEventListener('mousemove', (e) => {
    if (e.target.value == lastGrid) return;
    slideChange(e.target.value);
    lastGrid = e.target.value;
});