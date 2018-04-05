export default (array, index) => {
  const len = array.length
  return (len + (index % len)) % len
}
