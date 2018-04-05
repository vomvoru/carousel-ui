import './style.css'
import getFixedIndex from '../getFixedIndex'

const create = ({
  width, height, num, srcList, startIndex = 0,
}) => {
  const resetWidth = () => {
    container.style.width = width * num
  }

  const getImage = (index) => {
    const fixedIndex = getFixedIndex(srcList, index)

    const src = srcList[fixedIndex]
    const image = new Image(width, height)
    image.src = src

    return image
  }

  const next = () => {
    current += 1

    const newImage = getImage(current + (num - 1))
    container.insertAdjacentElement('beforeend', newImage)

    const firstImage = container.querySelector('img:first-child')
    firstImage.remove()
  }

  const pre = () => {
    current -= 1

    const newImage = getImage(current)
    container.insertAdjacentElement('afterbegin', newImage)

    const lastImage = container.querySelector('img:last-child')
    lastImage.remove()
  }

  const container = document.createElement('div')
  container.className = 'images-container'
  resetWidth()

  let current = startIndex
  for (let i = 0; i < num; i += 1) {
    const image = getImage(current + i)
    container.insertAdjacentElement('beforeend', image)
  }
  // current += num

  return {
    next,
    pre,
    addSrc: (src) => {
      srcList.psuh(src)
      resetWidth()
    },
    removeSrc: (targetSrc) => {
      srcList = srcList.filter(src => src === targetSrc)
      resetWidth()
    },
    getContainer: () => container,
  }
}

export default {
  create,
}
