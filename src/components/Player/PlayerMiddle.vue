<template>
  <swiper :options="swiperOption" class="container">
    <swiper-slide class="cd">
      <div :class="{'active':isPlaying}" class="cd-container">
        <img v-if="currentSong" :src="currentSong.picUrl" alt="">
      </div>
      <p>{{ currentLyric[0]?.content }}</p>
    </swiper-slide>
    <swiper-slide ref="lyric" class="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li v-for="(item,index) in currentLyric" :key="index" :class="{'active':lineNumber===Math.floor(item.time)}">
            {{ item.content }}
          </li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ScrollView from '@/components/ScrollView'
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerMiddle',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'active-bullet'
        },
        observer: true,
        observeParent: true,
        observeSlideChildren: true

      },
      lineNumber: 0

    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentSong', 'currentLyric', 'currentPlayId'])
  },
  watch: {
    currentLyric (val) {
      this.lineNumber = Math.floor(val[0].time)
    },
    currentTime (val) {
      // 高亮歌词
      let lineNumber = Math.floor(val)
      lineNumber = this.getActiveLineNum(lineNumber)
      const result = this.currentLyric.find(item => Math.floor(item.time) === lineNumber)
      if (result?.content) {
        this.lineNumber = lineNumber
        // 滚动同步
        const activeEle = document.querySelector('li.active')
        if (!activeEle) return
        const currentLyricTop = activeEle.offsetTop
        const LyricHeight = this.$refs.lyric.$el.offsetHeight
        const offsetVal = LyricHeight / 2 - currentLyricTop
        if (offsetVal < 0) {
          console.log('offsetVal', offsetVal)
          this.$refs.scrollView.scrollTo(0, offsetVal, 100)
        } else {
          this.$refs.scrollView.scrollTo(0, 0, 100)
        }
      }
    }
  },
  methods: {
    getActiveLineNum (lineNumber) {
      if (lineNumber < 0) {
        return this.lineNumber
      }
      const result = this.currentLyric.find(item => Math.floor(item.time) === lineNumber)
      if (!result) {
        return this.getActiveLineNum(lineNumber - 1)
      } else {
        return lineNumber
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;

  .cd {
    .cd-container {
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      display: block;
      margin: 0 auto;
      overflow: hidden;
      animation: playing 60s linear infinite;
      animation-play-state: paused;

      &.active {
        animation-play-state: running;

      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      text-align: center;
      @include font_size($font_medium) ;
      @include font_color() ;
      margin-top: 50px;
    }
  }

  .lyric {
    li {
      text-align: center;
      @include font_size($font_medium) ;
      @include font_color();
      margin: 10px 0;

      &:last-of-type {
        padding-bottom: 50%;
      }

      &.active {
        color: white;
        transform: scale(1.1);
        transition: all .6s linear;
      }
    }
  }
}

@keyframes playing {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)

  }
}
</style>

<style lang="scss">

.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}

.active-bullet {
  width: 60px;
  @include bg_color();
}

</style>
