// Global variables
let currentGridSize = 16;
let mouseDown = false;
let eraserState = false;

// Adds a global event listener that tracks mouse state
listenForMouseState();

// The sketch area has a mouseover event
const sketchArea = document.getElementById('sketchArea');
sketchArea.addEventListener('mouseover', onHover);
sketchArea.addEventListener('mousedown', onClick);

// Create and assign functions to buttons
document.getElementById("newButton").onclick = newSketchArea;
document.getElementById("eraserButton").onclick = toggleEraser;
document.getElementById("clearButton").onclick = resetPixels;

// Initialize grid
createSketchGrid(16);


function listenForMouseState() {
  document.addEventListener('mousedown', (e) => {
    mouseDown = true;
    console.log(mouseDown);
  });

  document.addEventListener('mouseup', (e) => {
    mouseDown = false;
    console.log(mouseDown);
  });
}

function createSketchGrid(gridSize) {
  // First, we have to set the size of the pixels by
  // changing the CSS gridSize
  document.querySelector(":root").style.setProperty('--gridSize', gridSize);

  // The traditional method of creating a matrix is to
  // use a nested for loop.
  for (let i = 0; i < gridSize; i++) {
    row = document.createElement("DIV");
    sketchArea.appendChild(row);
    row.className = "row";

    for (let i = 0; i < gridSize; i++) {
      pixel = document.createElement("DIV");
      row.appendChild(pixel);
      pixel.className = "sketchPixel";
      // sketchArea.innerHTML += '<div class="sketchPixel"></div>'
    }
  }
}

function removeSketchGrid() {
  document.querySelectorAll('.sketchPixel').forEach(e => e.remove());
  document.querySelectorAll('.row').forEach(e => e.remove());
}

function newSketchArea() {
  let gridSize = prompt("Enter resolution (1-128): ",`${currentGridSize}`);
  if (gridSize === null) return;
  gridSize = parseInt(gridSize);
  if (typeof(gridSize) !== "number") return;
  if (gridSize > 128) gridSize = 128;
  if (gridSize < 1) gridSize = 1;
  removeSketchGrid();
  createSketchGrid(gridSize);
  currentGridSize = gridSize;
}

function toggleEraser() {
  eraserState = !eraserState;
  const eraserStyle = document.querySelector("#eraserButton").style;
  if (eraserState) {
    eraserStyle.setProperty("color", "rgb(232, 232, 232)")
    eraserStyle.setProperty("background-color", "rgb(8, 8, 8)")
  } else {
    eraserStyle.setProperty("color", "rgb(8, 8, 8)")
    eraserStyle.setProperty("background-color", "rgb(232, 232, 232)")
  }
}

function resetPixels() {
  let confirmation = prompt("Are you sure? (y/n)");
  if (confirmation[0].toLowerCase() !== "y") return;
  document.querySelectorAll('.sketchPixel').forEach(e => e.style.setProperty(
    'background-color', 'rgb(232, 232, 232)'
  ));
}



function onHover(e) {
  // We should only draw if the mouse button is down
  if (!mouseDown) return;
  if (e.target.className !== "sketchPixel") return;
  if (eraserState) {
    e.target.style.backgroundColor = "rgba(232, 232, 232, 1.0)";
    return;
  } else {
    e.target.style.backgroundColor = "rgba(0, 0, 0, 1.0)";
  }

}

function onClick(e) {
  if (e.target.className !== "sketchPixel") return;
  if (eraserState) {
    e.target.style.backgroundColor = "rgba(232, 232, 232, 1.0)";
    return;
  } else {
    e.target.style.backgroundColor = "rgba(0, 0, 0, 1.0)";
  }
}


// no longer needed
// function removeGridLines() {
//   document.querySelectorAll(".sketchPixel").forEach(e => e.style.setProperty(
//     'border-color', 'rgb(232, 232, 232)'
//   ));
// }

