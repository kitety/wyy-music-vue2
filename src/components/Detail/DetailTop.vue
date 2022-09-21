<template>
  <div class="detail-top">
    <div class="img-container">
      <img :src="path" alt="">
      <div ref="mask" class="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    setMaskOpacity (val) {
      this.$refs.mask.style.opacity = val
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-top: 100px;

  img {
    width: 100%;
    //overflow: hidden;

  }

  .mask {
    position: absolute;;
    left: 0;
    top: 0;
    background-color: #000;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}

</style>
