<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item"
            v-for="(item, index) in goods"
            :key="index"
            :class="{'current': currentIndex===index}"
            @click="selectMenu(index)"
        >
          <span class="text" border-1px>
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li
          class="food-list food-list-hook"
          v-for="(item, index) in goods"
          :key="index"
        >
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li class="food-item border-1px"
                v-for="(food, index) in item.foods"
                :key="index"
                @click="foodDetail(food)"
            >
              <div class="icon">
                <img width="58" height="58" :src="food.icon" alt="food" />
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="description">{{ food.description }}</p>
                <div class="extra">
                  <span class="count"> 月售{{ food.sellCount }}份 </span>
                  <span> 好评率{{ food.rating }}% </span>
                </div>
                <div class="price">
                  <span class="now"> ¥{{ food.price }}</span><span class="old" v-show="food.oldPrice"> ¥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      :select-foods="selectFoods"
    >
    </v-shopcart>
    <v-food :food="selectedFood" ref="food"></v-food>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import Shopcart from '@/components/shopcart/Shopcart';
import Cartcontrol from '@/components/cartcontrol/Cartcontrol';
import Food from '@/components/food/Food';

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    // 判断当前Y轴位置，确定左侧菜单栏索引值
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let heightTop = this.listHeight[i];
        let heightEnd = this.listHeight[i + 1];

        if (!heightEnd || (this.scrollY >= heightTop && this.scrollY < heightEnd)) {
          return i;
        }
      }
      return 0;
    },
    // 实现兄弟组件之间数据通讯，显示效果联动
    // eslint-disable-next-line
    selectFoods () {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    'v-shopcart': Shopcart,
    'v-cartcontrol': Cartcontrol,
    'v-food': Food
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round((pos.y)));
      });
    },
    foodDetail (food) {
      this.selectedFood = food;
      // 调用子组件的show方法
      this.$refs.food.show();
    },
    _calculateBlockHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu (index) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 500);
    }
  },
  created () {
    this.$ajax.get('/api/goods').then(res => {
      if (res.data.errno === ERR_OK) {
        this.goods = res.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateBlockHeight();
        });
      }
    });
    this.classMap = [
      'decrease',
      'discount',
      'special',
      'invoice',
      'guarantee'
    ];
  }
};
</script>

<style lang="stylus">
@import "../../common/stylus/minin.styl";

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        width: 56px
        padding: 0 12px
        height: 54px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 2px
          background-color: yellow
          background-size: 12px
          background-repeat: no-repeat
          vertical-align: top
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 58px;
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .description, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .description
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
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
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
