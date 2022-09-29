// 根据秒钟格式化为'00:00'
export const index = (time) => {
  const base = 60
  const min = String(parseInt(time / base)).padStart(2, '0')
  const ss = String(parseInt(time % base)).padStart(2, '0')
  return `${min}:${ss}`
}

// generate random base min max
export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
