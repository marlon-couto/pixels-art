const randomButton = document.querySelector('#button-random-color');
const generateBoardButton = document.querySelector('#generate-board');
const color = document.querySelectorAll('.color');
color[0].className = 'color selected';
color[0].style.backgroundColor = 'black';

function generateRGB() {
  const firstRGB = Math.floor(Math.random() * 255).toString();
  const secondRGB = Math.floor(Math.random() * 255).toString();
  const thirdRGB = Math.floor(Math.random() * 255).toString();
  const colorRGB = `rgb(${firstRGB}, ${secondRGB}, ${thirdRGB})`;
  return colorRGB;
}

function changeBoxColors() {
  for (let index = 1; index < color.length; index += 1) {
    color[index].style.backgroundColor = generateRGB();
  }
}

function saveColors() {
  const colorPalette = [];
  for (let index = 1; index < color.length; index += 1) {
    colorPalette[index - 1] = color[index].style.backgroundColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(colorPalette));
}

randomButton.addEventListener('click', () => {
  changeBoxColors();
  saveColors();
});

function initialColors() {
  if (localStorage.getItem('colorPalette')) {
    const colorPalette = JSON.parse(localStorage.getItem('colorPalette'));

    for (let index = 1; index < color.length; index += 1) {
      color[index].style.backgroundColor = colorPalette[index - 1];
    }
  } else {
    changeBoxColors();
    saveColors();
  }
}

function saveBoard(inputValue) {
  localStorage.setItem('boardSize', inputValue);
}

function generatePixelBoard(size) {
  const pixelBoard = document.querySelector('#pixel-board');
  pixelBoard.style.height = `${size * 42}px`;
  pixelBoard.style.width = `${size * 42}px`;

  for (let index = 0; index < size * size; index += 1) {
    pixelBoard.appendChild(document.createElement('div'));
    pixelBoard.lastChild.className = 'pixel';
  }
  saveBoard(size);
}

function saveArt() {
  const pixel = document.querySelectorAll('.pixel');
  const board = [];
  pixel.forEach((element) => {
    board.push(element.style.backgroundColor);
  });
  localStorage.setItem('pixelBoard', JSON.stringify(board));
}

function clearBoard() {
  const pixel = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
  saveArt();
}

function pixelPaint() {
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach((element) => {
    element.addEventListener('click', () => {
      const select = document.querySelector('.selected').style.backgroundColor;
      element.style.setProperty('background-color', select);
      saveArt();
    });
  });
}

function newBoard() {
  const input = document.querySelector('#board-size');
  const pixelBoard = document.querySelector('#pixel-board');
  pixelBoard.innerHTML = '';
  if (input.value >= 5 && input.value <= 50) {
    generatePixelBoard(input.value);
  } else if (input.value < 5) {
    generatePixelBoard(5);
  } else if (input.value > 50) {
    generatePixelBoard(50);
  }
  clearBoard();
  pixelPaint();
}

generateBoardButton.addEventListener('click', () => {
  const input = document.querySelector('#board-size');

  if (input.value === '') {
    alert('Board inválido!');
  } else {
    newBoard();
  }
});

color.forEach((element) => {
  element.addEventListener('click', () => {
    element.classList.add('selected');
    for (let index = 0; index < color.length; index += 1) {
      if (color[index] !== element) {
        color[index].classList.remove('selected');
      }
    }
  });
});

document.querySelector('#clear-board').addEventListener('click', clearBoard);

function restoreArt() {
  const pixel = document.querySelectorAll('.pixel');
  const board = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < board.length; index += 1) {
    pixel[index].style.backgroundColor = board[index];
  }
}

function restoreBoard() {
  const boardSize = JSON.parse(localStorage.getItem('boardSize'));
  generatePixelBoard(boardSize);
}

window.onload = () => {
  initialColors();

  if (localStorage.getItem('boardSize') === null) {
    generatePixelBoard(5);
  } else {
    restoreBoard();
  }
  if (localStorage.getItem('pixelBoard') === null) {
    clearBoard();
  } else {
    restoreArt();
  }
  pixelPaint();
};
