<template>
  <div class="detail">
    <SubHeader :title="playList.name"></SubHeader>
    <DetailTop ref="top" :path="playList.coverImgUrl"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollView">
        <DetailBottom :playlist="playList.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import SubHeader from '@/components/Detail/SubHeader'
import { getAlbum, getPlayListDetailById } from '@/api'
import DetailTop from '@/components/Detail/DetailTop'
import DetailBottom from '@/components/Detail/DetailBottom'
import ScrollView from '@/components/ScrollView'

export default {
  name: 'Detail',
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data () {
    return {
      playList: {
        name: '',
        coverImgUrl: '',
        tracks: []
      }
    }
  },
  async created () {
    const {
      id,
      type
    } = this.$route.params
    if (type === 'playList') {
      const detailRes = await getPlayListDetailById(id)
      this.playList = detailRes?.playlist || []
      return
    }
    const detailRes = await getAlbum(id)
    this.playList = {
      name: detailRes.album.name,
      coverImgUrl: detailRes.album.picUrl,
      tracks: detailRes.songs
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    console.log(defaultHeight)
    this.$refs.scrollView.scrolling((offsetY) => {
      if (offsetY < 0) {
        // 上
        // const rate = 20 * Math.abs(offsetY) / defaultHeight
        const rate = Math.abs(offsetY) / defaultHeight

        // this.$refs.top.$el.style.filter = `blur(${rate}px)`
        this.$refs.top.setMaskOpacity(rate)
      } else {
        // 下
        const rate = offsetY / defaultHeight

        this.$refs.top.$el.style.transform = `scale(${rate + 1})`
      }
    })
  }
}
</script>

<style lang="scss" scoped>

.detail {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_color();

  .bottom {
    position: fixed;
    top: 500px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

</style>
