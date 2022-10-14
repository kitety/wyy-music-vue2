import { axiosInstance } from './network'

export const getBanner = () => axiosInstance.get('/banner?type=2')
export const getPersonalized = () => axiosInstance.get('/personalized?limit=6')
export const getAlbumLNewest = () => axiosInstance.get('/album/newest')
export const getNewSong = () => axiosInstance.get('/personalized/newsong')
export const getPlayListDetailById = (id) => axiosInstance.get(`/playlist/detail?id=${id}`)
export const getAlbum = (id) => axiosInstance.get(`/album?id=${id}`)
export const getSongDetail = (ids) => axiosInstance.get(`/song/detail?ids=${ids}`)
export const getSongLyric = (id) => axiosInstance.get(`/lyric?id=${id}`)
export const getSongUrl = (id) => axiosInstance.get(`/song/url?id=${id}`)
export const getHotArtists = async () => {
  const data = await axiosInstance.get('/top/artists?offset=0&limit=30')
  return data.artists
}
export const getSingByLetter = async (letter) => {
  const data = []
  const ids = [1001, 1002, 1003, 2001, 2002, 2003]
  const promises = ids.map(id => axiosInstance.get(`/artist/list?offset=0&limit=5&cat=${id}&initial=${letter}`))
  const promiseData = await Promise.all(promises)
  const promiseArr = promiseData.flat()
  promiseArr.forEach(item => {
    data.push(...item.artists)
  })
  return data
}
export const getSingAllLetters = async () => {
  const alphabet = ['热']
  const promises = [getHotArtists()]
  for (let i = 65; i < 91; i++) {
    const key = String.fromCharCode(i)
    alphabet.push(key)
    promises.push(getSingByLetter(key))
  }
  const singers = await Promise.all(promises)
  return {
    alphabet,
    singers
  }
}
export const getArtistSongs = (id) => axiosInstance.get(`/artists?id=${id}`)
