const toggle = document.querySelector('.slider__range');
const rightImage = document.querySelector('.slider__right');
const catFigure = document.querySelectorAll('.slider__cat');

toggle.value = 50;

const imgWidth = 400;
const toggleMaxValue = 100;
const step = imgWidth / toggleMaxValue;

toggle.addEventListener('input', (e) => {
  catFigure[1].style.width = e.target.value * step + 'px';
  rightImage.style.right = imgWidth - (e.target.value * step) + 'px';
})

const mapImage = document.querySelector('.footer__img');

window.addEventListener('resize', () => {
  if(window.innerWidth < 1022) {
    mapImage.src = "./assets/images/map-tablet.png"
  } else {
    mapImage.src = "./assets/images/map.png"
  }
})