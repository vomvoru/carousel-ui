import './style.css'

import Images from '../Images'
import Slide from '../Slide'

const NUM_LEFT_HIDDEN_IMG = 1
const NUM_RIGHT_HIDDEN_IMG = 1

const create = ({
  width,
  height,
  numVisibleLeftImg = 0,
  numVisibleRightImg = 0,
  srcList = [],
}) => {
  const container = document.createElement('div')
  container.className = 'slide-carousel-container'
  container.style.width = width * (numVisibleLeftImg + numVisibleRightImg + 1)

  const numRenderedImage =
    numVisibleLeftImg +
    NUM_LEFT_HIDDEN_IMG + // 왼쪽 이미지 개수
    1 + // 가운데 이미지 개수
    numVisibleRightImg +
    NUM_RIGHT_HIDDEN_IMG // 오른쪽 이미지 개수

  const images = Images.create({
    width,
    height,
    num: numRenderedImage,
    srcList,
  })

  const slide = Slide.create({
    initX: -(width * NUM_LEFT_HIDDEN_IMG),
    moveWidth: width,
  })

  const slideContainer = slide.getContainer()
  const imagesContainer = images.getContainer()

  container.appendChild(slideContainer)
  slideContainer.appendChild(imagesContainer)

  return {
    next: () => slide.moveLeft().then(() => images.next()),
    pre: () => slide.moveRight().then(() => images.pre()),
    addSrc: (...args) => images.addSrc(...args),
    removeSrc: (...args) => images.removeSrc(...args),
    getContainer: () => container,
  }
}

export default {
  create,
}
