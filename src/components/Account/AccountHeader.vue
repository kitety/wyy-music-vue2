<template>
  <div class="header" @click="changeTheme">
    <div class="left" @click="back"></div>
    <ul class="title">
      <li :class="{'active':switchNum===0}" @click.stop=switchItem(0)>我喜欢的</li>
      <li :class="{'active':switchNum===1}" @click.stop=switchItem(1)>最近听的</li>
    </ul>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'AccountHeader',
  data () {
    return {
      theme: ['theme', 'theme1', 'theme2'],
      index: 0,
      switchNum: 0
    }
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
    },
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
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #fff;
    height: 60px;
    margin-top: 20px;

    color: #fff;
    @include font_size($font_medium) ;
    @include no-wrap();

    li {
      height: 60px;
      line-height: 60px;
      padding: 0 20px;

      &:nth-of-type(1) {
        border-right: 1px solid #fff;
      }

      &.active {
        background-color: rgba(255, 255, 255, .3);
      }
    }
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
