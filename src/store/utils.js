const extractLrcRegex =
  /^(?<lyricTimestamps>(?:\[.+?\])+)(?!\[)(?<content>.+)$/gm
const extractTimestampRegex =
  /\[(?<min>\d+):(?<sec>\d+)(?:\.|:)*(?<ms>\d+)*\]/g

export function parseLyric (lrc) {
  console.log('lrc', lrc)
  // return {}
  /**
   * A sorted list of parsed lyric and its timestamp.
   *
   * @type {ParsedLyric[]}
   * @see binarySearch
   */
  const parsedLyrics = []

  /**
   * Find the appropriate index to push our parsed lyric.
   * @param {ParsedLyric} lyric
   */
  const binarySearch = lyric => {
    const time = lyric.time

    let low = 0
    let high = parsedLyrics.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const midTime = parsedLyrics[mid].time
      if (midTime === time) {
        return mid
      } else if (midTime < time) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    return low
  }

  for (const line of lrc.trim().matchAll(extractLrcRegex)) {
    const {
      lyricTimestamps,
      content
    } = line.groups

    for (const timestamp of lyricTimestamps.matchAll(extractTimestampRegex)) {
      const {
        min,
        sec,
        ms
      } = timestamp.groups
      const rawTime = timestamp[0]
      const time = Number(min) * 60 + Number(sec) + Number(ms ?? 0) * 0.001

      /** @type {ParsedLyric} */
      const parsedLyric = {
        rawTime,
        time,
        content: trimContent(content)
      }
      parsedLyrics.splice(binarySearch(parsedLyric), 0, parsedLyric)
    }
  }

  return parsedLyrics
}

/**
 * @param {string} content
 * @returns {string}
 */
function trimContent (content) {
  const t = content.trim()
  return t.length < 1 ? content : t
}
