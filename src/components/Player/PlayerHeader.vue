<template>
  <div class="header" @click="changeTheme">
    <div class="left" @click="hidePlayer"></div>
    <div v-if="this.currentSong" class="title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PlayerHeader',
  data () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    ...mapActions(['setFullScreen', 'setShowMini']),
    hidePlayer (event) {
      event.stopPropagation()
      this.setFullScreen(false)
      this.setShowMini(true)
    },
    changeTheme () {
      this.index++
      if (this.index >= this.theme.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.theme[this.index])
    }

  },
  computed: {
    ...mapGetters(['currentSong'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';

.header {
  width: 100%;
  height: 100px;
  //background-color: #f00;
  //@include bg_color();
  display: flex;
  justify-content: space-between;
  //position: relative;
  //z-index: 100;
  position: fixed;
  z-index: 10;

  .left, .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: #fff;
    @include font_size($font_medium) ;
    @include no-wrap();
  }

  .left {
    background: url('@/assets/images/arrow-down.png') no-repeat center;
    background-size: 60px 60px;
  }

  //.right {
  //  background: url('@/assets/images/more_right.png') no-repeat center;
  //  background-size: 60px 60px;
  //}
}
</style>
