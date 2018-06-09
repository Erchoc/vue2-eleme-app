### 发布日期：2018-5-23
- 使用`vue init webpack vue2-elem-app`初始化项目

### 发布日期：2018-5-24 后端接口有bug
- 修改`README`文件
- 添加`Changlog`修改日志文件
- 删除不需要的`src/assets/`目录
- 确定大概目录结构,添加`svg`字体文件,使用`stylus`预处理器
- 手动添加`mock`数据`data.json`:商家,商品,评论
- 使用`express`配置并测试三个接口数据(BUG:vue-route)

### 发布日期：2018-5-24
- 添加`static/cssreset.css` [样式重置文件](https://meyerweb.com/eric/tools/css/reset/index.html)
- 配置`.eslintrc.js`,使`ESLint`支持`semi分号`的使用
- 防止`Vue`独有的`new Obj`语法被`ESLint`报错`no-new`,添加一行注释跳过检测
- 完成组件拆分基本框架, 重命名`Header`组件为`v-header`

### 发布日期：2018-5-24
- 使用`vue-route`构建起`商品-评论-商家`基本架构页面
- 修改部分样式,修改`reset.css`令超链接无下划线
- 导航被点击后激活`vue-route`的`linkActiveClass`改变字体颜色

### 发布日期：2018-5-24 移动端未测试
- 利用伪类和缩放封装`stylus`的`minin.styl`实现导航条的像素边框在移动端显示问题,使用`http-server`调试移动端
- 修改`icon.styl`引入字体的路径
- 组件路径引入均使用`webpack`配置的`@ == src`别名

### 发布日期：2018-5-25 修复BUG
- 让`ESLint`忽视`函数参数前需要有空格`这个要求,`'space-before-function-paren': 0`
- 参考[个人博客](https://www.cnblogs.com/myRain/p/7904651.html)修复BUG,使用`express`访问`api/seller|goods|ratings`可以获取`mock`数据了
- 使用`vue`生命周期函数`created()`测试`axios`的`this.$ajax.get()`能正常获取`mock`接口数据
- 更改开发使用的IDE为`WebStorm`

### 发布日期：2018-5-26
- 组件资源就近维护,完成了Header组件的开发
- 用函数封装`minin`,根据移动端设备`DPI`选择对应的图片
- 使用上自定义的图标字体
- 完成公告组件,`Header`组件的背景改成高斯模糊的图片

### 发布日期：2018-5-28 修复BUG,弹出层过渡动画未实现
- 修复BUG：`"TypeError: Cannot read property 'avatar' of undefined"`
- 修复BUG：`Header`组件模糊溢出显示问题
- 使用`CSS Sticky Footers`布局方式,完成详情弹出层页面显示和关闭
- 抽象出五星级评分组件`Star`便于复用
- 为弹出层添加了`vue2`的过渡期动画`<transition>`效果

### 发布日期：2018-5-28
- 首页默认商品页面的开发，使用`Flex`布局完成
- 完成左侧菜单和右侧商品列表的显示

### 发布日期：2018-5-30
- 利用npm安装JS库`better-scroll`实现左侧菜单和右侧商品列表可以滚动
- 利用区间高度记录，实现右侧商品滚动和点击，则左侧菜单能联动高亮显示
- 异步加载后计算各块的高度，都放在`$nextTick`回调函数中执行计算步骤
- 初始化函数中配置参数`clisk: true`用来去掉`better-scroll`默认的禁止点击事件
- 利用`vue`的`:class`绑定，左侧菜单相应点击后，右侧商品也能联动跳转到相应位置
- 类名`food-list-hook`的作用: 供JS进行DOM选择操作
- `better-scroll`接口函数`scrollToElement()`用于联动效果下左侧点击右侧动画跳转

### 发布日期：2018-5-31
- 底部购物车使用`Flex`布局完成
- 某块使用`inline-block`，则必须在其父级设置`font-size: 0`
- 组件连续传值: 需要在根组件`<router-view>`中传递参数，然后从父组件向子组件传递参数: `pros`接收
- 购物车LOGO右上角显示已加入购物车的商品数量
- 购物车有商品时，购物车LOGO高亮显示
- 暂时`return`假的数组代表购物车存在数据

### 发布日期：2018-5-31
- 封装购物车结算三种状态到计算属性`payDesc`中：默认，差价起送和点击购买
- 反引号在`Vue`中的使用，简化字符串拼接，需要注释`ESLint`规则
- 以`selectFoods`为中心，通过`computed`计算属性和`:class`样式动态绑定，改变`selectFoods`数据的同时联动变化其他部分
- 添加购物车按钮界面和功能实现，且封装为按钮组件
- 右侧商品区域移动端点击事件默认被`better-scroll`禁止，使用初始化参数打开
- 使用`Vue.set()`为对象新建一个被监听的属性，用于双向绑定
- 购物车按钮添加`vue`过渡动画:父组件平移，子组件滚动，透明度0-1渐变
- 购物车按钮点击，通过观测`Foods`的计算属性和父组件作为中介，使兄弟组件进行数据通讯，显示效果联动
- `ESLint`和`Vue computed`碰撞后产生的语法报错问题，暂时和`ES6反引号`一样都使用`ESLint注释`解决

### 发布日期：2018-6-2
- 实现购物车底部过渡显示功能和过渡清空所有购物车商品
- 解决加入购物车商品过多时`better-scroll`无法滚动的问题
- 实现了购物车中同个商品的增加和删除功能
- 1. 过渡动画实现`Header`组件中商家信息的全屏显示
- 2. `ESLint`全局注释规则的配置(`webpack`版)
- 3. 四点贝塞尔曲线影响显示性能,不在此项目中使用
- 4. 点击结算后弹出购物车`fold`,再次点击选择支付宝或者微信付款(功能暂未实现)

### 发布日期：2018-6-5
- 商品详情页面,点击商品后父组件调用子组件方法使用过渡动画弹出`Food`详情页面
- 组件私有方法加下划线，这是编码规范
- 评论页左右侧显示
- 评论页使用媒体查询`media query`解决低分辨率设备折行问题
- 评论页上下分割线组件复用

# 发布日期：2018-6-5
- 使用`padding-top: 100%`限定图片加载前固定图片高度
- 使用`base64`矢量图设置关闭涂层的返回按钮
- 修复`food`商品旧价格无法显示的人为BUG:`修改data.json后需要重启webpack`
- 引入`better-scroll`,绑定`.food`节点,在`show()`方法中初始化异步`better-scroll`
- 阻止`cartcontrol`添加按钮的冒泡事件(穿透)使用`@click.stop.prevent=""`即可
- 商品详情页显示加入购物车按钮,同时复用`cartcontrol`组件
- `better-scroll`失效问题

### 发布日期：2018-6-6 修复BUG又来了新的BUG
- `better-scroll`失效问题莫名其妙解决了，啥都没做
- 抽象出`Ratingselect`组件，维护父组件传递的选择类型，是否只看内容，描述
- 修复了`Shopcart`中价格显示bug: 未设置`flex: 1`
- 修复了`Shopcart`中`cartcontrol`向上偏移问题: `Food`和`cartcontrol`组件类名重复
- 修复了购物车列表显示时，上方浮层计算问题: 无需计算，设置`z-index`覆盖即可
- 商品详情页存在显示BUG以及购物车内容BUG

### 发布日期：2018-6-9 修复BUG
- 修复商品详情页的显示BUG
- 修复购物车内容的层级BUG
- 完成商品详情页的点击事件联动逻辑编写
- 留下一个BUG：修改了子组件的props导致浏览器终端报错

