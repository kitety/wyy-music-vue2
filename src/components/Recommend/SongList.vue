<template>
  <div class="song">
    <div class="song-top">
      <h3> 最新音乐 </h3>
    </div>
    <ul class="song-list">
      <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
        <img v-lazy="value.picUrl" alt="">
        <div>
          <h3>{{ value.name }}</h3>
          <p>{{ value.song.artists[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SongList',
  props: {
    songs: {
      banners: {
        type: Array,
        default: () => [],
        required: true
      }
    }
  },
  methods: {
    ...mapActions(['setFullScreen', 'setSongsDetail', 'setCurrentPlayId']),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongsDetail([id])
      this.setCurrentPlayId(id)
    }
  }
}
</script>

<style lang="scss" scoped>

.song {
  width: 100%;
  @include bg_sub_color() ;

  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color() ;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;

    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color()
    }
  }

  .song-list {
    width: 100%;
    overflow: hidden;
    padding-left: 0;
    margin-top: 0;

    .item {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #ccc;

      img {
        width: 150px;
        height: 150px;
        margin-right: 20px;
        border-radius: 20px;
      }

      div {
        h3 {
          @include font-size($font_medium) ;
          @include font_color();
        }

        p {
          margin-top: 20px;
          @include font_color();
          opacity: 0.6;
          @include font-size($font_small) ;

        }
      }
    }
  }
}

</style>
