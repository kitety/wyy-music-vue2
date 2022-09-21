import {
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
  },
  [SET_SHOW_MINI] (state, flag) {
    state.isShowMini = flag
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
  [SET_SONGS_DETAIL] (state, songsDetail) {
    state.songsDetail = songsDetail
  },
  [SET_SONG_LYRIC] (state, lyric) {
    state.currentLyric = lyric
  }
}
