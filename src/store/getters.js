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
  currentPlayId (state) {
    return state.currentPlayId
  },
  modeType (state) {
    return state.modeType
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  songs (state) {
    return state.songs
  },
  currentSong (state) {
    const song = state.songs.find(item => item.id === state.currentPlayId)
    if (song) {
      return song
    }
    return {
      name: '',
      picUrl: '',
      singer: ''
    }
  },

  currentLyric (state) {
    return state.currentLyric
  },
  currentTime (state) {
    return state.currentTime
  },
  favList (state) {
    return state.favList
  },
  historyList (state) {
    console.log('getter', state.historyList)
    return state.historyList
  }

}
