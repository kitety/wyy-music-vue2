<template>
  <ul class="container">
    <li class="top">
      <div class="icon"></div>
      <div class="title">播放全部</div>
    </li>
    <li v-for="item in playlist" :key="item.id" class="item" @click="selectMusic(item.id)">
      <h3>{{ item.name }}</h3>
      <p>{{ item.al.name }}-{{ item.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions(['setFullScreen', 'setSongsDetail']),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongsDetail([id])
      // this.$store.dispatch('setFullScreen', true)
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  width: 100%;

  li {
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    //background: red;
  }

  .top {
    display: flex;
    align-items: center;
    border-radius: 50px 50px 0 0;

    .icon {
      width: 60px;
      height: 60px;
      background: url('@/assets/images/play.png') no-repeat center;
      background-size: 60px 60px;
      margin-right: 20px;
    }

    .title {
      @include font_color();
      @include font_size($font_large);
    }
  }

  .item {
    h3 {
      @include font_color();
      @include font_size($font_medium);
    }

    p {
      @include font_color();
      @include font_size($font_medium);
      margin-top: 10px;
      opacity: 0.8;
    }
  }
}

</style>
