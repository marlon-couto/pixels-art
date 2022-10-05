const randomButton = document.querySelector('#button-random-color');
const color = document.querySelectorAll('.color');
color[0].className = 'color selected';
color[0].style.backgroundColor = 'black';

window.onload = function () {
  initialColors();
  generatePixelBoard();
  clearBoard();
  pixelPaint();
};

function changeBoxColors() {
  for (let index = 1; index < color.length; index += 1) {
    color[index].style.backgroundColor = generateRGB();
  }
}

function generateRGB() {
  colorRGB = 'rgb(';
  colorRGB += Math.floor(Math.random() * 255).toString() + ', ';
  colorRGB += Math.floor(Math.random() * 255).toString() + ', ';
  colorRGB += Math.floor(Math.random() * 255).toString() + ')';
  return colorRGB;
}

randomButton.addEventListener('click', function () {
  changeBoxColors();
  localStorage.setItem('colorPalette', JSON.stringify(storeColors()));
});

function storeColors() {
  let colorPalette = [];

  for (let index = 1; index < color.length; index += 1) {
    colorPalette[index - 1] = color[index].style.backgroundColor;
  }
  return colorPalette;
}

function initialColors() {
  if (localStorage.getItem('colorPalette')) {
    let colorPalette;
    colorPalette = JSON.parse(localStorage.getItem('colorPalette'));

    for (let index = 1; index < color.length; index += 1) {
      color[index].style.backgroundColor = colorPalette[index - 1];
    }
  } else {
    changeBoxColors();
  }
}

function generatePixelBoard() {
  const pixelBoard = document.querySelector('#pixel-board');
  const size = 5;
  pixelBoard.style.height = (size * 42).toString() + 'px';
  pixelBoard.style.width = (size * 42).toString() + 'px';

  for (let index = 0; index < size * size; index += 1) {
    pixelBoard.appendChild(document.createElement('div'));
    pixelBoard.lastChild.className = 'pixel';
  }
}

function clearBoard() {
  const pixel = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
}

for (const element of color) {
  element.addEventListener('click', function (event) {
    event.target.className = 'color selected';
    for (let index = 0; index < color.length; index += 1) {
      if (color[index] !== event.target) {
        color[index].className = 'color';
      }
    }
  });
}

function pixelPaint() {
  const pixel = document.querySelectorAll('.pixel');

  for (const element of pixel) {
    element.addEventListener('click', function (event) {
      event.target.style.backgroundColor =
        document.querySelector('.selected').style.backgroundColor;
    });
  }
}
