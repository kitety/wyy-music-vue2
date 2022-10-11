<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul class="list-wrapper">
        <li v-for="(value,index) in alphabet" :key="index" ref="group" class="list-group">
          <h2 class="group-title">{{ value }}</h2>
          <ul>
            <li v-for="(singer,i) in singers[index]" :key="`${singer.name}-${i}`" class="group-item">
              <img v-lazy="singer.picUrl" alt="">
              <p> {{ singer.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="list-keys">
        <li v-for="(value,index) in alphabet" :key="index" :class="{active:activeIndex===index}"
            @click.stop="clickKey(index)">
          {{ value }}
        </li>
      </ul>
    </ScrollView>
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
      activeIndex: 0
    }
  },
  watch: {
    singers () {
      this.$nextTick(() => {
        const groupData = this.$refs.group.map(ele => ele.offsetTop)
        this.groupsTop = groupData
        console.log(groupData)
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
  methods: {
    clickKey (index) {
      console.log(index)
      this.activeIndex = index
      const top = this.groupsTop[index]
      this.$refs.scrollView.scrollTo(0, -top, 300)
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
          margin-left: 120px;
        }
      }
    }
  }

  .list-keys {
    position: fixed;
    top: 60%;
    transform: translateY(-50%);
    right: 10px;

    li {
      @include font_color();
      @include font_size($font_medium_s) ;
      padding: 3px 0;

      &.active {
        text-shadow: 0 0 10px #000;
      }
    }
  }
}

</style>
