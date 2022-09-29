<template>
  <transition name="listPlayer">
    <div v-show="this.isShowListPlayer" class="list-player">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div :class="modeClass" class="mode" @click="modeChange"></div>
            <p>{{ modeTypeText[this.modeType] }}</p>
          </div>
          <div class="top-right">
            <div class="del" @click="deleteAllSongs"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="ScrollView">
            <ul>
              <li v-for="(song) in songs" :key="song.id" class="item" @click="playSong(song.id)">
                <div class="item-left">
                  <div :class="{'item-active':currentSong.id===song.id}" class="item-play"></div>
                  <p>{{ song.name }}</p>
                </div>
                <div class="item-right">
                  <div :class="{active:favList.includes(song.id)}" class="item-favorite"
                       @click="favorite(song.id)"></div>
                  <div class="item-del" @click.stop="deleteSong(song.id)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom" @click="hide">
          <p>关闭</p>
        </div>
      </div>
    </div>

  </transition>
</template>
<script>
import ScrollView from '@/components/ScrollView'
import { ModeType } from '@/store/modeType'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  data () {
    return {
      modeTypeText: ['', '循环播放', '单曲循环', '随机播放']
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'modeType', 'isShowListPlayer', 'songs', 'currentSong', 'favList']),
    modeClass: function () {
      return {
        loop: this.modeType === ModeType.loop,
        one: this.modeType === ModeType.one,
        random: this.modeType === ModeType.random
      }
    }

  },
  methods: {
    ...mapActions(['setModeType', 'setIsShowListPlayer', 'deleteSongById', 'setCurrentPlayId', 'setFavList']),
    favorite (id) {
      this.setFavList(id)
    },
    hide () {
      this.setIsShowListPlayer(false)
    },
    deleteAllSongs () {
      const ids = this.songs.map(item => item.id)
      this.deleteSongById(ids)
    },
    deleteSong (id) {
      this.deleteSongById(id)
    },
    playSong (id) {
      this.setCurrentPlayId(id)
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
  },
  watch: {
    isShowListPlayer (newVal) {
      if (newVal) {
        this.$refs.ScrollView.refresh()
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  @include bg_sub_color();

  .player-wrapper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;

        .mode {
          width: 56px;
          height: 56px;
          background: url('@/assets/images/exchange-red.png') center no-repeat;
          background-size: 56px;
          margin-right: 20px;

          &.random {
            background: url('@/assets/images/random-red.png') center no-repeat;
            background-size: 70px;
          }

          &.one {
            background: url('@/assets/images/singlecycle-red.png') center no-repeat;
            background-size: 70px;
          }

        }

        p {
          @include font_color();
          @include font_size($font_medium_s)
        }
      }

      .top-right {
        .del {
          margin-right: 20px;
          width: 56px;
          height: 56px;
          background: url('@/assets/images/delete.png') center no-repeat;
          background-size: 56px;
        }
      }
    }

    .player-middle {
      height: 700px;
      overflow: hidden;

      .item {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        border-top: 1px solid #ccc;

        .item-left {
          display: flex;
          align-items: center;

          .item-play {
            background: url('@/assets/images/play-red.png') no-repeat center;
            background-size: 56px;
            width: 56px;
            height: 56px;
            margin-right: 20px;

            &.item-active {
              background: url('@/assets/images/pause_red.png') no-repeat center;
              background-size: 56px;
            }

          }

          p {
            @include font_color();
            @include font_size($font_medium_s)

          }
        }

        .item-right {
          display: flex;
          align-items: center;

          .item-favorite {
            background: url('@/assets/images/like.png') no-repeat center;
            background-size: 56px;
            width: 56px;
            height: 56px;
            margin-right: 20px;

            &.active {
              background: url('@/assets/images/like-active.png') no-repeat center;
              background-size: 56px;
              width: 56px;
              height: 56px;
            }

          }

          .item-del {
            background: url('@/assets/images/close.png') no-repeat center;
            background-size: 56px;
            width: 56px;
            height: 56px;
          }
        }
      }
    }

    .player-bottom {
      width: 100%;
      height: 100px;
      @include bg_color();
      display: flex;
      justify-content: center;
      align-items: center;
      @include bg_color();

      p {
        @include font_size($font_medium);
        color: white;
      }
    }
  }
}
</style>

<style lang="scss">

.listPlayer-enter {
  opacity: 0;
  transform: translateY(100%);
}

.listPlayer-enter-to {
  opacity: 1;

  transform: translateY(0);
}

.listPlayer-enter-active {
  transition: all .3s;
}

.listPlayer-leave {
  opacity: 1;
  transform: translateY(0);
}

.listPlayer-leave-to {
  opacity: 0;

  transform: translateY(100%);
}

.listPlayer-leave-active {
  transition: all .3s;
}
</style>
