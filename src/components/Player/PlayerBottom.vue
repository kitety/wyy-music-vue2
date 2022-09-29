<template>
  <div class="player-bottom">
    <div class="progress">
      <span>{{ currentTimeStr }}</span>
      <div ref="progressBar" class="progress-bar" @click="barClick">
        <div :style="{width:rate}" class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>{{ totalTimeStr }}</span>
    </div>
    <div class="control">
      <div :class="modeClass" class="mode" @click="modeChange"></div>
      <div class="prev" @click="prev"></div>
      <div :class="{'active':this.isPlaying}" class="play" @click="play"></div>
      <div class="next" @click="next"></div>
      <div :class="{active:favList.includes(currentSong?.id)}" class="favorite" @click="favorite"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ModeType } from '@/store/modeType'
import { index } from '@/utils'

export default {
  name: 'PlayerBottom',
  data () {
    return {
      totalTimeStr: '00:00',
      currentTimeStr: '00:00',
      rate: '0%'
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  watch: {
    totalTime (val) {
      this.totalTimeStr = index(val)
    },
    currentTime (val) {
      const rateVal = 100 * this.currentTime / this.totalTime
      this.rate = `${rateVal}%`
      this.currentTimeStr = index(val)
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'modeType', 'currentSong', 'songs', 'favList']),
    modeClass: function () {
      return {
        one: this.modeType === ModeType.one,
        random: this.modeType === ModeType.random
      }
    }
  },
  methods: {
    ...mapActions(['setIsPlaying', 'setModeType', 'setCurrentPlayId', 'setCurrentTime', 'setFavList']),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    prev () {
      this.changePlayingSong(false)
    },
    next () {
      this.changePlayingSong(true)
    },
    changePlayingSong (isNext) {
      console.log(1)
      let newSong = this.currentSong
      let index = this.songs.findIndex(item => item.id === this.currentSong.id)
      // 下一曲
      if (isNext) {
        index = index + 1
        newSong = this.songs[index] || this.songs[0]
      } else {
        index = index - 1
        newSong = this.songs[index] || this.songs[this.songs.length - 1]
      }
      if (newSong) {
        this.setCurrentPlayId(newSong.id)
      }
    },
    barClick (e) {
      // 进度条位置
      const rate = ((e.pageX - this.$refs.progressBar.offsetLeft) / this.$refs.progressBar.offsetWidth)
      const rateVal = 100 * rate
      this.rate = `${rateVal}%`
      const currentTime = this.totalTime * rate
      this.setCurrentTime(currentTime)
    },
    modeChange () {
      // this.setModeType(this.modeType)
      let val = ModeType.loop
      switch (this.modeType) {
        case ModeType.loop:
          val = ModeType.one
          break
        case ModeType.one:
          val = ModeType.random
          break
        case ModeType.random:
          val = ModeType.loop
          break
        default:
          val = ModeType.loop
      }
      this.setModeType(val)
    },
    favorite () {
      this.setFavList(this.currentSong.id)
    }
  }

}
</script>

<style lang="scss" scoped>

.player-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;

  .progress {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      @include font_color();
      @include font_size($font_medium_s);

    }

    .progress-bar {
      margin: 0 10px;
      height: 10px;
      background: #fff;
      width: 420px;

      .progress-line {
        height: 100%;
        background: #ccc;
        width: 40%;
        position: relative;
        @include bg_color();

        .progress-dot {
          height: 20px;
          @include bg_color();
          width: 20px;
          border-radius: 50px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }

    }
  }

  .control {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 80px;

    div {
      width: 84px;
      height: 84px;
    }

    .mode {
      background: url('@/assets/images/exchange.png') center no-repeat;
      background-size: 50px;

      &.random {
        background: url('@/assets/images/random.png') center no-repeat;
        background-size: 70px;
      }

      &.one {
        background: url('@/assets/images/singlecycle.png') center no-repeat;
        background-size: 70px;
      }
    }

    .prev {
      background: url('@/assets/images/left-circle.png') no-repeat center;
      background-size: 60px;

    }

    .play {
      background: url('@/assets/images/play.png') no-repeat center;
      background-size: 74px;

      &.active {
        background: url('@/assets/images/pause.png') no-repeat center;
        background-size: 60px;
      }

    }

    .next {
      background: url('@/assets/images/right-circle.png') no-repeat center;
      background-size: 60px;

    }

    .favorite {
      background: url('@/assets/images/like.png') no-repeat center;
      background-size: 60px;

      &.active {
        background: url('@/assets/images/like-active.png') no-repeat center;
        background-size: 60px;
      }

    }

  }
}

</style>
