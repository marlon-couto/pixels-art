const color = document.querySelectorAll('.color');
const randomButton = document.querySelector('#button-random-color');

window.onload = function () {
  initialColors();
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
