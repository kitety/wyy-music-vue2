<template>
  <div class="header" @click="changeTheme">
    <div class="left"></div>
    <div class="title">K音乐</div>
    <div class="right" @click.stop="accountClick"></div>
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
    },
    accountClick () {
      this.$router.push('/account')
    }
  }
}
</script>

<style lang="scss" scoped>

.header {
  width: 100%;
  height: 100px;
  //background-color: #f00;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  //position: relative;
  //z-index: 100;

  .left, .right {
    width: 84px;
    height: 84px;
    background-color: #000;
    margin-top: 8px;
  }

  .left {
    background: url('../assets/images/music.png') no-repeat center;
    background-size: 60px 60px;
  }

  .right {
    background: url('../assets/images/personal.png') no-repeat center;
    background-size: 60px 60px;
  }

  .title {
    line-height: 100px;
    text-align: center;
    color: #fff;
    @include font_size($font_medium)
  }
}
</style>
