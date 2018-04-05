import './style.css'

const create = ({ initX, moveWidth, duration = 500 }) => {
  const initTransform = `translateX(${initX}px)`

  const container = document.createElement('div')
  container.className = 'slide-container'
  container.style.transform = initTransform

  let callStack = Promise.resolve()

  const moveX = (targetX) => {
    callStack = callStack.then(() => new Promise((resolve) => {
      container.animate([
        { transform: initTransform },
        { transform: `translateX(${targetX}px)` },
      ], {
        duration,
      }).addEventListener('finish', () => resolve())
    }))

    return callStack
  }

  const moveLeft = () => moveX(initX - moveWidth)
  const moveRight = () => moveX(initX + moveWidth)

  return {
    moveLeft,
    moveRight,
    getContainer: () => container,
  }
}

export default {
  create,
}
