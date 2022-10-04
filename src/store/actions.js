import {
  GET_CURRENT_TIME,
  SET_CURRENT_SONG,
  SET_DELETE_SONG,
  SET_FAV_LIST,
  SET_FAV_LIST_FROM_LOCAL,
  SET_HISTORY_LIST,
  SET_HISTORY_SONG,
  SET_IS_PLAYING,
  SET_IS_SHOW_LIST_PLAYER,
  SET_MODE_TYPE,
  SET_SHOW_FULLSCREEN,
  SET_SHOW_MINI,
  SET_SONG_LYRIC,
  SET_SONGS_DETAIL
} from '@/store/mutations-type'
import { getSongLyric } from '@/api'
import { formatGetSongsByIds, parseLyric } from '@/store/utils'

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
    const data = await formatGetSongsByIds(ids)
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
  },
  setFavListFromLocal ({ commit }, list) {
    commit(SET_FAV_LIST_FROM_LOCAL, list)
  },
  setHistorySong ({ commit }, id) {
    commit(SET_HISTORY_SONG, id)
  },
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}
