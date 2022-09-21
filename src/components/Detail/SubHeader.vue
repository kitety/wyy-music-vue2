<template>
  <div class="header" @click="changeTheme">
    <div class="left" @click="back"></div>
    <div class="title">{{ title }}</div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'SubHeader',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
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
    },
    back (event) {
      event.stopPropagation()
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin';

.header {
  width: 100%;
  height: 100px;
  //background-color: #f00;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  //position: relative;
  //z-index: 100;
  position: fixed;
  z-index: 10;

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
    @include font_size($font_medium) ;
    @include no-wrap();
  }

  .left {
    background: url('@/assets/images/angle_left.png') no-repeat center;
    background-size: 60px 60px;
  }

  .right {
    background: url('@/assets/images/more_right.png') no-repeat center;
    background-size: 60px 60px;
  }
}
</style>
