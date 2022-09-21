<template>
  <div class="player-bottom">
    <div class="progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="control">
      <div :class="modeClass" class="mode" @click="modeChange"></div>
      <div class="prev"></div>
      <div :class="{'active':this.isPlaying}" class="play" @click="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ModeType } from '@/store/modeType'

export default {
  name: 'PlayerBottom',
  computed: {
    ...mapGetters(['isPlaying', 'modeType']),
    modeClass: function () {
      return {
        one: this.modeType === ModeType.one,
        random: this.modeType === ModeType.random
      }
    }
  },
  methods: {
    ...mapActions(['setIsPlaying', 'setModeType']),
    play () {
      this.setIsPlaying(!this.isPlaying)
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
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

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
      width: 100%;

      .progress-line {
        height: 100%;
        background: #ccc;
        width: 40%;
        position: relative;

        .progress-dot {
          height: 20px;
          background: red;
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

    }

  }
}

</style>
