<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{ title }}</h3>
    </div>
    <div class="personalized-list">
      <div v-for="personal in personalized" :key="personal.id" class="item" @click="selectItem(personal)">
        <img v-lazy="personal.picUrl" alt="">
        <p>{{ personal.name }}</p></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      banners: {
        type: Array,
        default: () => [],
        required: true
      }
    },
    title: {
      banners: {
        type: String,
        default: '推荐歌单'
      }
    },
    type: {
      banners: {
        type: String,
        required: true
      }
    }
  },
  methods: {
    selectItem (personal) {
      this.$emit('selectItem', personal.id, this.type)
    }
  }
}
</script>

<style lang="scss" scoped>

.personalized {
  @include bg_sub_color();
  border-bottom: 1px solid #ccc;

  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color() ;
    padding: 0 20px;

    h3 {
      @include font_size($font_large);
      font-weight: bold;
      @include font_color()
    }
  }

  .personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;

    .item {
      width: 200px;
      padding-bottom: 20px;

      img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }

      p {
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s) ;
        text-align: center;
      }
    }
  }
}
</style>
