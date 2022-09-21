<template>
  <swiper :options="swiperOption" class="banner">
    <swiper-slide v-for="banner in banners" :key="banner.bannerId" class="item">
      <a :href="banner.url">
        <img :src="banner.pic" alt="">
      </a>
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Banner',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      swiperOption: {

        loop: true, // 循环轮播
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParent: true,
        observeSlideChildren: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  .item {
    width: 100%;
    height: 300px;
  }

}
</style>
<style lang="scss">
@import '../../assets/css/mixin';

.banner {
  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background-color: #fff;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    @include bg_color()
  }
}
</style>
