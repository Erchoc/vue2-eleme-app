<template>
  <transition name="fade">
    <div class="food" v-show="showFlag">
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    };
  },
  methods: {
    show () {
      this.showFlag = true;
    }
  }
};
</script>

<style lang="stylus">

  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: red
    &.fade-enter-active,&.fade-leave-active
      transition: all 0.5s linear
    &.fade-enter,&.fade-leave-active
      opacity: 0
      transform: translate3d(100%, 100%, 0)
</style>
