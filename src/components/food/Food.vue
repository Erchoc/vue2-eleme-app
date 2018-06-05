<template>
  <transition name="fade">
    <div class="food" v-show="showFlag" ref="foodsWrapper">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="photo" />
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{ food.name }}</div>
          <div class="detail">
            <span class="sell-count"> 月售 {{ food.sellCount }} 份</span>
            <span class="rating"> 好评率 {{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now"> ¥{{ food.price }}</span><span class="old" v-show="food.oldPrice"> ¥{{ food.oldPrice }}</span>
          </div>
          <div class="shopCart">
            <transition name="fade">
              <div @click.stop.prevent="addFirst" class="text" v-show="!food.count">加入购物车</div>
            </transition>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol :food="food"></v-cartcontrol>
          </div>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <div class="title"> 商品信息 </div>
          <p class="text">{{ food.info }}</p>
        </div>
        <v-split></v-split>
        <div style="height: 500px; background: #555;"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import Cartcontrol from '@/components/cartcontrol/Cartcontrol';
import Split from '@/components/split/Split';

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
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodsWrapper, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide () {
      this.showFlag = false;
    },
    addFirst () {
      Vue.set(this.food, 'count', 1);
    }
  },
  components: {
    'v-cartcontrol': Cartcontrol,
    'v-split': Split
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
    background: #fff
    &.fade-enter-active,&.fade-leave-active
      transition: all 0.5s linear
    &.fade-enter,&.fade-leave-active
      opacity: 0
      transform: translate3d(100%, 100%, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 18px
          font-size: 20px
          color: #444
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        font-size: 0
        height: 10px
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 18px
          font-size: 14px
          color: rgb(240, 20 ,20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
    .shopCart
      position: absolute
      right: 18px
      bottom: 18px
      height: 24px
      text-align: center
      z-index: 10
      .text
        box-sizing: border-box
        height: 100%
        line-height: 24px
        color: white
        font-size: 10px
        padding: 0 12px
        border-radius: 12px
        background: rgb(0,160,220)
        &.fade-enter-active, &.fade-leave-active{
          transition: opacity 0.5s
        }
        &.fade-enter, &.fade-leave-active{
          opacity: 0
        }
    .cartcontrol-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        font-weight: 500
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
</style>
