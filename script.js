
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

const canvas = document.querySelector('.canvas'); 

const colorSelector = document.querySelector('#colorSelector');
const gridSelector = document.querySelector(`#gridSelector`)
    
    const gridText = document.querySelector('.g-text');
    
    gridSelector.onmousemove = (e) => slideChange(e.target.value);
    // gridSelector.onchange = (e) => slideChange(e.target.value);

    const btnDraw = document.querySelector('.b-draw');
const btnErase = document.querySelector('.b-erase')
const btnClear = document.querySelector('.b-clear');

let brush = colorSelector.value;
let rowSelect = gridSelector.value;
let colSelect = rowSelect;
makeGrid(rowSelect, colSelect);

function makeGrid(rows, cols) { 
    let area = rows * cols; 
    let width = (100 / cols);
    let height = (100 / rows);
    for (let i = 0; i < (area); i++) { 
        const box = document.createElement("div");
        box.classList.add("gridBox");
        box.style['width'] = `${width}%`;
        box.style['height'] = `${height}%`;
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

    



