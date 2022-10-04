<template>
  <div class="recommend">
    <div class="wrapper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized :personalized="personalized" :title="`推荐歌单`" :type="'playList'"
                        @selectItem="fatherSelectItem"></Personalized>
          <Personalized :personalized="albumNewest" :title="`最新专辑`" :type="'album'"
                        @selectItem="fatherSelectItem"></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
import { getAlbumLNewest, getBanner, getNewSong, getPersonalized } from '@/api'
import Banner from '@/components/Recommend/Banner'
import Personalized from '@/components/Recommend/Personalized'
import SongList from '@/components/Recommend/SongList'
import ScrollView from '@/components/ScrollView'

export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollView
  },
  data () {
    return {
      banners: [],
      personalized: [],
      albumNewest: [],
      songs: []
    }
  },
  async created () {
    const bannerData = await getBanner()
    this.banners = bannerData?.banners || []
    const personalizedData = await getPersonalized()
    this.personalized = personalizedData?.result || []
    const albumNewestData = await getAlbumLNewest()
    this.albumNewest = albumNewestData?.albums.slice(0, 6) || []
    const newSongData = await getNewSong()
    this.songs = newSongData?.result.map(item => ({
      url: '',
      id: item.id,
      name: item.song.name,
      singer: item.song.artists.map(d => d.name).join('/'),
      picUrl: item.picUrl
    })) || []
  },
  methods: {
    fatherSelectItem (id, type) {
      console.log(type)
      this.$router.push({
        path: `recommend/detail/${id}/${type}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;

  .wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

</style>
