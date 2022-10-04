<template>
  <div class="song">
    <div class="song-top">
      <h3> 最新音乐 </h3>
    </div>

    <SongListItem :songs="songs"></SongListItem>
  </div>
</template>

<script>
import SongListItem from '@/components/SongListItem'

export default {
  name: 'SongList',
  components: { SongListItem },
  props: {
    songs: {
      banners: {
        type: Array,
        default: () => [],
        required: true
      }
    }
  }

}
</script>

<style lang="scss" scoped>

.song {
  width: 100%;
  @include bg_sub_color() ;

  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color() ;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;

    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color()
    }
  }

}

</style>
