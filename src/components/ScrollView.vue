<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'

export default {
  name: 'ScrollView',
  mounted () {
    window.a = this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      probeType: 3
    })

    // 创建一个观察器实例并传入回调函数
    this.observer = new MutationObserver(() => {
      this.iscroll.refresh()
    })
    const config = {
      childList: true,
      subtree: true,
      attributeFilter: ['height', 'offsetHeight']
    }
    // 以上述配置开始观察目标节点
    this.observer.observe(this.$refs.wrapper, config)
  },
  beforeDestroy () {
    // 之后，可停止观察
    this.observer.disconnect()
  },
  methods: {
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn && fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      })
    },
    scrollTo (x, y, time) {
      this.iscroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
