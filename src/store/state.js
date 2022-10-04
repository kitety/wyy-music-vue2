import { ModeType } from '@/store/modeType'

export default {
  isFullScreen: false,
  isShowMini: false,
  isShowListPlayer: false,
  isPlaying: false,
  modeType: ModeType.loop,
  songs: [],
  currentSong: {},
  currentPlayId: 0,
  currentLyric: [],
  currentTime: 0,
  favList: [],
  historyList: []
}
