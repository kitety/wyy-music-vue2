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
    this.songs = newSongData?.result || []
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

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-enter-to {
  opacity: 1;

  transform: translateX(0);
}

.v-enter-active {
  transition: all .3s;
}

.v-leave {
  opacity: 1;

  transform: translateX(0);
}

.v-leave-to {
  opacity: 0;

  transform: translateX(100%);
}

.v-leave-active {
  transition: all .3s;
}
</style>
