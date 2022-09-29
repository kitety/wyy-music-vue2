import {
  GET_CURRENT_TIME,
  SET_CURRENT_SONG,
  SET_DELETE_SONG,
  SET_FAV_LIST,
  SET_FAV_LIST_FROM_LOCAL,
  SET_IS_PLAYING,
  SET_IS_SHOW_LIST_PLAYER,
  SET_MODE_TYPE,
  SET_SHOW_FULLSCREEN,
  SET_SHOW_MINI,
  SET_SONG_LYRIC,
  SET_SONGS_DETAIL
} from '@/store/mutations-type'

export default {
  [SET_SHOW_FULLSCREEN] (state, flag) {
    state.isFullScreen = flag
    if (flag) {
      state.isShowMini = false
      state.isShowListPlayer = false
    }
  },
  [SET_SHOW_MINI] (state, flag) {
    state.isShowMini = flag
    if (flag) {
      state.isFullScreen = false
      state.isShowListPlayer = false
    }
  },
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODE_TYPE] (state, flag) {
    state.modeType = flag
  },
  [SET_IS_SHOW_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_SONGS_DETAIL] (state, songs) {
    state.songs = songs
  },
  [SET_SONG_LYRIC] (state, lyric) {
    state.currentLyric = lyric
  },
  [SET_DELETE_SONG] (state, id) {
    const idArr = Array.isArray(id) ? id : [id]
    state.songs = state.songs.filter(item => !idArr.includes(item.id))
    // 清空
    if (!state.songs.length) {
      state.isFullScreen = false
      state.isShowMini = false
      state.isShowListPlayer = false
      state.isPlaying = false
    }
  },
  [SET_CURRENT_SONG] (state, index) {
    state.currentPlayId = index
  },
  [GET_CURRENT_TIME] (state, val) {
    state.currentTime = val
  },
  [SET_FAV_LIST] (state, val) {
    console.log(val)
    if (!state.favList.includes(val)) {
      state.favList.push(val)
    } else {
      state.favList = state.favList.filter(item => item !== val)
    }
  },
  [SET_FAV_LIST_FROM_LOCAL] (state, list) {
    state.favList = list
  }
}
