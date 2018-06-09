<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div
        class="cart-decrease"
        v-show="food.count>0"
        @click.stop.prevent="decreaseCart"
      >
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div
      class="cart-count"
      v-show="food.count>0"
    >
      {{ food.count }}
    </div>
    <div
      class="cart-increase icon-increase_circle"
      @click.stop.prevent="addCart"
    >
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>

  .cartcontrol
    font-size: 0
    .cart-decrease
      display inline-block
      padding 6px
      transition: all .4s linear
      .inner
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
        transition all 0.4s linear
      &.fadeRotate-enter-active, &.fadeRotate-leave-active
        transform translate3d(0,0,0)
        .inner
          display inline-block
          transform rotate(0)
      &.fadeRotate-enter, &.fadeRotate-leave-active
        opacity: 0
        transform translate3d(24px,0,0)
        .inner
          transform rotate(360deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-increase
      display: inline-block
      vertical-align: top
      font-size: 24px
      line-height: 24px
      padding: 6px
      color: rgb(0, 160, 220)
</style>
