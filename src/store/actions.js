import {
  GET_CURRENT_TIME,
  SET_CURRENT_SONG,
  SET_DELETE_SONG,
  SET_FAV_LIST,
  SET_IS_PLAYING,
  SET_IS_SHOW_LIST_PLAYER,
  SET_MODE_TYPE,
  SET_SHOW_FULLSCREEN,
  SET_SHOW_MINI,
  SET_SONG_LYRIC,
  SET_SONGS_DETAIL
} from '@/store/mutations-type'
import { getSongDetail, getSongLyric, getSongUrl } from '@/api'
import { parseLyric } from '@/store/utils'

export default {
  setFullScreen ({ commit }, flag) {
    commit(SET_SHOW_FULLSCREEN, flag)
  },
  setShowMini ({ commit }, flag) {
    commit(SET_SHOW_MINI, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  setIsShowListPlayer ({ commit }, flag) {
    commit(SET_IS_SHOW_LIST_PLAYER, flag)
  },
  async setSongsDetail ({ commit }, ids) {
    const result = await getSongDetail(ids.join())
    const urls = await getSongUrl(ids.join())
    const data = result.songs.map(item => {
      const url = urls.data.find(urlData => urlData.id === item.id)?.url || ''
      return {
        url,
        id: item.id,
        name: item.name,
        singer: item.ar.map(i => i.name).join('/'),
        picUrl: item.al.picUrl
      }
    })
    commit(SET_SONGS_DETAIL, data)
  },
  async setSongLyric ({ commit }, id) {
    const result = await getSongLyric(id)
    commit(SET_SONG_LYRIC, parseLyric(result.lrc.lyric))
  },
  deleteSongById ({ commit }, id) {
    commit(SET_DELETE_SONG, id)
  },
  setCurrentPlayId ({ commit }, id) {
    commit(SET_CURRENT_SONG, id)
  },
  setCurrentTime ({ commit }, id) {
    commit(GET_CURRENT_TIME, id)
  },
  setFavList ({ commit }, list) {
    commit(SET_FAV_LIST, list)
  }
}
