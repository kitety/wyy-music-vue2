<template>
  <div class="player">
    <NormalPlayer :currentTime="currentPlayingTime" :totalTime="totalTime"></NormalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer ref="listPlayer"></ListPlayer>
    <audio ref="audio" :src="currentSong.url" @ended="end" @timeupdate="timeUpdate"></audio>
  </div>
</template>

<script>
import NormalPlayer from '@/components/Player/NormalPlayer'
import MiniPlayer from '@/components/Player/MiniPlayer'
import ListPlayer from '@/components/Player/ListPlayer'
import { mapActions, mapGetters } from 'vuex'
import { ModeType } from '@/store/modeType'
import { getRandomInt } from '@/utils'

export default {
  name: 'Player',
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters(
      ['currentSong', 'isPlaying', 'currentPlayId', 'currentTime', 'modeType', 'songs', 'favList', 'historyList']
    )
  },
  watch: {
    favList (val) {
      localStorage.setItem('favList', JSON.stringify(val))
    },
    historyList (val) {
      localStorage.setItem('historyList', JSON.stringify(val))
    },
    isPlaying (newVal) {
      if (newVal) {
        this.setHistorySong(this.currentPlayId)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentTime (val) {
      this.$refs.audio.pause()
      this.$refs.audio.currentTime = val
      this.$refs.audio.play()
    },
    currentPlayId (val) {
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(val)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    }
  },

  methods: {
    ...mapActions(['setCurrentPlayId', 'setFavListFromLocal', 'setHistoryList', 'setHistorySong']),
    timeUpdate (e) {
      this.currentPlayingTime = e.target.currentTime
    },
    handleNext () {
      let newSong = this.currentSong
      let index = this.songs.findIndex(item => item.id === this.currentSong.id)
      index = index + 1
      newSong = this.songs[index] || this.songs[0]

      if (newSong) {
        this.setCurrentPlayId(newSong.id)
      }
    },
    handleRandom () {
      const randomIndex = getRandomInt(0, this.songs.length - 1)
      const newSong = this.songs[randomIndex]
      if (newSong) {
        this.setCurrentPlayId(newSong.id)
      }
    },
    end () {
      console.log('end')
      switch (this.modeType) {
        case ModeType.loop:
          // 下一曲
          this.handleNext()

          break
        case ModeType.one:
          // 循环
          this.$refs.audio.play()
          break
        case ModeType.random:
          this.handleRandom()
          break
      }
    }
  },
  data () {
    return {
      totalTime: 0,
      currentPlayingTime: 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
