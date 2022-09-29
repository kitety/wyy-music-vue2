<template>
  <transition name="miniPlayer">

    <div v-show="this.isShowMini" class="mini-player">
      <div class="player-container">
        <div class="player-left" @click="showNormalPlayer">
          <img :class="{'active':this.isPlaying}" :src="currentSong.picUrl"
               alt="">
          <div class="player-title">
            <h3>{{ currentSong.name }}</h3>
            <p>{{ currentSong.singer }}</p>
          </div>
        </div>
        <div class="player-right">
          <div :class="{'active':this.isPlaying}" class="play" @click="play"></div>
          <div class="list" @click="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MiniPlayer',
  methods: {
    ...mapActions(['setFullScreen', 'setShowMini', 'setIsPlaying', 'setIsShowListPlayer']),
    showNormalPlayer (event) {
      event.stopPropagation()
      this.setFullScreen(true)
      this.setShowMini(false)
    },
    showList: function () {
      this.setIsShowListPlayer(true)
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  computed: {
    ...mapGetters(['isShowMini', 'isPlaying', 'currentSong'])
  }
}
</script>

<style lang="scss" scoped>

.mini-player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;

  height: 150px;
  @include bg_color();

  .player-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;

    .player-left {
      display: flex;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: playing 60s linear infinite;
        animation-play-state: paused;

        &.active {
          animation-play-state: running;

        }
      }

      .player-title {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
          @include font_size($font_medium) ;
          @include font_color()
        }

        p {
          margin-top: 10px;
          @include font_size($font_medium_s) ;
          @include font_color()
        }
      }
    }

    .player-right {
      display: flex;
      align-items: center;

      div {
        height: 84px;
        width: 84px;
      }

      .play {
        background: url('@/assets/images/play.png') no-repeat center;
        background-size: 84px;

        &.active {
          background: url('@/assets/images/pause.png') no-repeat center;
          background-size: 60px;
        }
      }

      .list {
        background: url('@/assets/images/menu.png') no-repeat center;
        background-size: 84px;
      }
    }
  }

}

@keyframes playing {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)

  }
}
</style>

<style lang="scss">

.miniPlayer-enter {
  opacity: 0;
  transform: translateX(100%);
}

.miniPlayer-enter-to {
  opacity: 1;

  transform: translateX(0);
}

.miniPlayer-enter-active {
  transition: all .3s;
}

.miniPlayer-leave {
  opacity: 1;
  transform: translateX(0);
}

.miniPlayer-leave-to {
  opacity: 0;

  transform: translateX(100%);
}

.miniPlayer-leave-active {
  transition: all .3s;
}
</style>
