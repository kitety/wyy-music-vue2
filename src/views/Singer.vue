<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul class="list-wrapper">
        <li v-for="(value,index) in alphabet" :key="index" ref="group" class="list-group">
          <h2 class="group-title">{{ value }}</h2>
          <ul>
            <li v-for="(singer,i) in singers[index]" :key="`${singer.name}-${i}`" class="group-item"
                @click.stop="switchSinger(singer.id)">
              <img v-lazy="singer.picUrl" alt="">
              <p> {{ singer.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="list-keys">
        <li v-for="(value,index) in alphabet" :key="index" :class="{active:activeIndex===index}"
            :data-index="index"
            @click.stop="clickKey(index)"
            @touchstart.stop.prevent="touchStart"
            @touchmove.stop.prevent="touchMove"
        >
          {{ value }}
        </li>
        <!--        <li v-for="(value,index) in alphabet" :key="index" :class="{active:activeIndex===index}"-->
        <!--            @click.stop="clickKey(index)">-->
        <!--          {{ value }}-->
        <!--        </li>-->
      </ul>
    </ScrollView>
    <div v-show="fixedTitle" ref="fixedTitle" class="fixed-title">{{ fixedTitle }}</div>

    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getSingAllLetters } from '@/api'
import ScrollView from '@/components/ScrollView'

export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  data () {
    return {
      alphabet: [],
      singers: [],
      groupsTop: [],
      activeIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      isClick: false,
      scrollY: 0,
      fixedHeight: 0,
      fixedOffsetY: 0
    }
  },
  watch: {
    singers () {
      this.$nextTick(() => {
        const groupData = this.$refs.group.map(ele => ele.offsetTop)
        this.groupsTop = groupData
        console.log(groupData)
      })
    },
    fixedTitle () {
      this.$nextTick(() => {
        this.fixedHeight = this.$refs.fixedTitle.offsetHeight
      })
    }
  },
  async created () {
    const data = await getSingAllLetters()
    console.log(data)
    const {
      alphabet,
      singers
    } = data
    this.alphabet = alphabet
    this.singers = singers
  },
  computed: {
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      } else {
        return this.alphabet[this.activeIndex]
      }
    }
  },
  mounted () {
    const scrollView = this.$refs.scrollView
    scrollView.scrolling(y => {
      if (this.isClick || isNaN(y)) {
        return
      }
      this.scrollY = y
      if (y >= 0) {
        this.activeIndex = 0
        return
      }
      //  ????????????
      const value = Math.abs(y)
      const index = this.groupsTop.findIndex((item, index) => {
        return item <= value && value <= this.groupsTop[index + 1]
      })
      if (index >= 0) {
        // ??????????????? [0,this.groupsTop.length - 1)
        this.activeIndex = index
        // ?????????????????????+?????????????????????
        const diffOffsetY = this.groupsTop[index + 1] + y
        // ?????????????????????[0,fixedHeight]
        let fixedOffsetY = 0
        if (diffOffsetY >= 0 && diffOffsetY <= this.fixedHeight) {
          // ????????????
          fixedOffsetY = diffOffsetY - this.fixedHeight
        }
        if (this.fixedOffsetY !== fixedOffsetY) {
          this.fixedOffsetY = fixedOffsetY
          this.$refs.fixedTitle.style.transform = `translateY(${fixedOffsetY}px)`
        }
      } else {
        this.activeIndex = this.groupsTop.length - 1
      }
    })
  },
  methods: {
    switchSinger (id) {
      this.$router.push(`singer/detail/${id}/singer`)
    },
    _clickKey (index) {
      console.log(index)
      this.activeIndex = index
      const top = this.groupsTop[index]
      this.isClick = true
      const time = 500
      this.$refs.scrollView.scrollTo(0, -top, time)
      setTimeout(() => {
        this.isClick = false
      }, time + 100)
    },
    touchStart (e) {
      const { index } = e.target.dataset
      this._clickKey(Number(index))
      this.beginOffsetY = e.touches[0].pageY
    },
    touchMove (e) {
      this.moveOffsetY = e.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)
      index = Math.min(index, this.alphabet.length - 1)
      index = Math.max(index, 0)

      if (index !== this.activeIndex) {
        this._clickKey(index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  overflow: hidden;

  .list-wrapper {
    width: 100%;

    .list-group {
      .group-title {
        @include bg_color();
        @include font_size($font_medium);
        color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
      }

      .group-item {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        border: 1px solid #ccc;

        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }

        p {
          @include font_size($font_medium);
          @include font_color();
          margin-left: 30px;
        }
      }
    }
  }

  .list-keys {
    position: fixed;
    top: 55%;
    transform: translateY(-50%);
    right: 10px;

    li {
      @include font_color();
      @include font_size($font_medium_s) ;
      padding: 3px 0;
      text-align: center;

      &.active {
        text-shadow: 0 0 10px #000;
      }
    }
  }

  .fixed-title {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    @include bg_color();
    @include font_size($font_medium);
    color: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
  }
}

</style>
