const color = document.querySelectorAll('.color');
const randomButton = document.querySelector('#button-random-color');

function changeBoxColors() {
  for (let index = 1; index < color.length; index += 1) {
    color[index].style.backgroundColor = generateRGB();
  }
}
changeBoxColors();

function generateRGB() {
  colorRGB = 'rgb(';
  colorRGB += Math.floor(Math.random() * 255).toString() + ', ';
  colorRGB += Math.floor(Math.random() * 255).toString() + ', ';
  colorRGB += Math.floor(Math.random() * 255).toString() + ')';
  return colorRGB;
}
// console.log(generateRGB());

randomButton.addEventListener('click', function () {
  changeBoxColors();
});
