<template>
  <div class="header" @click="changeTheme">
    <div class="left"></div>
    <div class="title">K音乐</div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.theme.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.theme[this.index])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';

.header {
  width: 100%;
  height: 100px;
  //background-color: #f00;
  @include bg_color();
  display: flex;
  justify-content: space-between;

  .left, .right {
    width: 84px;
    height: 84px;
    background-color: #000;
    margin-top: 8px;
  }

  .title {
    line-height: 100px;
    text-align: center;
    color: #fff;
    @include font_size($font_medium)
  }
}
</style>
