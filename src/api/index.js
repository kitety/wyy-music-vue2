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
