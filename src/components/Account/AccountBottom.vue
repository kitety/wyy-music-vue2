<template>
  <div class="account-bottom">
    <div class="play" @click="selectAll">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="wrapper">
      <ScrollView>
        <SongListItem :songs="switchNum===0 ? favListDetail : historyListDetail"></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '@/components/ScrollView'
import SongListItem from '@/components/SongListItem'
import { formatGetSongsByIds } from '@/store/utils'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'AccountBottom',
  components: {
    ScrollView,
    SongListItem
  },
  data () {
    return {
      favListDetail: [],
      historyListDetail: [],
      favList: [],
      historyList: []
    }
  },
  props: {
    switchNum: {
      type: Number,
      required: true,
      default: 0
    }
  },
  created () {
    try {
      const favList = JSON.parse(localStorage.getItem('favList'))
      this.favList = favList
    } catch {
    }
    try {
      const historyList = JSON.parse(localStorage.getItem('historyList'))
      this.historyList = historyList
    } catch {
    }
  },
  async mounted () {
    if (this.favList.length) {
      const favListDetail = await formatGetSongsByIds(this.favList)
      console.log(favListDetail)
      this.favListDetail = favListDetail
    }
    if (this.historyList.length) {
      const historyListDetail = await formatGetSongsByIds(this.historyList)
      this.historyListDetail = historyListDetail
    }
  },
  methods: {
    ...mapActions(['setFullScreen', 'setCurrentPlayId']),
    ...mapMutations(['SET_SONGS_DETAIL']),
    selectAll () {
      const songs = this.switchNum === 0 ? this.favListDetail : this.historyListDetail
      this.SET_SONGS_DETAIL(songs)
      this.setFullScreen(true)
      const firstSongId = songs[0]?.id

      if (firstSongId) {
        this.setCurrentPlayId(firstSongId)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.account-bottom {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();

  .play {
    width: 260px;
    height: 60px;
    margin: 20px auto;
    @include flexCenter();
    border: 1px solid #000;
    border-radius: 30px;

    span {
      display: inline-block;

      &:nth-of-type(1) {
        width: 46px;
        height: 46px;
        background: url('@/assets/images/play-red.png') no-repeat center;
        background-size: 74px;
      }
    }
  }

  .wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 200px;
    background: pink;
    overflow: hidden;
  }
}
</style>
