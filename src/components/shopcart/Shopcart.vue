<template>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div class="number" v-show="totalCount>0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}"> ¥{{ totalPrice }}元 </div>
          <div class="description"> 另需配送费¥{{ deliveryPrice }}元 </div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payStatus">
            {{ payDesc }}
          </div>
        </div>
      </div>
      <transition name="transHeight">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title"> 购物车 </h1>
            <h1 class="empty" @click="setEmpty"> 清空 </h1>
          </div>
          <div class="list-content" ref="foodlist">
            <ul>
              <li class="food" v-for="(food, index) in selectFoods" :key="index">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>¥{{ food.price * food.count }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import Cartcontrol from '@/components/cartcontrol/Cartcontrol';
import BScroll from 'better-scroll';

export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 默认购物车样式为折叠状态
      fold: true
    };
  },
  components: {
    'v-cartcontrol': Cartcontrol
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    setEmpty () {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
    }
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount () {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc () {
      if (this.totalPrice === 0) {
        // eslint-disable-next-line
        return `¥${ this.minPrice } 元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        // eslint-disable-next-line
        return `还差¥${ diff } 元起送`;
      }
      return '去结算';
    },
    payStatus () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      }
      return 'enough';
    },
    listShow () {
      if (!this.totalCount) {
        // eslint-disable-next-line
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      // Better-Scroll引入的初始化
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            // eslint-disable-next-line
            this.scroll = new BScroll(this.$refs.foodlist, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/minin.styl";

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .number
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700px
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
        .description
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin: 12px 0 0 12px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      top: 0
      left: 0
      width: 100%
      background: #fff
      transform translate3d(0,-100%,0)
      z-index -1
      &.transHeight-enter-active,&.transHeight-leave-active
        transition all 0.5s
      &.transHeight-enter,&.transHeight-leave-active
        transform translate3d(0,0,0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27,0.1)
        .title
          display: inline-block
          float: left
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .empty
          position: absolute
          right: 8px
          font-size: 12px
          padding: 0 10px
          font-weight: 700
          color: rgb(0, 160, 220)
      .list-content
        max-height: 217px
        overflow: hidden
        .food
          position: relative
          display: flex
          height: 48px
          margin: 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            flex: 1
            line-height: 48px
            font-size: 14px
            font-weight: 300
            color: rgb(7, 17,27)
          .price
            line-height: 48px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            font-size: 14px
            margin-top: 6px
</style>
