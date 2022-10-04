<template>
  <ul class="song-list">
    <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
      <img v-lazy="value.picUrl" alt="">
      <div>
        <h3>{{ value.name }}</h3>
        <p>{{ value.singer }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SongListItem',
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
  },
  watch: {

    songs: function (newVal, oldVal) {
      console.log('songs', newVal)
    }

  }
}
</script>

<style lang="scss" scoped>
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
        @include no-wrap();
      }

      p {
        margin-top: 20px;
        @include font_color();
        opacity: 0.6;
        @include font-size($font_small) ;
        @include no-wrap();

      }
    }
  }
}
</style>
