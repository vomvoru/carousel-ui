import SlideCarousel from './lib/SlideCarousel'
import Slide from './lib/Slide'
import Images from './lib/Images'

const srcList = [
  require('./img/1.jpeg'),
  require('./img/2.jpg'),
  require('./img/3.jpg'),
  require('./img/4.png'),
  require('./img/5.png'),
  require('./img/6.jpg'),
]

const width = 500

const slideCarousel = SlideCarousel.create({
  width,
  height: 300,
  srcList,
})

const slideCarousel2 = SlideCarousel.create({
  width: 100,
  height: 60,
  numVisibleLeftImg: 2,
  numVisibleRightImg: 2,
  srcList,
})

const slideCarousel3 = SlideCarousel.create({
  width: 100,
  height: 60,
  numVisibleLeftImg: 3,
  numVisibleRightImg: 3,
  numHiddenLeftImg: 0,
  numHiddenRightImg: 0,
  srcList,
})

const slideCarousel4 = SlideCarousel.create({
  width: 100,
  height: 60,
  numVisibleLeftImg: 2,
  numVisibleRightImg: 2,
  srcList,
})

const slideCarousel5 = SlideCarousel.create({
  width,
  height: 300,
  bothVisibleWidth: 50,
  numHiddenLeftImg: 2,
  numHiddenRightImg: 2,
  srcList,
})

const images = Images.create({
  width: 100,
  height: 60,
  num: 7,
  srcList,
  startIndex: -3,
})

const slide = Slide.create({
  initX: -100,
  moveWidth: 100,
})
const slideContainer = slide.getContainer()
slideContainer.className = 'box'
const slideContainerWrap = document.createElement('div')
slideContainerWrap.style.width = width
slideContainerWrap.appendChild(slideContainer)

const app = document.getElementById('app')
const h11 = document.createElement('h1')
h11.textContent = '예시'
app.appendChild(h11)
app.appendChild(slideCarousel.getContainer())
app.appendChild(slideCarousel2.getContainer())
const h12 = document.createElement('h1')
h12.textContent = '원리'
app.appendChild(h12)
app.appendChild(images.getContainer())
app.appendChild(slideContainerWrap)
app.appendChild(slideCarousel3.getContainer())
app.appendChild(slideCarousel4.getContainer())
const h13 = document.createElement('h1')
h13.textContent = '옵션변경'
app.appendChild(h13)
app.appendChild(slideCarousel5.getContainer())

const next = document.getElementById('next')
const pre = document.getElementById('pre')

next.addEventListener('click', () => {
  slideCarousel.next()
  slideCarousel2.next()
  slideCarousel3.next()
  slideCarousel4.next()
  slideCarousel5.next()
  slide.moveLeft().then(() => {
    images.next()
  })
})

pre.addEventListener('click', () => {
  slideCarousel.pre()
  slideCarousel2.pre()
  slideCarousel3.pre()
  slideCarousel4.pre()
  slideCarousel5.pre()
  slide.moveRight().then(() => {
    images.pre()
  })
})
