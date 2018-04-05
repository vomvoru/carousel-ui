import './style.css'

import Images from '../Images'
import Slide from '../Slide'

const create = ({
  width,
  height,
  startCenterIndex = 0,
  numVisibleLeftImg = 0,
  numVisibleRightImg = 0,
  numHiddenLeftImg = 1,
  numHiddenRightImg = 1,
  srcList = [],
  bothVisibleWidth = 0,
}) => {
  const container = document.createElement('div')
  container.className = 'slide-carousel-container'
  container.style.width = (width * (numVisibleLeftImg + numVisibleRightImg + 1)) + (bothVisibleWidth * 2)

  const numRenderedImage =
    numVisibleLeftImg +
    numHiddenLeftImg + // 왼쪽 이미지 개수
    1 + // 가운데 이미지 개수
    numVisibleRightImg +
    numHiddenRightImg // 오른쪽 이미지 개수

  const startIndex = -(numVisibleLeftImg + numHiddenLeftImg)
  const images = Images.create({
    width,
    height,
    num: numRenderedImage,
    srcList,
    startIndex,
  })
  console.log(startIndex)
  const slide = Slide.create({
    initX: -(width * numHiddenLeftImg) + bothVisibleWidth,
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
