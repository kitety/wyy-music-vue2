<template>
  <transition name="normalPlayer">
    <div v-show="isFullScreen" class="normal-player">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom></PlayerBottom>
        <div class="player-bg"><img v-if="currentSong" :src="currentSong?.picUrl" alt="">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from '@/components/Player/PlayerHeader'
import PlayerMiddle from '@/components/Player/PlayerMiddle'
import PlayerBottom from '@/components/Player/PlayerBottom'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters(
      ['isFullScreen', 'currentSong']
    )
  },
  methods: { ...mapActions(['setSongLyric']) },
  watch: {
    currentSong (newVal) {
      console.log('currentSong', newVal?.id)
      if (newVal?.id) {
        this.setSongLyric(newVal?.id)
      }
    }
  }

}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin';
@import '@/assets/css/variable';

.normal-player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  @include bg_sub_color();

  .player-wrapper {
    width: 100%;
    height: 100%;

  }

  .player-bg {
    width: 100%;
    height: 100%;
    position: absolute;

    left: 0;
    top: 0;

    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(10px);
    }
  }
}

</style>
<style lang="scss">

.normalPlayer-enter {
  opacity: 0;
  transform: translateX(100%);
}

.normalPlayer-enter-to {
  opacity: 1;

  transform: translateX(0);
}

.normalPlayer-enter-active {
  transition: all .3s;
}

.normalPlayer-leave {
  opacity: 1;

  transform: translateX(0);
}

.normalPlayer-leave-to {
  opacity: 0;

  transform: translateX(100%);
}

.normalPlayer-leave-active {
  transition: all .3s;
}
</style>
