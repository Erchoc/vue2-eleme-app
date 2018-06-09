<template>
  <div class="star" :class="starType">
    <span class="star-item"
          v-for="(itemClass, index) of itemClasses"
          :key="index"
          :class="itemClass"
    >
    </span>
  </div>
</template>

<script>
const STAR_LENGTH = 5;
const _ON = 'on';
const _HALF = 'half';
const _OFF = 'off';

export default {
  props: ['size', 'score'],
  computed: {
    starType () {
      return 'star-' + this.size;
    },
    itemClasses () {
      let result = [];
      // 向下取整0.5倍数算法
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);

      for (let i = 0; i < integer; i++) {
        result.push(_ON);
      }
      if (hasDecimal) {
        result.push(_HALF);
      }
      while (result.length < STAR_LENGTH) {
        result.push(_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/minin.styl";

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 16px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')

</style>
