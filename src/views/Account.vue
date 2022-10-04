<template>
  <transition appear>
    <div class="account">
      <AccountHeader @switchItem="switchItem"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </transition>
</template>

<script>
import AccountHeader from '@/components/Account/AccountHeader'
import AccountBottom from '@/components/Account/AccountBottom'

export default {
  name: 'Account',
  components: {
    AccountHeader,
    AccountBottom
  },
  data () {
    return { switchNum: 0 }
  },
  methods: {
    switchItem (val) {
      console.log('val', val)
      this.switchNum = val
    }
  }
}
</script>

<style lang="scss" scoped>
.account {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: red;
}
</style>
