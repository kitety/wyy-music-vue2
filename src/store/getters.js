export default {
  isFullScreen (state) {
    return state.isFullScreen
  },
  isShowMini (state) {
    return state.isShowMini
  },
  isPlaying (state) {
    return state.isPlaying
  },
  modeType (state) {
    return state.modeType
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  songsDetail (state) {
    return state.songsDetail
  },
  currentSong (state) {
    // console.log('currentSong', state.songsDetail?.length, state.currentIndex)
    if (state.songsDetail?.length) {
      return state.songsDetail[state.currentIndex]
    }
    return {
      name: '',
      picUrl: '',
      singer: ''
    }
  },

  currentLyric (state) {
    return state.currentLyric
  }

}
