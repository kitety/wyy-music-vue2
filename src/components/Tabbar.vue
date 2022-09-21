<template>
  <div class="tabbar">
    <router-link v-for="item in items" :key="item.title" :to="item.to" class="item" tag="div">
      <span>{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
      items: [
        {
          title: '推荐',
          to: '/recommend'
        },
        {
          title: '歌手',
          to: '/singer'
        },
        {
          title: '排行',
          to: '/rank'
        },
        {
          title: '搜索',
          to: '/search'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.tabbar {
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  display: flex;
  align-items: center;
  justify-content: space-around;
  //position: relative;
  //z-index: 100;

  .item {
    height: 84px;
    line-height: 84px;

    span {
      @include font_size($font_medium_s);
      @include font_color();

    }

    &.router-link-active {
      border-bottom: 5px solid #000;
      @include border_color();

      span {
        @include font_active_color();
      }
    }
  }
}

</style>
