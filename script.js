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

function storeColors() {
  const colorPalette = [];
  for (let index = 1; index < color.length; index += 1) {
    colorPalette[index - 1] = color[index].style.backgroundColor;
  }
  return colorPalette;
}

randomButton.addEventListener('click', () => {
  changeBoxColors();
  localStorage.setItem('colorPalette', JSON.stringify(storeColors()));
});

function initialColors() {
  if (localStorage.getItem('colorPalette')) {
    const colorPalette = JSON.parse(localStorage.getItem('colorPalette'));

    for (let index = 1; index < color.length; index += 1) {
      color[index].style.backgroundColor = colorPalette[index - 1];
    }
  } else {
    changeBoxColors();
  }
}

function generatePixelBoard(number) {
  const pixelBoard = document.querySelector('#pixel-board');
  const size = number;
  pixelBoard.style.height = `${size * 42}px`;
  pixelBoard.style.width = `${size * 42}px`;

  for (let index = 0; index < size * size; index += 1) {
    pixelBoard.appendChild(document.createElement('div'));
    pixelBoard.lastChild.className = 'pixel';
  }
}

generateBoardButton.addEventListener('click', () => {
  const input = document.querySelector('#board-size');
  const pixelBoard = document.querySelector('#pixel-board');

  if (input.value === '') {
    alert('Board inválido!');
  } else if (input.value > 0) {
    pixelBoard.innerHTML = '';
    generatePixelBoard(input.value);
    clearBoard();
  }
});

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

function pixelPaint() {
  const pixel = document.querySelectorAll('.pixel');
  pixel.forEach((element) => {
    element.addEventListener('click', () => {
      const selectedColor =
        document.querySelector('.selected').style.backgroundColor;
      element.style.setProperty('background-color', selectedColor);
      saveArt();
    });
  });
}

document.querySelector('#clear-board').addEventListener('click', clearBoard);

function restoreArt() {
  const pixel = document.querySelectorAll('.pixel');
  const board = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let index = 0; index < board.length; index += 1) {
    pixel[index].style.backgroundColor = board[index];
  }
}

window.onload = () => {
  initialColors();
  generatePixelBoard(5);

  if (localStorage.getItem('pixelBoard') === null) {
    clearBoard();
  } else {
    restoreArt();
  }
  pixelPaint();
};
